# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

tyler = User.create(email: "tyler@gmail.com", password: "password")

maroon5 = Band.create(name: "Maroon 5", url:"https://www.maroon5.com")

v = Album.create(name: "V", band_id: 1)

maps = Track.create(name: "Maps", album_id: 1, ord: 1)
animals = Track.create(name: "Animals", album_id: 1, ord: 2,
lyrics: "Baby, I'm preying on you tonight
Hunt you down eat you alive
Just like animals, animals, like animals-mals

Maybe you think that you can hide
I can smell your scent from miles
Just like animals, animals, like animals-mals
Baby, I'm

So what you trying to do to me
It's like we can't stop we're enemies
But we get along when I'm inside you
You're like a drug that's killing me
I cut you out entirely
But I get so high when I'm inside you

Yeah, you can start over, you can run free
You can find other fish in the sea
You can pretend it's meant to be
But you can't stay away from me
I can still hear you making that sound
Taking me down, rolling on the ground
You can pretend that it was me
But no

Baby, I'm preying on you tonight
Hunt you down eat you alive
Just like animals, animals, like animals-mals

Maybe you think that you can hide
I can smell your scent from miles
Just like animals, animals, like animals-mals
Baby, I'm

So if I run it's not enough
You're still in my head forever stuck
So you can do what you wanna do
I love your lies, I'll eat 'em up
But don't deny the animal
That comes alive when I'm inside you

Yeah, you can start over you can run free
You can find other fish in the sea
You can pretend it's meant to be
But you can't stay away from me
I can still hear you making that sound
Taking me down rolling on the ground
You can pretend that it was me
But no

Baby, I'm preying on you tonight
Hunt you down eat you alive
Just like animals, animals, like animals-mals

Maybe you think that you can hide
I can smell your scent from miles
Just like animals, animals, like animals-mals
Baby, I'm

Don't tell no lie-lie-lie-lie
You can't deny-ny-ny-ny
The beast inside-side-side-side
Yeah, yeah, yeah

No, girl, don't lie-lie-lie-lie
You can't deny-ny-ny-ny
The beast inside-side-side-side
Yeah, yeah, yeah

Yo...
Whoa...
Whoa...
Just like animals, animals, like animals-mals
Just like animals (yeah...), animals (yeah...), like animals-mals (yeah...)
Ow

Baby, I'm preying on you tonight
Hunt you down eat you alive
Just like animals, animals, like animals-mals

Maybe you think that you can hide
I can smell your scent from miles
Just like animals, animals, like animals-mals
Baby, I'm

Don't tell no lie-lie-lie-lie
You can't deny-ny-ny-ny
That beast inside-side-side-side
Yeah, yeah, yeah

No, girl, don't lie-lie-lie-lie
You can't deny-ny-ny-ny
That beast inside-side-side-side
Yeah, yeah, yeah")

Fabricator(:user) do
  email { Faker::Internet.email}
  password { "password" }
end

50.times { Fabricate(:user) }
