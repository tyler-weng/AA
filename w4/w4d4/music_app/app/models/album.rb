# == Schema Information
#
# Table name: albums
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  band_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Album < ApplicationRecord
  belongs_to :band
  has_many :tracks

  validates :name, :band_id, presence: true
  validates :name, uniqueness: {scope: :band_id}
end
