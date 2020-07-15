import React from 'react'
import PropTypes from 'prop-types'

function NoteItem(props) {
  const { id } = props

  const handleRemove = (e) => {
    props.onRemove(id)
  }

  return (
    <>
      <p className="note-content">{props.children}</p>
      <button className="note-remove-btn" onClick={handleRemove}>
        <i className="material-icons" role="presentation">
          clear
        </i>
        <span className="sr-only">Remove note {id}</span>
      </button>
    </>
  )
}

NoteItem.propTypes = {}

export default NoteItem
