class Note < ApplicationRecord
  belongs_to :user
  belongs_to :track

  validates :user_id, :track_id, :body, presence: true
  validates :user_id, uniqueness: {scope: :track_id}

end
