const React = require('react');
const KeyConstants = require('../constants/key_constants');


const DrumPad = React.createClass({
  componentDidMount: function() {

    document.addEventListener('keydown', this._pressPad);
    document.addEventListener('keyup', this._releasePad);
  },

  _pressPad: function(e) {
  let pad = KeyConstants[e.which];
  console.log(e.which);
  $(`.${pad}`).addClass('clicked');
  this._registerSound(pad);
},

_releasePad: function(e) {
  let pad = KeyConstants[e.which];
  $(`.${pad}`).removeClass('clicked');
},

_registerSound: function(pad) {
  document.getElementById(pad).pause();
  document.getElementById(pad).currentTime = 0;
  document.getElementById(pad).play();
},

  render: function() {
    return (
      <div className='pad-layout'>

        <ul className="row">
          <li className='pad one'></li>
          <li className='pad two'></li>
          <li className='pad three'></li>
        </ul>
        <ul className="row">
          <li className='pad four'></li>
          <li className='pad five'></li>
          <li className='pad six'></li>
        </ul>
        <ul className="row">
          <li className='pad seven'></li>
          <li className='pad eight'></li>
          <li className='pad nine'></li>
        </ul>

      </div>
    );
  }
});

module.exports = DrumPad;
