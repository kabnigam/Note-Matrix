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

    if (e.target.attributes[1].name === 'data-kit') {

      $(e.target).draggable({
        helper: 'clone',
        start: function(ev, ui)
         {
           $('.instrument-element').remove();
          $(ui.helper).removeClass("sound-kit");
          $(ui.helper).addClass("ui-draggable-helper");
         }
      });
      $('.current-kit').droppable({
        drop: this.props.drop
      });
    } else if (e.target.attributes[1].name === 'data-url') {
      $(e.target).draggable({
        helper: 'clone',
        start: function(ev, ui)
         {
          $(ui.helper).removeClass("sound-kit");
          $(ui.helper).addClass("ui-draggable-helper");
         }
      });
      $('.instrument-name').droppable({
        drop: this.props.drop
      });
    }

  },

  _createKits: function() {
    let instruments = {'Drums': {'808':[]}, 'Vocals': {'Biggie 140 BPM':[]}, 'Instrument': {'Kalimba Major':[], 'Marimba Minor':[]}};
    for (var i = 0; i < this.state.sounds.sound.length; i++) {

      instruments[this.state.sounds.sound[i].instrument][this.state.sounds.sound[i].kit].push(this.state.sounds.sound[i]);
    }
    return instruments;
  },

  _showMenu: function(instruments, e) {
    if (e.target.children.length > 0) {
      $('.instrument-element').remove();
    } else {

      let els = $();
      instruments.forEach(inst => {
        els = els.add(`<div class='instrument-element' data-url=${inst.url}>${inst.name}</div>`);
      });
      $(e.target).append(els);
      $($('.instrument-element')).addEventListener('mouseover', () => {
        this._drag;
      });
    }
  },



  render: function() {
    let vocals = [];
    let drums = [];
    let music = [];

    if (this.state.sounds.sound) {
      let instruments = this._createKits();

      for (var i = 0; i < Object.keys(instruments).length; i++) {
        let type = Object.keys(instruments)[i];
        if (type==='Vocals') {
          for (var j = 0; j < Object.keys(instruments[type]).length; j++) {
            let kit = Object.keys(instruments[type])[j];
            let urls = instruments[type][kit].map(obj => {return obj.url;});
            let sounds = instruments[type][kit].map(obj => {return obj.name;});
            sounds = sounds.join(',');
            urls = urls.join(',');
            vocals.push(<li className='sound-kit' data-kit={urls} data-sounds={sounds} onMouseOver={this._drag} onClick={this._showMenu.bind(this, instruments[type][kit])}>{kit}</li>);
          }
        } else if (type==='Drums') {
          for (var j = 0; j < Object.keys(instruments[type]).length; j++) {
            let kit = Object.keys(instruments[type])[j];
            let urls = instruments[type][kit].map(obj => {return obj.url;});
            let sounds = instruments[type][kit].map(obj => {return obj.name;});
            urls = urls.join(',');
            sounds = sounds.join(',');
            drums.push(<li className='sound-kit' data-kit={urls} data-sounds={sounds} onMouseOver={this._drag} onClick={this._showMenu.bind(this, instruments[type][kit])}>{kit}</li>);
          }
        } else if (type==='Instrument') {
          for (var j = 0; j < Object.keys(instruments[type]).length; j++) {
            let kit = Object.keys(instruments[type])[j];
            let urls = instruments[type][kit].map(obj => {return obj.url;});
            let sounds = instruments[type][kit].map(obj => {return obj.name;});
            urls = urls.join(',');
            sounds = sounds.join(',');
            music.push(<li className='sound-kit' data-kit={urls} data-sounds={sounds} onMouseOver={this._drag} onClick={this._showMenu.bind(this, instruments[type][kit])}>{kit}</li>);
          }
        }
      }
    }

    return (
      <div className='music-box'>
        <h2>Kits</h2>
        <ul className='kit-holder'>
          <li className='kit-type'>Drums</li>
          {drums}
        </ul>
        <ul className='kit-holder'>
          <li className='kit-type'>Vocals</li>
          {vocals}
        </ul>
        <ul className='kit-holder'>
          <li className='kit-type'>Instruments</li>
          {music}
        </ul>


      </div>
    );
  }
});

module.exports = MusicBox;
