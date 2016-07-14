const React = require ('react');
const ReactDOM = require ('react-dom');
const DrumPad = require('./components/drum_pad.jsx');
const Sequencer = require('./components/sequencer.jsx');
const Sounds = require('./components/sounds.jsx');


const App = React.createClass({
  render: function() {
    return (
      <div>

        <Sounds />
        <DrumPad />
        <Sequencer />
      </div>
    );
  }
});

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<App />, document.getElementById('content'));
});
