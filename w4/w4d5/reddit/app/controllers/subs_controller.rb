class SubsController < ApplicationController
  def new
    @sub = Sub.new
    render :new
  end

  def index
    @subs = Sub.all
    render :index
  end

  def show
    @sub = Sub.find_by(id: params[:id])
    render :show
  end

  def create
    @sub = Sub.new(sub_params)
    @sub.moderator_id = current_user.id
    if @sub.save
      redirect_to sub_url(@sub)
    else
      flash.now[:errors] = @sub.errors.full_messages
      render :new
      # flash[:errors] = @sub.errors.full_messages
      # redirect_to new_sub_url
    end
  end

  def edit
    update
  end

  def update
    @sub = Sub.find_by(id: params[:id])
    if logged_in?
      # user is logged in and is mod of sub
      if @sub.moderator_id == current_user.id
        @sub.update_attributes(sub_params)
      else
        flash[:notice] = "Can't update other people's subs"
      end
    else
      flash[:notice] = "Not logged in; please login"
      redirect_to new_session_url
    end
  end

  def destroy
    @sub = Sub.find_by(id: params[:id])
    @sub.destroy
    @sub
  end

  private
  def sub_params
    params.require(:sub).permit(:title, :description, :moderator_id)
  end
end
