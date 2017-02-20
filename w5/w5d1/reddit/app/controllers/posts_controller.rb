class PostsController < ApplicationController
  def new
    @post = Post.new
    render :new
  end

  def index
    @posts = Post.all
    render :index
  end

  def show
    @post = Post.find_by(id: params[:id])
    render :show
  end

  def create
    # fail
    @post = Post.new(post_params)
    @post.author_id = current_user.id
    if @post.save
      redirect_to post_url(@post)
    else
      flash.now[:errors] = @post.errors.full_messages
      render :new
      # flash[:errors] = @post.errors.full_messages
      # redirect_to new_post_url
    end
  end

  def edit
    @post = Post.find_by(id: params[:id])
    render :edit
  end

  def update
    # fail
    @post = Post.find_by(id: params[:id])
    if logged_in?
      if @post.author_id == current_user.id
        @post.update_attributes(post_params)
        redirect_to post_url(@post)
      else
        flash[:notice] = "Can't update other people's posts"
        redirect_to post_url(@post)
      end
    else
      flash[:notice] = "Not logged in; please login"
      redirect_to new_session_url
    end
  end

  def destroy
    @post = Post.find_by(id: params[:id])
    @post.destroy
    @post
  end

  private
  def post_params
    params.require(:post).permit(:title, :url, :content, sub_ids: [])
  end
end
