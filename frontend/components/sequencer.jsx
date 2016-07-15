const React = require('react');
const NoteConstants = require('../constants/note_constants');
const SeqRow = require('./seq_row');

const Sequencer = React.createClass({
  getInitialState: function() {
    return {steps: 16, sig_top: 4, sig_bottom: 4, playing: false, bpm: 140, shortest_note: 4};
  },

  _handlePlay: function() {
    this.setState({playing: true});
  },
  _handleStop: function() {
    this.setState({playing: false});
    window.clearInterval(this.interval);
    window.clearInterval(this.lineInterval);
    $('.timeline').attr("style",`left: 100px`);
    $('li.time-step').removeClass('on');
  },
  _setShortestNote: function(n) {
    this.setState({shortest_note: n});
    if (this.state.playing) {

      this._handleStop();
      this._handlePlay();
    }
  },
  _startPlaying: function() {
    // let timeout = (NoteConstants[this.state.note]/this.state.bpm) * 1000;
    let timeout = ((60/this.state.bpm) * 1000) * (this.state.sig_top/this.state.shortest_note);
    let i = 0;
    let j = 0;
    $(`[data-num=${j}]`).addClass('on');
    this._playColumn(i);
    this.interval = window.setInterval( () => {
      if (j%1 === 0) {
        $(`[data-num=${j}]`).removeClass('on');
      }
      i++;
      j = j + (1 * (this.state.sig_top/this.state.shortest_note));
      if (j%1 === 0) {
        $(`[data-num=${j}]`).addClass('on');
      }

      this._playColumn(i);
      if (i === 16/(this.state.sig_top/this.state.shortest_note) ) {
        i = 0;
        j = 0;
        $(`[data-num=${j}]`).addClass('on');
        this._playColumn(i);
      }
    }, timeout);
    let current = 100;
    this.lineInterval = window.setInterval(() => {
      $('.timeline').attr("style",`left: ${current}px`);
      current += 802/((60/this.state.bpm) * 16)/100;
      if (current > 902) {
        current = 100;
      }
    }, 10);
  },

  _handleReset: function() {
    let clicked = $('.clicked').slice();
    for (var i = 0; i < clicked.length; i++) {
      $('.clicked').eq(0).removeClass('clicked');
    }
  },

  _setBPM: function(e) {
    if (!isNaN(parseFloat(e.target.value))) {
      this.setState({bpm: parseFloat(e.target.value)});
    } else if (e.target.value === '') {
      this.setState({bpm: ''});
    }

  },

  _playColumn: function(j) {
    let rows = $('ul.sequencer-row');
    for (var i = 0; i < rows.length; i++) {
      let ratio = (16/(this.state.sig_top/this.state.shortest_note))/(rows[i].children.length-1);
      if (j%ratio === 0 && $(rows[i].children[j/ratio]).hasClass('clicked')) {

        // document.getElementById(`s-${rows[i].dataset.pad}`).pause();
        if (document.getElementById(`s-${rows[i].dataset.pad}`).currentTime) {
          document.getElementById(`s-${rows[i].dataset.pad}`).currentTime = 0;
        }
        document.getElementById(`s-${rows[i].dataset.pad}`).play();
        if (document.getElementById(`s-${rows[i].dataset.pad}`).children[0].attributes[0].value === "https://s3-us-west-1.amazonaws.com/soundsamples/808_sub.wav") {
          $('.pad-layout').effect("shake", {times: 30, distance: 1});
        }
      }
    }
  },

  render: function() {
    this.rows = [[],[],[],[],[],[],[],[],[]];
    // this.rows.forEach(row => {
    //   for (var i = 0; i < this.state.steps; i++) {
    //     row.push();
    //   }
    // });
    let timeRow = [];
    for (var i = 0; i < 16; i++) {
      timeRow.push(<li className='time-step' data-num={i}></li>);
    }
    let playback = <button onClick={this._handlePlay}>PLAY</button>;
    if (this.state.playing) {

      this._startPlaying();
      playback = <button onClick={this._handleStop}>STOP</button>;
    }

    return (
      <div className='sequencer'>
        <label>
          BPM:
          <input type='text' onChange={this._setBPM} value={this.state.bpm}></input>
        </label>
        <table>
          
          <tr>
            <td className='instrument-name' data-seq='s-seven'>Lex Chant</td>
            <td>
              <SeqRow setNote={this._setShortestNote} steps={this.state.steps} pad='seven' clicked={[1,5,9,13]}/>
            </td>
          </tr>
          <tr>
            <td className='instrument-name' data-seq='s-six'>Biggie 2</td>
            <td>
              <SeqRow setNote={this._setShortestNote} steps={this.state.steps} pad='six' clicked={[0,2,3,5,6]}/>
            </td>
          </tr>
          <tr>
            <td className='instrument-name' data-seq='s-five'>Biggie 5</td>
            <td>
              <SeqRow setNote={this._setShortestNote} steps={this.state.steps} pad='five' clicked={[13]}/>
            </td>
          </tr>
          <tr>
            <td className='instrument-name' data-seq='s-four'>Hi-Hat 1</td>
            <td>
              <SeqRow setNote={this._setShortestNote} steps={this.state.steps} pad='four'/>
            </td>
          </tr>
          <tr>
            <td className='instrument-name' data-seq='s-three'>Snare</td>
            <td>
              <SeqRow setNote={this._setShortestNote} steps={this.state.steps} pad='three' clicked={[2,6,10,14]}/>
            </td>
          </tr>
          <tr>
            <td className='instrument-name' data-seq='s-two'>Kick</td>
            <td>
              <SeqRow setNote={this._setShortestNote} steps={this.state.steps} pad='two'/>
            </td>
          </tr>
          <tr>
            <td className='instrument-name' data-seq='s-one'>Sub</td>
            <td>
              <SeqRow setNote={this._setShortestNote} steps={this.state.steps} pad='one' clicked={[0,3,5,7]}/>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <ul className='sequencer-row timer-row'>
                {timeRow}
              </ul>
            </td>
          </tr>

          <div className="timeline" style={{left: '100'}} />
        </table>

        <div className='playback-buttons'>

          {playback}
          <button onClick={this._handleReset}>RESET</button>
        </div>

      </div>
    );
  }
});

module.exports = Sequencer;
