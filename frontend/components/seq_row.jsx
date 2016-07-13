const React = require('react');
const NoteConstants = require('../constants/note_constants');

const SeqRow = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    return (
      <li onClick={this._handeClick} className='note-step'>

      </li>
    );
  }
});

module.exports = SeqRow;
