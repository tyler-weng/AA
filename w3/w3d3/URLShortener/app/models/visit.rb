class Visit < ActiveRecord::Base
  validates :user_id, :url_id, presence: true

  def self.record_visit!(user, shortened_url)
    object = ShortenedUrl.find_by(short_url: shortened_url)
    return Visit.create(user_id: user.id, url_id: object.id) if object
    nil
  end

  belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :visited_sites,
    primary_key: :id,
    foreign_key: :url_id,
    class_name: :ShortenedUrl
end
