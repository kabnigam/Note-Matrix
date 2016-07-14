const React = require('react');

const MusicBox = React.createClass({
  getInitialState: function() {
    return {sounds: []};
  },

  componentDidMount: function() {
    let that = this;
    $.ajax({
      url: '/sounds',
      success: function(response) {
        that.setState({sounds: response});
      },
      error: function(response) {
        console.log(response);
      }
    });
  },

  _drag: function(e) {
    $(e.target).draggable({
      helper: 'clone'
    });
    $('.pad').droppable({
      drop: this.props.drop.bind(this, e.target.getAttribute('data-url'))
    });
  },



  render: function() {
    let sounds = [];

    if (this.state.sounds.sound) {
      sounds = this.state.sounds.sound.map(sound => {
        return <li className='sound' data-url={sound.url} onMouseOver={this._drag}>{sound.name}</li>;
      });
    }

    return (
      <div className='music-box'>
        <ul>
          {sounds}
        </ul>
      </div>
    );
  }
});

module.exports = MusicBox;
