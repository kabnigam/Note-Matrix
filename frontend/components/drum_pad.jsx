const React = require('react');
const KeyConstants = require('../constants/key_constants');


const DrumPad = React.createClass({
  componentDidMount: function() {

    document.addEventListener('keydown', this._pressPad);
    document.addEventListener('keyup', this._releasePad);
  },

  _pressPad: function(e) {
  let pad = KeyConstants[e.which];
  $(`.${pad}`).addClass('clicked');
  this._registerSound(pad);
},

_releasePad: function(e) {
  let pad = KeyConstants[e.which];
  $(`.${pad}`).removeClass('clicked');
},

_registerSound: function(pad) {
  // document.getElementById(`p-${pad}`).pause();
  document.getElementById(`p-${pad}`).currentTime = 0;
  document.getElementById(`p-${pad}`).play();
},

  render: function() {
    return (
      <div className='pad-layout'>

        <ul className="row">
          <li className='pad' data-pad='one'></li>
          <li className='pad' data-pad='two'></li>
          <li className='pad' data-pad='three'></li>
        </ul>
        <ul className="row">
          <li className='pad' data-pad='four'></li>
          <li className='pad' data-pad='five'></li>
          <li className='pad' data-pad='six'></li>
        </ul>
        <ul className="row">
          <li className='pad' data-pad='seven'></li>
          <li className='pad' data-pad='eight'></li>
          <li className='pad' data-pad='nine'></li>
        </ul>

      </div>
    );
  }
});

module.exports = DrumPad;
