# == Schema Information
#
# Table name: tracks
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  album_id   :integer          not null
#  ord        :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Track < ApplicationRecord
  belongs_to :album
  has_many :notes
  has_one :band,
    through: :album,
    source: :band

  validates :name, :album_id, :ord, presence: true
  validates :ord, uniqueness: {scope: :album_id}
end
