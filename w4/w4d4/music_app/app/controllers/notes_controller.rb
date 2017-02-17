class NotesController < ApplicationController

  before_action :require_user!

  def create
    @note = Note.new(note_params)
    @note.user_id = current_user.id
    @note.save
    flash[:errors] = @note.errors.full_messages

    redirect_to track_url(@note.track_id)
  end

  def destroy
    @note = Note.find_by(id: params[:id])

    if @note.user_id == current_user.id
      @note.destroy
      redirect_to track_url(@note.track_id)
    else
      render text: "Can only destroy your own note", status: :forbidden
    end
  end

  private
  def note_params
    params.require(:note).permit(:track_id, :body)
  end

end
