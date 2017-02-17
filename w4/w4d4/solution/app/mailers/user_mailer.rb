class UserMailer < ApplicationMailer
  default from: 'tylercweng@gmail.com'

  def welcome_email(user)
   @user = user
   @url  = 'http://example.com/session/new'
   mail(to: user.username, subject: 'Welcome to 99 Cats')
 end

end
