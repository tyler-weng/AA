require_relative 'shortened_url'

class User < ActiveRecord::Base
  validates :email, presence: true


  def self.generate_shortened_url(user, long_url)
    short_url = ShortenedUrl.random_code
    ShortenedUrl.create!(long_url: long_url, short_url: short_url, user_id: user.id )
  end

  has_many :submitted_urls,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :ShortenedUrl

  has_many :site_visits,
    primary_key: :id,
    foreign_key: :url_id,
    class_name: :Visit

  has_many :visited_urls,
    through: :site_visits,
    source: :visited_sites
end
