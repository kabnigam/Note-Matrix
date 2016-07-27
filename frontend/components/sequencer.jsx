const React = require('react');
const NoteConstants = require('../constants/note_constants');
const SeqRow = require('./seq_row');

const Sequencer = React.createClass({
  getInitialState: function() {
    return {steps: 16, sig_top: 4, sig_bottom: 4, playing: false, bpm: 140, shortest_note: 4};
  },


  
  _setShortestNote: function(n) {
    this.setState({shortest_note: n});
    if (this.state.playing) {

      this._handleStop();
      this._handlePlay();
    }
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



  render: function() {
    this.rows = [[],[],[],[],[],[],[],[],[]];

    let timeRow = [];
    for (var i = 0; i < 16; i++) {
      timeRow.push(<li key={`${i}time`} className='beat' data-num={i}>{i+1}</li>);
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
