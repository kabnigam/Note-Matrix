# The Note Matrix

The Note Matrix is a web application that provides users with relatively simple interface for creating music. It allows the user to customize the beat by providing 16 notes of the pentatonic scale and 7 different drum sounds, including two vocal sound effects, all of which can be overlaid and played synchronously.

[Live Here][url]

## Features
* Allows for customization of both a melody and a drum beat
  * Retrieves sound files hosted on AWS
  * Tempo is 140 beats per minute, 4/4 time signature
  * Melody is set in eighth notes, drums set in either quarter or eighth notes
* Interactive UI through giving user direct visual feedback upon selection/playing of notes
* Multiple sounds can be overlaid to create unique chords
* Simple UX design that allows for individuals of any musical level to create melodies

## Demo
![sound-less Deom][gif]

## Code Snips
The Note Matrix was built using a combination of JavaScript, jQuery, React/Flux, HTML and CSS.

NOTE: There are more code components to the application in this repo that are not used in the current version. If interested in the code for the current version, please look at the following files:
* [Tone Matrix](/frontend/components/tonematrix.jsx)
* [Sounds](/frontend/components/sounds.jsx)
* [Sequencer](/frontend/components/sequencer.jsx)
* [Sequencer Row](/frontend/components/seq_row.jsx)
* [Master](/frontend/components/drum_machine.jsx)

The splash effect that is created upon clicking a cell or playing a clicked cell uses the data from the target cell's class and ID to construct a base coordinate.
```javascript
var re = /\d+/;
var target_x = parseInt(e.target.attributes[0].value.match(re)[0]);
var target_y = parseInt(e.target.attributes[1].value.match(re)[0]);

var dirs = {'dirA': [target_x, target_y], 'dirB': [target_x, target_y], 'dirC': [target_x, target_y], 'dirE': [target_x, target_y], 'dirF': [target_x, target_y], 'dirG': [target_x, target_y], 'dirH': [target_x, target_y], 'dirD': [target_x, target_y]};

var i = 0;
this.interval_boop = window.setInterval(this._splash.bind(null, dirs, i), 50);
```
Values are then added or subtracted to these values to access adjacent cells in all directions.
```javascript
i++;
if (i > 10) {
  window.clearInterval(this.interval_boop);
}
dirs['dirA'] = [dirs['dirA'][0]-1, dirs['dirA'][1]-1];
dirs['dirB'] = [dirs['dirB'][0]-1, dirs['dirB'][1]];
dirs['dirC'] = [dirs['dirC'][0]-1, dirs['dirC'][1]+1];
dirs['dirD'] = [dirs['dirD'][0], dirs['dirD'][1]+1];
dirs['dirE'] = [dirs['dirE'][0]+1, dirs['dirE'][1]+1];
dirs['dirF'] = [dirs['dirF'][0]+1, dirs['dirF'][1]];
dirs['dirG'] = [dirs['dirG'][0]+1, dirs['dirG'][1]-1];
dirs['dirH'] = [dirs['dirH'][0], dirs['dirH'][1]-1];
Object.keys(dirs).forEach(dir => {
  var x = dirs[dir][1];
  var y = dirs[dir][0];
  if ($(`#m${x}.mcol${y}`).css('background-color') !== "rgb(165, 163, 163)" &&
$(`#m${x}.mcol${y}`).css('background-color') !== "rgb(255, 255, 255)") {
    $(`#m${x}.mcol${y}`).css('background-color', 'rgb(82,80,80)');
    window.setTimeout(function() {
      $(`#m${x}.mcol${y}`).css('background-color', '#353e42');
    }, 50);
  }
});
```
An interval is set up which increments a counter that corresponds to the current column that needs to be played.
```javascript
this.timeout = ((60/140) * 1000) * 0.5;
var i = 0;

this.interval = window.setInterval(() => {
  this._playColumn(i % 32);
  i++;
}, this.timeout);
```

The value of the counter is used to play the corresponding column for both the note matrix and the drum sequencer

Note Matrix:
```javascript
var pads = document.getElementsByClassName(`mcol${i%16 + 1}`);
var prev_pads = '';
if (i%16 === 0) {
  prev_pads = document.getElementsByClassName(`mcol${16}`);
} else {
  prev_pads = document.getElementsByClassName(`mcol${i%16}`);
}
var sounds = [];
for (var j = 0; j < pads.length; j++) {
  if ($(prev_pads[j]).css('background-color') === "rgb(255, 255, 255)") {
    $(prev_pads[j]).css('background-color', "rgb(165, 163, 163)");
  }
  if ($(pads[j]).css('background-color') === "rgb(165, 163, 163)") {
    $(pads[j]).css('background-color', "rgb(255, 255, 255)");
    var el = document.getElementById(`t${pads[j].attributes[1].value}`);
    if (el.currentTime) {
      el.currentTime = 0;
    }
    el.play();
    sounds.push(el.children[0].attributes[0].value);

```

Drum Sequencer:
```javascript
var rows = $('ul.sequencer-row');
for (var j = 0;j < rows.length;j++) {
  var ratio = 32/(rows[j].children.length - 1);
  if (i%ratio === 0) {
    if (i%(rows[j].children.length-1) === 0) {
      if (i === 0) {
        $(rows[j].children[rows[j].children.length-2]).css({'box-shadow': 'none', 'background': ''});
      } else {

        $(rows[j].children[(rows[j].children.length-1)/2-1]).css({'box-shadow': 'none', 'background': ''});
      }
    } else {
      $(rows[j].children[(i-ratio)/ratio]).css({'box-shadow': 'none', 'background': ''});
    }
  }
  if (i%ratio === 0 && $(rows[j].children[i/ratio]).hasClass('clicked')) {
    if (document.getElementById(`s-${rows[j].dataset.pad}`).currentTime) {
      document.getElementById(`s-${rows[j].dataset.pad}`).currentTime = 0;
    }
    document.getElementById(`s-${rows[j].dataset.pad}`).play();
    $(rows[j].children[i/ratio]).css({'box-shadow': '2px 0px 20px white', 'background': 'lime'});
  }
}
```

## Future Directions
* Optimize code within intervals to minimize amount of lag
* Allow for further customization of sounds by having a database of sounds that the user can choose from
* Increasing the options for note length to include sixteenth and thirty-second notes
* Allow manual control over BPM




[url]: <http://notematrix.herokuapp.com>
[gif]: <http://g.recordit.co/wT7dpZvn8C.gif>
