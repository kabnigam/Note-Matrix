const React = require('react');

const Instructions = React.createClass({
  render: function() {
    return (
      <div className= 'instructions'>
        <p>To play the drum pad, start by dragging a kit to the "Drag kit here" section.</p>
        <p>Click on a kit to see its different sounds. Click and drag a sound onto a pad or to the text area left of the sequencer below to change the sound of that row.</p>
        <p>Change the note length of a row by clicking the up/down arrows to the left of the sequencer row you are trying to change.</p>
        <p>Change the BPM by clicking the number to the right of the BPM label and entering a new number.</p>
        <p>Click a sound in the sequencer to add or remove a note in the sequence.</p>
        <p>Hold the shift key and drag the mouse over notes to quickly select them.</p>
      </div>
    );
  }
});

module.exports = Instructions;
