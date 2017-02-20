# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

trump = User.create(username: "trump", password: "password")
obama = User.create(username: "obama", password: "password")

the_donald = Sub.create(title: "The_Donald", description: "MAGA", moderator_id: 1)
the_obama = Sub.create(title: "The_Obama", description: "Donezo", moderator_id: 2)

best_post = Post.create(title: "MO", content: "Time to MAGA", author_id: 1, sub_ids:[1, 2])
obama_post = Post.create(title: "Retired", content: "What to do...", author_id: 2)
