const React = require('react');

const Sounds = React.createClass({
  render: function() {
    return (
      <div class='sounds'>
        <audio id='one'>
          <source src='https://s3-us-west-1.amazonaws.com/soundsamples/808_sub.wav' />
        </audio>
        <audio id='two'>
          <source src='https://s3-us-west-1.amazonaws.com/soundsamples/808_clap.wav' />
        </audio>
        <audio id='three'>
          <source src='https://s3-us-west-1.amazonaws.com/soundsamples/808_hihat.wav' />
        </audio>
        <audio id='four'>
          <source src='https://s3-us-west-1.amazonaws.com/soundsamples/biggie1.wav' />
        </audio>
        <audio id='five'>
          <source src='https://s3-us-west-1.amazonaws.com/soundsamples/biggie2.wav' />
        </audio>
        <audio id='six'>
          <source src='https://s3-us-west-1.amazonaws.com/soundsamples/biggie3.wav' />
        </audio>
        <audio id='seven'>
          <source src='https://s3-us-west-1.amazonaws.com/soundsamples/biggie4.wav' />
        </audio>
        <audio id='eight'>
          <source src='https://s3-us-west-1.amazonaws.com/soundsamples/biggie5.wav' />
        </audio>
        <audio id='nine'>
          <source src='' />
        </audio>
      </div>
    );
  }
});

module.exports = Sounds;
