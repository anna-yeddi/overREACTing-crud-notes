import React from 'react'
import PropTypes from 'prop-types'

function NoteItem(props) {
  const { noteId } = props.noteId

  const handleRemove = () => {
    props.onRemove(noteId)
  }

  return (
    <>
      <p className="note-content">{props.children}</p>
      <button className="note-remove-btn" onClick={() => handleRemove}>
        <i className="material-icons" role="presentation">
          clear
        </i>
        <span className="sr-only">Remove note {noteId}</span>
      </button>
    </>
  )
}

NoteItem.propTypes = {}

export default NoteItem
