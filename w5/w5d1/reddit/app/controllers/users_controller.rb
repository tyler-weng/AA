class UsersController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  # def index
  #   @users = User.all
  #   render :index
  # end

  def show
    @user = User.find_by(id: params[:id])
    render :show
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      redirect_to user_url(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
      # flash[:errors] = @user.errors.full_messages
      # redirect_to new_user_url
    end
  end

  # def edit
  #   @user = User.find_by(id: params[:id])
  # end
  #
  # def update
  #   @user = User.find_by(id: params[:id])
  #   if logged_in?
  #     # logged_in and updating own profile
  #     if @user.session_token == session[:session_token]
  #       @user.update_attributes(user_params)
  #     else
  #       flash[:notice] = "Can't update other people's profiles"
  #     end
  #   else
  #     flash[:notice] = "Not logged in; please login"
  #     redirect_to new_session_url
  #   end
  # end

  # def destroy
  #   @user = User.find_by(id: params[:id])
  #   @user.destroy
  #   @user
  # end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
