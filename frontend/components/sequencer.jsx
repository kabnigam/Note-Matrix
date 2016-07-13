const React = require('react');
const NoteConstants = require('../constants/note_constants');
const SeqRow = require('./seq_row');

const Sequencer = React.createClass({
  getInitialState: function() {
    return {steps: 16, note: 4, sig_top: 4, sig_bottom: 4, playing: false, bpm: 140};
  },
  _handeClick: function(e) {
    if ($(e.target).hasClass('clicked')) {
      $(e.target).removeClass('clicked');
    } else {
      $(e.target).addClass('clicked');
    }
  },
  _handlePlay: function() {
    this.setState({playing: true});
  },
  _handleStop: function() {
    this.setState({playing: false});
    window.clearInterval(this.interval);
    $('li.time-step').removeClass('on');
  },
  _startPlaying: function() {
    // let timeout = (NoteConstants[this.state.note]/this.state.bpm) * 1000;
    let timeout = (60/this.state.bpm) * 1000;
    let i = 0;
    $(`[data-num=${i}]`).addClass('on');
    this._playColumn(i);
    this.interval = window.setInterval( () => {
      $(`[data-num=${i}]`).removeClass('on');
      i++;
      $(`[data-num=${i}]`).addClass('on');
      this._playColumn(i);
      if (i === 16) {
        i = 0;
        $(`[data-num=${i}]`).addClass('on');
        this._playColumn(i);
      }
    }, timeout);
  },

  _playColumn: function(j) {
    let rows = $('ul.sequencer-row');
    for (var i = 0; i < rows.length; i++) {
      if ($(rows[i].children[j]).hasClass('clicked')) {

        document.getElementById(rows[i].dataset.pad).pause();
        document.getElementById(rows[i].dataset.pad).currentTime = 0;
        document.getElementById(rows[i].dataset.pad).play();
      }
    }
  },

  render: function() {
    this.rows = [[],[],[],[],[],[],[],[],[]];
    this.rows.forEach(row => {
      for (var i = 0; i < this.state.steps; i++) {
        row.push();
      }
    });
    let timeRow = [];
    for (var i = 0; i < 16; i++) {
      timeRow.push(<li className='note-step time-step' data-num={i}></li>);
    }
    this.rows.push(timeRow);
    let playback = <button onClick={this._handlePlay}>PLAY</button>;
    if (this.state.playing) {
      this._startPlaying();
      playback = <button onClick={this._handleStop}>STOP</button>;
    }

    return (
      <div className='sequencer'>
        <table>
          <tr>
            <td></td>
            <td>
              <ul className='sequencer-row' data-pad='nine'>
                {this.rows[0]}
              </ul>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <ul className='sequencer-row' data-pad='eight'>
                {this.rows[1]}
              </ul>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <ul className='sequencer-row' data-pad='seven'>
                {this.rows[2]}
              </ul>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <ul className='sequencer-row' data-pad='six'>
                {this.rows[3]}
              </ul>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <ul className='sequencer-row' data-pad='five'>
                {this.rows[4]}
              </ul>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <ul className='sequencer-row' data-pad='four'>
                {this.rows[5]}
              </ul>
            </td>
          </tr>
          <tr>
            <td>Hi-Hat</td>
            <td>
              <ul className='sequencer-row' data-pad='three'>
                {this.rows[6]}
              </ul>
            </td>
          </tr>
          <tr>
            <td>Snare</td>
            <td>
              <ul className='sequencer-row' data-pad='two'>
                {this.rows[7]}
              </ul>
            </td>
          </tr>
          <tr>
            <td>Sub</td>
            <td>
              <ul className='sequencer-row' data-pad='one'>
                {this.rows[8]}
              </ul>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <ul className='sequencer-row timer-row'>
                {this.rows[9]}
              </ul>
            </td>
          </tr>

        </table>
        {playback}
      </div>
    );
  }
});

module.exports = Sequencer;
