const React = require('react');
const Sequencer = require('./sequencer.jsx');


const ToneMatrix = React.createClass({
  getInitialState: function() {
    return {playing: false, drums: false};
  },

  _handleClick: function(e) {
    if ($(e.target).css('background-color') === "rgb(165, 163, 163)") {
      $(e.target).css('background-color', '#353e42');
    } else {
      $(e.target).css('background-color', "rgb(165, 163, 163)");
    }

    if (!this.state.playing) {
      this.setState({playing: true});
    }

    var re = /\d+/;
    let target_x = parseInt(e.target.attributes[0].value.match(re)[0]);
    let target_y = parseInt(e.target.attributes[1].value.match(re)[0]);


    let dirs = {'dirA': [target_x, target_y], 'dirB': [target_x, target_y], 'dirC': [target_x, target_y], 'dirE': [target_x, target_y], 'dirF': [target_x, target_y], 'dirG': [target_x, target_y], 'dirH': [target_x, target_y], 'dirD': [target_x, target_y]};

    let i = 0;
    this.interval_boop = window.setInterval(this._splash.bind(null, dirs, i), 50);
  },

  _splash: function(dirs, i) {
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
        let x = dirs[dir][1];
        let y = dirs[dir][0];
        if ($(`#m${x}.mcol${y}`).css('background-color') !== "rgb(165, 163, 163)" &&
      $(`#m${x}.mcol${y}`).css('background-color') !== "rgb(255, 255, 255)") {

          $(`#m${x}.mcol${y}`).css('background-color', 'rgb(82,80,80)');
          window.setTimeout(function() {
            $(`#m${x}.mcol${y}`).css('background-color', '#353e42');
          }, 50);
        }
      });
  },


  _startPlaying: function() {
    this.timeout = ((60/140) * 1000) * 0.5;
    let i = 0;

    this.interval = window.setInterval(() => {
      this._playColumn(i % 32);
      i++;
    }, this.timeout);


  },

  _handleStop: function() {
    this.setState({playing: false});
    window.clearInterval(this.interval);
  },

  _handlePlay: function() {
    this.setState({playing: true});
  },

  _showDrums: function() {
    this.setState({drums: true, playing: false});

    window.clearInterval(this.interval);
  },

  _playColumn: function(i) {
    let pads = document.getElementsByClassName(`mcol${i%16 + 1}`);
    let prev_pads = '';
    if (i%16 === 0) {
      prev_pads = document.getElementsByClassName(`mcol${16}`);
    } else {
      prev_pads = document.getElementsByClassName(`mcol${i%16}`);
    }
    let sounds = [];
    for (var j = 0; j < pads.length; j++) {
      if ($(prev_pads[j]).css('background-color') === "rgb(255, 255, 255)") {
        $(prev_pads[j]).css('background-color', "rgb(165, 163, 163)");
      }
      if ($(pads[j]).css('background-color') === "rgb(165, 163, 163)") {
        $(pads[j]).css('background-color', "rgb(255, 255, 255)");
        let el = document.getElementById(`t${pads[j].attributes[1].value}`);
        if (el.currentTime) {
          el.currentTime = 0;
        }
        el.play();
        sounds.push(el.children[0].attributes[0].value);


        var re = /\d+/;
        let target_x = parseInt(pads[j].attributes[0].value.match(re)[0]);
        let target_y = parseInt(pads[j].attributes[1].value.match(re)[0]);

        let dirs = {'dirA': [target_x, target_y], 'dirB': [target_x, target_y], 'dirC': [target_x, target_y], 'dirE': [target_x, target_y], 'dirF': [target_x, target_y], 'dirG': [target_x, target_y], 'dirH': [target_x, target_y], 'dirD': [target_x, target_y]};



        let k = 0;
        window.clearInterval(this.interval_boop);
        this.interval_boop = window.setInterval(this._splash.bind(null, dirs, k), 50);
      }
    }
    if (this.state.drums) {

      let rows = $('ul.sequencer-row');
      for (var j = 0;j < rows.length;j++) {

        let ratio = 32/(rows[j].children.length - 1);
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
    }

  },

  render: function() {
    if (this.state.playing) {
      this._startPlaying();
    }
    let drums = [];


    if (this.state.drums) {
      drums.push(<Sequencer key={'sequencer'} playing={this.state.playing} clicked={[[],[],[],[],[]]}/>);
      $('.add-drums-btn').hide();
      $('.playback-buttons').css('display','block');

      }
    let seqSounds = {
      's-one': "https://s3-us-west-1.amazonaws.com/soundsamples/808_sub.mp3",
      's-two': "https://s3-us-west-1.amazonaws.com/soundsamples/Squad+Kick+3.mp3",
      's-three':'https://s3-us-west-1.amazonaws.com/soundsamples/Squad+Snare+5.wav',
      's-four': 'https://s3-us-west-1.amazonaws.com/soundsamples/Squad+HiHat+3.mp3',
      's-five': 'https://s3-us-west-1.amazonaws.com/soundsamples/Squad+HiHat+4.mp3',
      's-six':'https://s3-us-west-1.amazonaws.com/soundsamples/WOO.mp3',
      's-seven':'https://s3-us-west-1.amazonaws.com/soundsamples/LEX+Chant.mp3' };
    let seqs = Object.keys(seqSounds).map(id => {

      return (
        <audio key={`audio${id}`} id={id}>
          <source key={`source${id}`} src={seqSounds[id]} />
        </audio>
      );
    });

    let playback = <div key={'play'} className='playback-btn' onClick={this._handlePlay}><h2>Play</h2></div>;
    if (this.state.playing) {
      playback = <div key={'stop'} className='playback-btn' onClick={this._handleStop}><h2>Stop</h2></div>;
    }


    return (
      <div>
        <div className='dirs'>
          <h4>Click any square to start the matrix, which loops from left to right.</h4>
        </div>
        <div className='matrix'>
          <div className='matrix-sounds'>
            <audio id='tm1'>
              <source src='https://s3-us-west-1.amazonaws.com/soundsamples/Hapi_vs_Xylophone_011.mp3' />
            </audio>
            <audio id='tm2'>
              <source src='https://s3-us-west-1.amazonaws.com/soundsamples/Hapi_vs_Xylophone_012.mp3' />
            </audio>
            <audio id='tm3'>
              <source src='https://s3-us-west-1.amazonaws.com/soundsamples/Hapi_vs_Xylophone_013.mp3' />
            </audio>
            <audio id='tm4'>
              <source src='https://s3-us-west-1.amazonaws.com/soundsamples/Hapi_vs_Xylophone_014.mp3' />
            </audio>
            <audio id='tm5'>
              <source src='https://s3-us-west-1.amazonaws.com/soundsamples/Hapi_vs_Xylophone_015.mp3' />
            </audio>
            <audio id='tm6'>
              <source src='https://s3-us-west-1.amazonaws.com/soundsamples/Hapi_vs_Xylophone_016.mp3' />
            </audio>
            <audio id='tm7'>
              <source src='https://s3-us-west-1.amazonaws.com/soundsamples/Hapi_vs_Xylophone_017.mp3' />
            </audio>
            <audio id='tm8'>
              <source src='https://s3-us-west-1.amazonaws.com/soundsamples/Hapi_vs_Xylophone_018.mp3' />
            </audio>
            <audio id='tm9'>
              <source src='https://s3-us-west-1.amazonaws.com/soundsamples/Hapi_vs_Xylophone_019.mp3' />
            </audio>
            <audio id='tm10'>
              <source src='https://s3-us-west-1.amazonaws.com/soundsamples/Hapi_vs_Xylophone_020.mp3' />
            </audio>
            <audio id='tm11'>
              <source src='https://s3-us-west-1.amazonaws.com/soundsamples/Hapi_vs_Xylophone_021.mp3' />
            </audio>
            <audio id='tm12'>
              <source src='https://s3-us-west-1.amazonaws.com/soundsamples/Hapi_vs_Xylophone_022.mp3' />
            </audio>
            <audio id='tm13'>
              <source src='https://s3-us-west-1.amazonaws.com/soundsamples/Hapi_vs_Xylophone_023.mp3' />
            </audio>
            <audio id='tm14'>
              <source src='https://s3-us-west-1.amazonaws.com/soundsamples/Hapi_vs_Xylophone_024.mp3' />
            </audio>
            <audio id='tm15'>
              <source src='https://s3-us-west-1.amazonaws.com/soundsamples/Hapi_vs_Xylophone_025.mp3' />
            </audio>
            <audio id='tm16'>
              <source src='https://s3-us-west-1.amazonaws.com/soundsamples/Hapi_vs_Xylophone_026.mp3' />
            </audio>
          </div>
          <ul>
            <li className='mcol1' id='m16' onClick={this._handleClick}></li>
            <li className='mcol2' id='m16' onClick={this._handleClick}></li>
            <li className='mcol3' id='m16' onClick={this._handleClick}></li>
            <li className='mcol4' id='m16' onClick={this._handleClick}></li>
            <li className='mcol5' id='m16' onClick={this._handleClick}></li>
            <li className='mcol6' id='m16' onClick={this._handleClick}></li>
            <li className='mcol7' id='m16' onClick={this._handleClick}></li>
            <li className='mcol8' id='m16' onClick={this._handleClick}></li>
            <li className='mcol9' id='m16' onClick={this._handleClick}></li>
            <li className='mcol10' id='m16' onClick={this._handleClick}></li>
            <li className='mcol11' id='m16' onClick={this._handleClick}></li>
            <li className='mcol12' id='m16' onClick={this._handleClick}></li>
            <li className='mcol13' id='m16' onClick={this._handleClick}></li>
            <li className='mcol14' id='m16' onClick={this._handleClick}></li>
            <li className='mcol15' id='m16' onClick={this._handleClick}></li>
            <li className='mcol16' id='m16' onClick={this._handleClick}></li>
          </ul>
          <ul>
            <li className='mcol1' id='m15' onClick={this._handleClick}></li>
            <li className='mcol2' id='m15' onClick={this._handleClick}></li>
            <li className='mcol3' id='m15' onClick={this._handleClick}></li>
            <li className='mcol4' id='m15' onClick={this._handleClick}></li>
            <li className='mcol5' id='m15' onClick={this._handleClick}></li>
            <li className='mcol6' id='m15' onClick={this._handleClick}></li>
            <li className='mcol7' id='m15' onClick={this._handleClick}></li>
            <li className='mcol8' id='m15' onClick={this._handleClick}></li>
            <li className='mcol9' id='m15' onClick={this._handleClick}></li>
            <li className='mcol10' id='m15' onClick={this._handleClick}></li>
            <li className='mcol11' id='m15' onClick={this._handleClick}></li>
            <li className='mcol12' id='m15' onClick={this._handleClick}></li>
            <li className='mcol13' id='m15' onClick={this._handleClick}></li>
            <li className='mcol14' id='m15' onClick={this._handleClick}></li>
            <li className='mcol15' id='m15' onClick={this._handleClick}></li>
            <li className='mcol16' id='m15' onClick={this._handleClick}></li>
          </ul>
          <ul>
            <li className='mcol1' id='m14' onClick={this._handleClick}></li>
            <li className='mcol2' id='m14' onClick={this._handleClick}></li>
            <li className='mcol3' id='m14' onClick={this._handleClick}></li>
            <li className='mcol4' id='m14' onClick={this._handleClick}></li>
            <li className='mcol5' id='m14' onClick={this._handleClick}></li>
            <li className='mcol6' id='m14' onClick={this._handleClick}></li>
            <li className='mcol7' id='m14' onClick={this._handleClick}></li>
            <li className='mcol8' id='m14' onClick={this._handleClick}></li>
            <li className='mcol9' id='m14' onClick={this._handleClick}></li>
            <li className='mcol10' id='m14' onClick={this._handleClick}></li>
            <li className='mcol11' id='m14' onClick={this._handleClick}></li>
            <li className='mcol12' id='m14' onClick={this._handleClick}></li>
            <li className='mcol13' id='m14' onClick={this._handleClick}></li>
            <li className='mcol14' id='m14' onClick={this._handleClick}></li>
            <li className='mcol15' id='m14' onClick={this._handleClick}></li>
            <li className='mcol16' id='m14' onClick={this._handleClick}></li>
          </ul>
          <ul>
            <li className='mcol1' id='m13' onClick={this._handleClick}></li>
            <li className='mcol2' id='m13' onClick={this._handleClick}></li>
            <li className='mcol3' id='m13' onClick={this._handleClick}></li>
            <li className='mcol4' id='m13' onClick={this._handleClick}></li>
            <li className='mcol5' id='m13' onClick={this._handleClick}></li>
            <li className='mcol6' id='m13' onClick={this._handleClick}></li>
            <li className='mcol7' id='m13' onClick={this._handleClick}></li>
            <li className='mcol8' id='m13' onClick={this._handleClick}></li>
            <li className='mcol9' id='m13' onClick={this._handleClick}></li>
            <li className='mcol10' id='m13' onClick={this._handleClick}></li>
            <li className='mcol11' id='m13' onClick={this._handleClick}></li>
            <li className='mcol12' id='m13' onClick={this._handleClick}></li>
            <li className='mcol13' id='m13' onClick={this._handleClick}></li>
            <li className='mcol14' id='m13' onClick={this._handleClick}></li>
            <li className='mcol15' id='m13' onClick={this._handleClick}></li>
            <li className='mcol16' id='m13' onClick={this._handleClick}></li>
          </ul>
          <ul>
            <li className='mcol1' id='m12' onClick={this._handleClick}></li>
            <li className='mcol2' id='m12' onClick={this._handleClick}></li>
            <li className='mcol3' id='m12' onClick={this._handleClick}></li>
            <li className='mcol4' id='m12' onClick={this._handleClick}></li>
            <li className='mcol5' id='m12' onClick={this._handleClick}></li>
            <li className='mcol6' id='m12' onClick={this._handleClick}></li>
            <li className='mcol7' id='m12' onClick={this._handleClick}></li>
            <li className='mcol8' id='m12' onClick={this._handleClick}></li>
            <li className='mcol9' id='m12' onClick={this._handleClick}></li>
            <li className='mcol10' id='m12' onClick={this._handleClick}></li>
            <li className='mcol11' id='m12' onClick={this._handleClick}></li>
            <li className='mcol12' id='m12' onClick={this._handleClick}></li>
            <li className='mcol13' id='m12' onClick={this._handleClick}></li>
            <li className='mcol14' id='m12' onClick={this._handleClick}></li>
            <li className='mcol15' id='m12' onClick={this._handleClick}></li>
            <li className='mcol16' id='m12' onClick={this._handleClick}></li>
          </ul>
          <ul>
            <li className='mcol1' id='m11' onClick={this._handleClick}></li>
            <li className='mcol2' id='m11' onClick={this._handleClick}></li>
            <li className='mcol3' id='m11' onClick={this._handleClick}></li>
            <li className='mcol4' id='m11' onClick={this._handleClick}></li>
            <li className='mcol5' id='m11' onClick={this._handleClick}></li>
            <li className='mcol6' id='m11' onClick={this._handleClick}></li>
            <li className='mcol7' id='m11' onClick={this._handleClick}></li>
            <li className='mcol8' id='m11' onClick={this._handleClick}></li>
            <li className='mcol9' id='m11' onClick={this._handleClick}></li>
            <li className='mcol10' id='m11' onClick={this._handleClick}></li>
            <li className='mcol11' id='m11' onClick={this._handleClick}></li>
            <li className='mcol12' id='m11' onClick={this._handleClick}></li>
            <li className='mcol13' id='m11' onClick={this._handleClick}></li>
            <li className='mcol14' id='m11' onClick={this._handleClick}></li>
            <li className='mcol15' id='m11' onClick={this._handleClick}></li>
            <li className='mcol16' id='m11' onClick={this._handleClick}></li>
          </ul>
          <ul>
            <li className='mcol1' id='m10' onClick={this._handleClick}></li>
            <li className='mcol2' id='m10' onClick={this._handleClick}></li>
            <li className='mcol3' id='m10' onClick={this._handleClick}></li>
            <li className='mcol4' id='m10' onClick={this._handleClick}></li>
            <li className='mcol5' id='m10' onClick={this._handleClick}></li>
            <li className='mcol6' id='m10' onClick={this._handleClick}></li>
            <li className='mcol7' id='m10' onClick={this._handleClick}></li>
            <li className='mcol8' id='m10' onClick={this._handleClick}></li>
            <li className='mcol9' id='m10' onClick={this._handleClick}></li>
            <li className='mcol10' id='m10' onClick={this._handleClick}></li>
            <li className='mcol11' id='m10' onClick={this._handleClick}></li>
            <li className='mcol12' id='m10' onClick={this._handleClick}></li>
            <li className='mcol13' id='m10' onClick={this._handleClick}></li>
            <li className='mcol14' id='m10' onClick={this._handleClick}></li>
            <li className='mcol15' id='m10' onClick={this._handleClick}></li>
            <li className='mcol16' id='m10' onClick={this._handleClick}></li>
          </ul>
          <ul>
            <li className='mcol1' id='m9' onClick={this._handleClick}></li>
            <li className='mcol2' id='m9' onClick={this._handleClick}></li>
            <li className='mcol3' id='m9' onClick={this._handleClick}></li>
            <li className='mcol4' id='m9' onClick={this._handleClick}></li>
            <li className='mcol5' id='m9' onClick={this._handleClick}></li>
            <li className='mcol6' id='m9' onClick={this._handleClick}></li>
            <li className='mcol7' id='m9' onClick={this._handleClick}></li>
            <li className='mcol8' id='m9' onClick={this._handleClick}></li>
            <li className='mcol9' id='m9' onClick={this._handleClick}></li>
            <li className='mcol10' id='m9' onClick={this._handleClick}></li>
            <li className='mcol11' id='m9' onClick={this._handleClick}></li>
            <li className='mcol12' id='m9' onClick={this._handleClick}></li>
            <li className='mcol13' id='m9' onClick={this._handleClick}></li>
            <li className='mcol14' id='m9' onClick={this._handleClick}></li>
            <li className='mcol15' id='m9' onClick={this._handleClick}></li>
            <li className='mcol16' id='m9' onClick={this._handleClick}></li>
          </ul>
          <ul>
            <li className='mcol1' id='m8' onClick={this._handleClick}></li>
            <li className='mcol2' id='m8' onClick={this._handleClick}></li>
            <li className='mcol3' id='m8' onClick={this._handleClick}></li>
            <li className='mcol4' id='m8' onClick={this._handleClick}></li>
            <li className='mcol5' id='m8' onClick={this._handleClick}></li>
            <li className='mcol6' id='m8' onClick={this._handleClick}></li>
            <li className='mcol7' id='m8' onClick={this._handleClick}></li>
            <li className='mcol8' id='m8' onClick={this._handleClick}></li>
            <li className='mcol9' id='m8' onClick={this._handleClick}></li>
            <li className='mcol10' id='m8' onClick={this._handleClick}></li>
            <li className='mcol11' id='m8' onClick={this._handleClick}></li>
            <li className='mcol12' id='m8' onClick={this._handleClick}></li>
            <li className='mcol13' id='m8' onClick={this._handleClick}></li>
            <li className='mcol14' id='m8' onClick={this._handleClick}></li>
            <li className='mcol15' id='m8' onClick={this._handleClick}></li>
            <li className='mcol16' id='m8' onClick={this._handleClick}></li>
          </ul>
          <ul>
            <li className='mcol1' id='m7' onClick={this._handleClick}></li>
            <li className='mcol2' id='m7' onClick={this._handleClick}></li>
            <li className='mcol3' id='m7' onClick={this._handleClick}></li>
            <li className='mcol4' id='m7' onClick={this._handleClick}></li>
            <li className='mcol5' id='m7' onClick={this._handleClick}></li>
            <li className='mcol6' id='m7' onClick={this._handleClick}></li>
            <li className='mcol7' id='m7' onClick={this._handleClick}></li>
            <li className='mcol8' id='m7' onClick={this._handleClick}></li>
            <li className='mcol9' id='m7' onClick={this._handleClick}></li>
            <li className='mcol10' id='m7' onClick={this._handleClick}></li>
            <li className='mcol11' id='m7' onClick={this._handleClick}></li>
            <li className='mcol12' id='m7' onClick={this._handleClick}></li>
            <li className='mcol13' id='m7' onClick={this._handleClick}></li>
            <li className='mcol14' id='m7' onClick={this._handleClick}></li>
            <li className='mcol15' id='m7' onClick={this._handleClick}></li>
            <li className='mcol16' id='m7' onClick={this._handleClick}></li>
          </ul>
          <ul>
            <li className='mcol1' id='m6' onClick={this._handleClick}></li>
            <li className='mcol2' id='m6' onClick={this._handleClick}></li>
            <li className='mcol3' id='m6' onClick={this._handleClick}></li>
            <li className='mcol4' id='m6' onClick={this._handleClick}></li>
            <li className='mcol5' id='m6' onClick={this._handleClick}></li>
            <li className='mcol6' id='m6' onClick={this._handleClick}></li>
            <li className='mcol7' id='m6' onClick={this._handleClick}></li>
            <li className='mcol8' id='m6' onClick={this._handleClick}></li>
            <li className='mcol9' id='m6' onClick={this._handleClick}></li>
            <li className='mcol10' id='m6' onClick={this._handleClick}></li>
            <li className='mcol11' id='m6' onClick={this._handleClick}></li>
            <li className='mcol12' id='m6' onClick={this._handleClick}></li>
            <li className='mcol13' id='m6' onClick={this._handleClick}></li>
            <li className='mcol14' id='m6' onClick={this._handleClick}></li>
            <li className='mcol15' id='m6' onClick={this._handleClick}></li>
            <li className='mcol16' id='m6' onClick={this._handleClick}></li>
          </ul>
          <ul>
            <li className='mcol1' id='m5' onClick={this._handleClick}></li>
            <li className='mcol2' id='m5' onClick={this._handleClick}></li>
            <li className='mcol3' id='m5' onClick={this._handleClick}></li>
            <li className='mcol4' id='m5' onClick={this._handleClick}></li>
            <li className='mcol5' id='m5' onClick={this._handleClick}></li>
            <li className='mcol6' id='m5' onClick={this._handleClick}></li>
            <li className='mcol7' id='m5' onClick={this._handleClick}></li>
            <li className='mcol8' id='m5' onClick={this._handleClick}></li>
            <li className='mcol9' id='m5' onClick={this._handleClick}></li>
            <li className='mcol10' id='m5' onClick={this._handleClick}></li>
            <li className='mcol11' id='m5' onClick={this._handleClick}></li>
            <li className='mcol12' id='m5' onClick={this._handleClick}></li>
            <li className='mcol13' id='m5' onClick={this._handleClick}></li>
            <li className='mcol14' id='m5' onClick={this._handleClick}></li>
            <li className='mcol15' id='m5' onClick={this._handleClick}></li>
            <li className='mcol16' id='m5' onClick={this._handleClick}></li>
          </ul>
          <ul>
            <li className='mcol1' id='m4' data-pos='[0,3]' onClick={this._handleClick}></li>
            <li className='mcol2' id='m4' data-pos='[1,3]' onClick={this._handleClick}></li>
            <li className='mcol3' id='m4' data-pos='[2,3]' onClick={this._handleClick}></li>
            <li className='mcol4' id='m4' data-pos='[3,3]' onClick={this._handleClick}></li>
            <li className='mcol5' id='m4' data-pos='[4,3]' onClick={this._handleClick}></li>
            <li className='mcol6' id='m4' data-pos='[5,3]' onClick={this._handleClick}></li>
            <li className='mcol7' id='m4' data-pos='[6,3]' onClick={this._handleClick}></li>
            <li className='mcol8' id='m4' data-pos='[7,3]' onClick={this._handleClick}></li>
            <li className='mcol9' id='m4' data-pos='[8,3]' onClick={this._handleClick}></li>
            <li className='mcol10' id='m4' data-pos='[9,3]' onClick={this._handleClick}></li>
            <li className='mcol11' id='m4' data-pos='[10,3]' onClick={this._handleClick}></li>
            <li className='mcol12' id='m4' data-pos='[11,3]' onClick={this._handleClick}></li>
            <li className='mcol13' id='m4' data-pos='[12,3]' onClick={this._handleClick}></li>
            <li className='mcol14' id='m4' data-pos='[13,3]' onClick={this._handleClick}></li>
            <li className='mcol15' id='m4' data-pos='[14,3]' onClick={this._handleClick}></li>
            <li className='mcol16' id='m4' data-pos='[15,3]' onClick={this._handleClick}></li>
          </ul>
          <ul>
            <li className='mcol1' id='m3' data-pos='[0,2]' onClick={this._handleClick}></li>
            <li className='mcol2' id='m3' data-pos='[1,2]' onClick={this._handleClick}></li>
            <li className='mcol3' id='m3' data-pos='[2,2]' onClick={this._handleClick}></li>
            <li className='mcol4' id='m3' data-pos='[3,2]' onClick={this._handleClick}></li>
            <li className='mcol5' id='m3' data-pos='[4,2]' onClick={this._handleClick}></li>
            <li className='mcol6' id='m3' data-pos='[5,2]' onClick={this._handleClick}></li>
            <li className='mcol7' id='m3' data-pos='[6,2]' onClick={this._handleClick}></li>
            <li className='mcol8' id='m3' data-pos='[7,2]' onClick={this._handleClick}></li>
            <li className='mcol9' id='m3' data-pos='[8,2]' onClick={this._handleClick}></li>
            <li className='mcol10' id='m3' data-pos='[9,2]' onClick={this._handleClick}></li>
            <li className='mcol11' id='m3' data-pos='[10,2]' onClick={this._handleClick}></li>
            <li className='mcol12' id='m3' data-pos='[11,2]' onClick={this._handleClick}></li>
            <li className='mcol13' id='m3' data-pos='[12,2]' onClick={this._handleClick}></li>
            <li className='mcol14' id='m3' data-pos='[13,2]' onClick={this._handleClick}></li>
            <li className='mcol15' id='m3' data-pos='[14,2]' onClick={this._handleClick}></li>
            <li className='mcol16' id='m3' data-pos='[15,2]' onClick={this._handleClick}></li>
          </ul>
          <ul>
            <li className='mcol1' id='m2' data-pos='[0,1]' onClick={this._handleClick}></li>
            <li className='mcol2' id='m2' data-pos='[1,1]' onClick={this._handleClick}></li>
            <li className='mcol3' id='m2' data-pos='[2,1]' onClick={this._handleClick}></li>
            <li className='mcol4' id='m2' data-pos='[3,1]' onClick={this._handleClick}></li>
            <li className='mcol5' id='m2' data-pos='[4,1]' onClick={this._handleClick}></li>
            <li className='mcol6' id='m2' data-pos='[5,1]' onClick={this._handleClick}></li>
            <li className='mcol7' id='m2' data-pos='[6,1]' onClick={this._handleClick}></li>
            <li className='mcol8' id='m2' data-pos='[7,1]' onClick={this._handleClick}></li>
            <li className='mcol9' id='m2' data-pos='[8,1]' onClick={this._handleClick}></li>
            <li className='mcol10' id='m2' data-pos='[9,1]' onClick={this._handleClick}></li>
            <li className='mcol11' id='m2' data-pos='[10,1]' onClick={this._handleClick}></li>
            <li className='mcol12' id='m2' data-pos='[11,1]' onClick={this._handleClick}></li>
            <li className='mcol13' id='m2' data-pos='[12,1]' onClick={this._handleClick}></li>
            <li className='mcol14' id='m2' data-pos='[13,1]' onClick={this._handleClick}></li>
            <li className='mcol15' id='m2' data-pos='[14,1]' onClick={this._handleClick}></li>
            <li className='mcol16' id='m2' data-pos='[15,1]' onClick={this._handleClick}></li>
          </ul>
          <ul>
            <li className='mcol1' id='m1' data-pos='[0,0]'onClick={this._handleClick}></li>
            <li className='mcol2' id='m1' data-pos='[1,0]' onClick={this._handleClick}></li>
            <li className='mcol3' id='m1' data-pos='[2,0]' onClick={this._handleClick}></li>
            <li className='mcol4' id='m1' data-pos='[3,0]' onClick={this._handleClick}></li>
            <li className='mcol5' id='m1' data-pos='[4,0]' onClick={this._handleClick}></li>
            <li className='mcol6' id='m1' data-pos='[5,0]' onClick={this._handleClick}></li>
            <li className='mcol7' id='m1' data-pos='[6,0]' onClick={this._handleClick}></li>
            <li className='mcol8' id='m1' data-pos='[7,0]' onClick={this._handleClick}></li>
            <li className='mcol9' id='m1' data-pos='[8,0]' onClick={this._handleClick}></li>
            <li className='mcol10' id='m1' data-pos='[9,0]' onClick={this._handleClick}></li>
            <li className='mcol11' id='m1' data-pos='[10,0]' onClick={this._handleClick}></li>
            <li className='mcol12' id='m1' data-pos='[11,0]' onClick={this._handleClick}></li>
            <li className='mcol13' id='m1' data-pos='[12,0]' onClick={this._handleClick}></li>
            <li className='mcol14' id='m1' data-pos='[13,0]' onClick={this._handleClick}></li>
            <li className='mcol15' id='m1' data-pos='[14,0]' onClick={this._handleClick}></li>
            <li className='mcol16' id='m1' data-pos='[15,0]' onClick={this._handleClick}></li>
          </ul>
          <div className='add-drums-btn' onClick={this._showDrums}>
            <h2>Add Drums</h2>
          </div>
        </div>
        {drums}
        {seqs}
        <div className='playback-buttons'>

          {playback}

        </div>
      </div>
    );

  }
});

module.exports = ToneMatrix;
