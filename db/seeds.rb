# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

sounds = Sound.create([
  {name: '808 Sub', url: "https://s3-us-west-1.amazonaws.com/soundsamples/808_sub.wav", instrument: 'Drums', kit: '808'},
  {name: '808 Clap', url: "https://s3-us-west-1.amazonaws.com/soundsamples/808_clap.wav", instrument: 'Drums', kit: '808'},
  {name: 'Snare 1', url: "https://s3-us-west-1.amazonaws.com/soundsamples/Squad+Snare+5.wav", instrument: 'Drums', kit: '808'},
  {name: 'Kick 1', url: "https://s3-us-west-1.amazonaws.com/soundsamples/Squad+Kick+3.wav", instrument: 'Drums', kit: '808'},
  {name: 'HiHat 1', url: "https://s3-us-west-1.amazonaws.com/soundsamples/Squad+HiHat+3.wav", instrument: 'Drums', kit: '808'},
  {name: 'HiHat 2', url: "https://s3-us-west-1.amazonaws.com/soundsamples/Squad+HiHat+4.wav", instrument: 'Drums', kit: '808'},
  {name: 'Lex Chant', url: "https://s3-us-west-1.amazonaws.com/soundsamples/LEX+Chant.wav", instrument: 'Drums', kit: '808'},
  {name: 'Biggie 1', url: "https://s3-us-west-1.amazonaws.com/soundsamples/biggie1.wav", instrument: 'Vocals', kit: 'Biggie 140 BPM'},
  {name: 'Biggie 2', url: "https://s3-us-west-1.amazonaws.com/soundsamples/biggie2.wav", instrument: 'Vocals', kit: 'Biggie 140 BPM'},
  {name: 'Biggie 4', url: "https://s3-us-west-1.amazonaws.com/soundsamples/biggie4.wav", instrument: 'Vocals', kit: 'Biggie 140 BPM'},
  {name: 'Biggie 5', url: "https://s3-us-west-1.amazonaws.com/soundsamples/biggie5.wav", instrument: 'Vocals', kit: 'Biggie 140 BPM'},
  {name: 'Kalimba F2', url: "https://s3-us-west-1.amazonaws.com/soundsamples/58718__arioke__kalimba-lam01-f2-wipe-med.wav", instrument: 'Instrument', kit: 'Kalimba Major'},
  {name: 'Kalimba G2', url: "https://s3-us-west-1.amazonaws.com/soundsamples/58720__arioke__kalimba-lam02-g2-wipe-med.wav", instrument: 'Instrument', kit: 'Kalimba Major'},
  {name: 'Kalimba B2', url: "https://s3-us-west-1.amazonaws.com/soundsamples/58722__arioke__kalimba-lam03-bb2-wipe-med.wav", instrument: 'Instrument', kit: 'Kalimba Major'},
  {name: 'Kalimba D3', url: "https://s3-us-west-1.amazonaws.com/soundsamples/58724__arioke__kalimba-lam04-d3-wipe-med.wav", instrument: 'Instrument', kit: 'Kalimba Major'},
  {name: 'Kalimba E3', url: "https://s3-us-west-1.amazonaws.com/soundsamples/58727__arioke__kalimba-lam05-e3-wipe-med.wav", instrument: 'Instrument', kit: 'Kalimba Major'},
  {name: 'Kalimba F3', url: "https://s3-us-west-1.amazonaws.com/soundsamples/58728__arioke__kalimba-lam06-f3-wipe-med.wav", instrument: 'Instrument', kit: 'Kalimba Major'},
  {name: 'Kalimba A3', url: "https://s3-us-west-1.amazonaws.com/soundsamples/58732__arioke__kalimba-lam08-a3-wipe-med.wav", instrument: 'Instrument', kit: 'Kalimba Major'},
  {name: 'Marimba A2', url: "https://s3-us-west-1.amazonaws.com/soundsamples/PatchArena_marimba-057-a2.wav", instrument: 'Instrument', kit: 'Marimba Minor'},
  {name: 'Marimba B2', url: "https://s3-us-west-1.amazonaws.com/soundsamples/PatchArena_marimba-059-h2.wav", instrument: 'Instrument', kit: 'Marimba Minor'},
  {name: 'Marimba C3', url: "https://s3-us-west-1.amazonaws.com/soundsamples/PatchArena_marimba-060-c3.wav", instrument: 'Instrument', kit: 'Marimba Minor'},
  {name: 'Marimba D3', url: "https://s3-us-west-1.amazonaws.com/soundsamples/PatchArena_marimba-062-d3.wav", instrument: 'Instrument', kit: 'Marimba Minor'},
  {name: 'Marimba E3', url: "https://s3-us-west-1.amazonaws.com/soundsamples/PatchArena_marimba-064-e3.wav", instrument: 'Instrument', kit: 'Marimba Minor'},
  {name: 'Marimba F3', url: "https://s3-us-west-1.amazonaws.com/soundsamples/PatchArena_marimba-065-f3.wav", instrument: 'Instrument', kit: 'Marimba Minor'},
  {name: 'Marimba G#3', url: "https://s3-us-west-1.amazonaws.com/soundsamples/PatchArena_marimba-068-g%233.wav", instrument: 'Instrument', kit: 'Marimba Minor'},
  {name: 'Marimba A3', url: "https://s3-us-west-1.amazonaws.com/soundsamples/PatchArena_marimba-069-a3.wav", instrument: 'Instrument', kit: 'Marimba Minor'}
])
