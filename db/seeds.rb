# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

sounds = Sound.create([
  {name: '808 Sub', url: "https://s3-us-west-1.amazonaws.com/soundsamples/808_sub.wav"},
  {name: '808 Clap', url: "https://s3-us-west-1.amazonaws.com/soundsamples/808_clap.wav"},
  {name: 'Snare 1', url: "https://s3-us-west-1.amazonaws.com/soundsamples/Squad+Snare+5.wav"},
  {name: 'Kick 1', url: "https://s3-us-west-1.amazonaws.com/soundsamples/Squad+Kick+3.wav"},
  {name: 'HiHat 1', url: "https://s3-us-west-1.amazonaws.com/soundsamples/Squad+HiHat+3.wav"},
  {name: 'HiHat 2', url: "https://s3-us-west-1.amazonaws.com/soundsamples/Squad+HiHat+4.wav"},
])
