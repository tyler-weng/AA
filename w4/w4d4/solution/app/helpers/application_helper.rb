module ApplicationHelper
  def auth_token
    "<input
      type="hidden"
      name="authenticity_token"
      value='#{<%= auth_token %>}'"
      .html_safe
  end
end
