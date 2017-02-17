class AlbumsController < ApplicationController

  before_action :require_user!

  def create
    @album = Album.new(album_params)

    if @album.save
      redirect_to album_url(@album)
    else
      flash.now[:errors] = @album.errors.full_messages
      render :new
    end

  end

  def update
    @album = Album.find_by(id: params[:id])

    if @album.update(album_params)
      redirect_to album_url(@album)
    else
      flash.now[:errors] = @album.errors.full_messages
      render :edit
    end
  end

  def new
    @album = Album.new
    render :new
  end

  def edit
    @album = Album.find_by(id: params[:id])
    render :edit
  end

  def show
    @album = Album.find_by(id: params[:id])
    render :show
  end

  def destroy
    @album = Album.find_by(id: params[:id])
    @album.destroy
    redirect_to albums_url
  end

  private
  def album_params
    params.require(:album).permit(:name, :band_id)
  end

end
