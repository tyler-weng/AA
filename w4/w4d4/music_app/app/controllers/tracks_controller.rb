class TracksController < ApplicationController

  before_action :require_user!

  def create
    @track = Track.new(track_params)

    if @track.save
      redirect_to track_url(@track)
    else
      flash.now[:errors] = @track.errors.full_messages
      render :new
    end

  end

  def update
    @track = Track.find_by(id: params[:id])

    if @track.update(track_params)
      redirect_to track_url(@track)
    else
      flash.now[:errors] = @track.errors.full_messages
      render :edit
    end
  end

  def new
    @track = Track.new
    render :new
  end

  def edit
    @track = Track.find_by(id: params[:id])
    render :edit
  end

  def show
    @track = Track.find_by(id: params[:id])
    render :show
  end

  def destroy
    @track = Track.find_by(id: params[:id])
    @track.destroy
    redirect_to tracks_url
  end

  private
  def track_params
    params.require(:track).permit(:name, :album_id, :ord)
  end

end
