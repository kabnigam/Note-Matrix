const React = require('react');
const MusicBox = require('./music_box');


const Sounds = React.createClass({
  getInitialState: function() {
    return {sounds: {
      'p-one':'https://s3-us-west-1.amazonaws.com/soundsamples/808_sub.wav', 'p-two':'https://s3-us-west-1.amazonaws.com/soundsamples/Squad+Snare+5.wav'}};
  },
  _handleDrop: function(url, event, ui) {

    $(`#p-${event.target.getAttribute('data-pad')}`).children().attr('src', url);
    // this.setState({change: true});
  },

  render: function() {

    return (
      <div className='sounds'>
        <MusicBox drop={this._handleDrop}/>
        <div className='pad-sounds'>
          <audio id='p-one'>
            <source src='https://s3-us-west-1.amazonaws.com/soundsamples/808_sub.wav' />
          </audio>
          <audio id='p-two'>
            <source src='https://s3-us-west-1.amazonaws.com/soundsamples/Squad+Snare+5.wav' />
          </audio>
          <audio id='p-three'>
            <source src='https://s3-us-west-1.amazonaws.com/soundsamples/Squad+HiHat+3.wav' />
          </audio>
          <audio id='p-four'>
            <source src='https://s3-us-west-1.amazonaws.com/soundsamples/Squad+HiHat+4.wav' />
          </audio>
          <audio id='p-five'>
            <source src='https://s3-us-west-1.amazonaws.com/soundsamples/biggie2.wav' />
          </audio>
          <audio id='p-six'>
            <source src='' />
          </audio>
          <audio id='p-seven'>
            <source src='https://s3-us-west-1.amazonaws.com/soundsamples/biggie4.wav' />
          </audio>
          <audio id='p-eight'>
            <source src='https://s3-us-west-1.amazonaws.com/soundsamples/biggie5.wav' />
          </audio>
          <audio id='p-nine'>
            <source src='https://s3-us-west-1.amazonaws.com/soundsamples/biggie1.wav' />
          </audio>
        </div>
        <div className='sequencer-sounds'>
          <audio id='s-one'>
            <source src='https://s3-us-west-1.amazonaws.com/soundsamples/808_sub.wav' />
          </audio>
          <audio id='s-two'>
            <source src='https://s3-us-west-1.amazonaws.com/soundsamples/Squad+Kick+3.wav' />
          </audio>
          <audio id='s-three'>
            <source src='https://s3-us-west-1.amazonaws.com/soundsamples/Squad+Snare+5.wav' />
          </audio>
          <audio id='s-four'>
            <source src='https://s3-us-west-1.amazonaws.com/soundsamples/Squad+HiHat+3.wav' />
          </audio>
          <audio id='s-five'>
            <source src='https://s3-us-west-1.amazonaws.com/soundsamples/Squad+HiHat+4.wav' />
          </audio>
          <audio id='s-six'>
            <source src='https://s3-us-west-1.amazonaws.com/soundsamples/biggie3.wav' />
          </audio>
          <audio id='s-seven'>
            <source src='https://s3-us-west-1.amazonaws.com/soundsamples/biggie4.wav' />
          </audio>
          <audio id='s-eight'>
            <source src='https://s3-us-west-1.amazonaws.com/soundsamples/biggie5.wav' />
          </audio>
          <audio id='s-nine'>
            <source src='https://s3-us-west-1.amazonaws.com/soundsamples/biggie1.wav' />
          </audio>
        </div>
      </div>
    );
  }
});

module.exports = Sounds;
