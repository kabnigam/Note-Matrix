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
      // $('.timeline').attr("style",`left: ${current}px`);
      // if (this.props.tutorial) {

        current += 800/((60/this.state.bpm) * 16)/100;
      // } else {
      //
      //   current +=  1.172;
      // }
      if (current > 900) {
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

    let timeRow = [];
    for (var i = 0; i < 16; i++) {
      timeRow.push(<li className='beat' data-num={i}>{i+1}</li>);
    }




    return (
      <div className='sequencer'>

        <table>

          <tr>
            <td className='instrument-name' data-seq='s-seven'>Lex Chant</td>
            <td>
              <SeqRow setNote={this._setShortestNote} steps={this.state.steps} pad='seven' clicked={this.props.clicked[0]}/>
            </td>
          </tr>
          <tr>
            <td className='instrument-name' data-seq='s-six'>Woo!</td>
            <td>
              <SeqRow setNote={this._setShortestNote} steps={this.state.steps} pad='six' clicked={this.props.clicked[1]}/>
            </td>
          </tr>
          <tr>
            <td className='instrument-name' data-seq='s-five'>Hi-Hat O</td>
            <td>
              <SeqRow setNote={this._setShortestNote} steps={this.state.steps} pad='five' clicked={this.props.clicked[2]}/>
            </td>
          </tr>
          <tr>
            <td className='instrument-name' data-seq='s-four'>Hi-Hat C</td>
            <td>
              <SeqRow setNote={this._setShortestNote} steps={this.state.steps} pad='four' />
            </td>
          </tr>
          <tr>
            <td className='instrument-name' data-seq='s-three'>Snare</td>
            <td>
              <SeqRow setNote={this._setShortestNote} steps={this.state.steps} pad='three'/>
            </td>
          </tr>
          <tr>
            <td className='instrument-name' data-seq='s-two'>Kick</td>
            <td>
              <SeqRow setNote={this._setShortestNote} steps={this.state.steps} pad='two' clicked={this.props.clicked[3]}/>
            </td>
          </tr>

          <tr>
            <td className='instrument-name' data-seq='s-one'>Sub</td>
            <td>
              <SeqRow setNote={this._setShortestNote} steps={this.state.steps} pad='one' clicked={this.props.clicked[4]}/>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <ul className='sequencer-row beat-row'>
                {timeRow}
              </ul>
            </td>
          </tr>


        </table>



      </div>
    );
  }
});

module.exports = Sequencer;
