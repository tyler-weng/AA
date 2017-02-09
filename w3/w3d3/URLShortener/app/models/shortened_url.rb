require 'securerandom'

class ShortenedUrl < ActiveRecord::Base
  validates :long_url, presence: true, uniqueness: true
  validates :short_url, uniqueness: true
  validates :user_id, presence: true


  def self.random_code
    shortened = SecureRandom.urlsafe_base64(12)

    while ShortenedUrl.pluck(:short_url).include?(shortened)
      shortened = SecureRandom.urlsafe_base64(12)
    end

    shortened
  end

  belongs_to :submitter,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User


  has_many :visits,
    primary_key: :id,
    foreign_key: :url_id,
    class_name: :Visit

  has_many :visitors,
    proc { distinct },
    through: :visits,
    source: :user

  def num_clicks
    self.visits.count
  end

  def num_uniques
    self.visitors.count
  end

  def num_recent_uniques
    self.visitors.where({ created_at: (Time.now.midnight - 1.day)..Time.now} ).count
  end
end
