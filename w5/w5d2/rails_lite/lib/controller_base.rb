require 'active_support'
require 'active_support/core_ext'
require 'erb'
require_relative './session'

class ControllerBase
  attr_reader :req, :res, :params

  # Setup the controller
  def initialize(req, res, route_params = {})
    @req = req
    @res = res
    puts "route_params: #{route_params}"
    @params = route_params.merge(req.params)
  end

  # Helper method to alias @already_built_response
  def already_built_response?
    @already_built_response
  end

  # Set the response status code and header
  def redirect_to(url)
    raise "Can't double render" if already_built_response?
    res['Location'] = url
    res.status = 302
    store_session!
    @already_built_response = true
  end

  # Populate the response with content.
  # Set the response's content type to the given type.
  # Raise an error if the developer tries to double render.
  def render_content(content, content_type)
    raise "Can't double render" if already_built_response?
    res['Content-Type'] = content_type
    res.write(content)
    store_session!
    @already_built_response = true
  end

  # use ERB and binding to evaluate templates
  # pass the rendered html to render_content
  def render(template_name)

    dir_path = File.dirname(__FILE__)
    data = File
             .join(
               dir_path,
               "..",
               "views",
               self.class.to_s.underscore,
               "#{template_name}.html.erb"
             )
    raw_content = File.read(data)
    template = ERB.new(raw_content)
    content = template.result(binding)

    render_content(content, "text/html")
  end

  # method exposing a `Session` object
  def session
    @session ||= Session.new(req)
  end

  def store_session!
    @session.store_session(res) if @session
  end

  # use this with the router to call action_name (:index, :show, :create...)
  def invoke_action(name)
    self.send(name)
    render(name) unless already_built_response?
  end
end
