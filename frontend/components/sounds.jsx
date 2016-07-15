const React = require('react');
const MusicBox = require('./music_box');


const Sounds = React.createClass({
  getInitialState: function() {
    return {
      sounds: {},
      seqSounds: {
        's-one': "https://s3-us-west-1.amazonaws.com/soundsamples/808_sub.wav",
        's-two': "https://s3-us-west-1.amazonaws.com/soundsamples/Squad+Kick+3.wav",
        's-three':'https://s3-us-west-1.amazonaws.com/soundsamples/Squad+Snare+5.wav' ,
        's-four': 'https://s3-us-west-1.amazonaws.com/soundsamples/Squad+HiHat+3.wav',
        's-five': 'https://s3-us-west-1.amazonaws.com/soundsamples/biggie5.wav',
        's-six':'https://s3-us-west-1.amazonaws.com/soundsamples/biggie2.wav' }
    };
  },
  _handleDrop: function(e, ui) {

    // $(`#p-${event.target.getAttribute('data-pad')}`).children().attr('src', url);
    // this.setState({change: true});
    // let temp = this.state.sounds;
    // if (`p-${event.target.getAttribute('data-pad')}` === 'p-one') {
    //   alert('Sorry, but you cannot change the first pad. Try selecting a new kit or changing other pads!');
    // } else {

    //   if (Object.keys(temp).includes(`p-${event.target.getAttribute('data-pad')}`)) {
    //     delete temp[`p-${event.target.getAttribute('data-pad')}`];
    //     this.setState({sounds: temp});
    //
    //
    //   temp[`p-${event.target.getAttribute('data-pad')}`] = url;
    //   this.setState({sounds: temp});
    // }


    if (ui.draggable.context.dataset.kit && e.target.attributes[0].value === "current-kit ui-droppable") {
      $('p.inst').remove();
      this.setState({sounds: {}});
      let urls = ui.draggable.context.dataset.kit.split(',');
      let sounds = ui.draggable.context.dataset.sounds.split(',');
      let temp = {};
      for (var i = 0; i < urls.length; i++) {

        temp[`p${i}`] = [urls[i], sounds[i]];
      }
      this.setState({sounds: temp});

      $(e.target).html(ui.draggable.context.innerHTML);
    }
    else if (ui.draggable.context.dataset.url && e.target.attributes[0].value === "instrument-name ui-droppable") {
      let temp = this.state.seqSounds;
      this.setState({seqSounds: {}});
      temp[e.target.attributes[1].value] = ui.draggable.context.dataset.url;
      $(e.target).html(ui.draggable.context.innerHTML);
      this.setState({seqSounds: temp});
    }
  },

  render: function() {
    let that = this;
    let pads = Object.keys(this.state.sounds).map(id => {
      $(`.pad.${id}`).append(`<p class='inst'>${this.state.sounds[id][1]}</p>`);
      return (
        <audio id={id}>
          <source src={this.state.sounds[id][0]} />
        </audio>
      );
    });
    let seqs = Object.keys(this.state.seqSounds).map(id => {

      return (
        <audio id={id}>
          <source src={this.state.seqSounds[id]} />
        </audio>
      );
    });

    return (
      <div className='sounds'>
        <MusicBox drop={this._handleDrop}/>
        <div className='pad-sounds'>
          {pads}
        </div>
        <div className='sequencer-sounds'>
          {seqs}
        </div>
      </div>
    );
  }
});

module.exports = Sounds;
