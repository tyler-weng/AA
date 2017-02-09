# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create!(email: "i_dont_care@gmail.com")
User.generate_shortened_url(User.all.first, "https://www.google.com")
Visit.record_visit!(User.all.first, ShortenedUrl.all.first.short_url)
