const React = require('react');
const KeyConstants = require('../constants/key_constants');


const DrumPad = React.createClass({
  componentDidMount: function() {

    document.addEventListener('keydown', this._pressPad);
    document.addEventListener('keyup', this._releasePad);
  },

  _pressPad: function(e) {
  let pad = KeyConstants[e.which];
  $(`li.pad[data-pad=${pad}]`).addClass('clicked');
  this._registerSound(pad);

  if (pad === "0" && $('.current-kit').html() === '808') {
    $('.pad-layout').effect("shake", {times: 30, distance: 1});
  }
  // else {
  //   let color = '#'+Math.floor(Math.random()*16777215).toString(16);
  //   $('body').attr('style', `background-color:${color}`);
  // }

},

_releasePad: function(e) {
  let pad = KeyConstants[e.which];
  $(`li.pad[data-pad=${pad}]`).removeClass('clicked');
    // $('body').attr('style', `background-color:black`);
},

_registerSound: function(pad) {
  // document.getElementById(`p-${pad}`).pause();
  if (document.getElementById(`p${pad}`).currentTime !== null) {
    document.getElementById(`p${pad}`).currentTime = 0;
  }
  document.getElementById(`p${pad}`).play();
},

  render: function() {
    return (
      <div className='pad-layout'>
        <div className="current-kit">
          Drag kit here
        </div>
        <ul className="row">
          <li className='pad' data-pad='0'></li>
          <li className='pad' data-pad='1'></li>
          <li className='pad' data-pad='2'></li>
        </ul>
        <ul className="row">
          <li className='pad' data-pad='3'></li>
          <li className='pad' data-pad='4'></li>
          <li className='pad' data-pad='5'></li>
        </ul>
        <ul className="row">
          <li className='pad' data-pad='6'></li>
          <li className='pad' data-pad='7'></li>
          <li className='pad' data-pad='8'></li>
        </ul>

      </div>
    );
  }
});

module.exports = DrumPad;
