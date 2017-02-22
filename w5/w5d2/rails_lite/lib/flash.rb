require 'json'

class Flash

  def initialize(req)
    cookie = req.cookies['_rails_lite_app']
    @errors = {}
  end

  def [](error)
    @errors[error]
  end

  def []=(error, error_message)
    @errors[error] = error_message
  end

  def store_flash(res)
    cookie_str = res.headers['Set-Cookie']
    cookie = Rack::Utils.parse_query(cookie_str)
    @errors['_rails_lite_app_flash'] = cookie['_rails_lite_app']
  end
end
