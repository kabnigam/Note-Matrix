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
          Drag Kit Here
        </div>
        <ul className="row">
          <li className='pad p0' data-pad='0'><p>q</p></li>
          <li className='pad p1' data-pad='1'><p>w</p></li>
          <li className='pad p2' data-pad='2'><p>e</p></li>
        </ul>
        <ul className="row">
          <li className='pad p3' data-pad='3'><p>a</p></li>
          <li className='pad p4' data-pad='4'><p>s</p></li>
          <li className='pad p5' data-pad='5'><p>d</p></li>
        </ul>
        <ul className="row">
          <li className='pad p6' data-pad='6'><p>z</p></li>
          <li className='pad p7' data-pad='7'><p>x</p></li>
          <li className='pad p8' data-pad='8'><p>c</p></li>
        </ul>

      </div>
    );
  }
});

module.exports = DrumPad;
