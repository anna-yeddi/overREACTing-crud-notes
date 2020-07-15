import React from 'react'
import NoteItem from './NoteItem'
import PropTypes from 'prop-types'

/**
 * Renders a <NoteList /> component
 * that contains one or more <NoteItem /> components
 *
 * @global
 * @component
 */
function NoteList(props) {
  const { notes, error, isLoaded } = props

  const handleRemove = (id) => {
    props.onRemove(id)
  }

  if (error) {
    return <h2 style={{ color: 'red' }}>Error: {error.message}</h2>
  } else if (!isLoaded) {
    return <h2>Loading...</h2>
  } else {
    return (
      <>
        {notes.length > 0 ? (
          <ul className="notes-container">
            {notes.map((o) => (
              <li className="note" key={o.id}>
                <NoteItem id={o.id} onRemove={handleRemove}>
                  {o.content}
                </NoteItem>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <h2>No notes are added yet...</h2>
            <p>Try to add one!</p>
          </div>
        )}
      </>
    )
  }
}

NoteList.propTypes = {
  /** @param {Object {string|func|boolean}} props Set of data for the form */
  props: PropTypes.shape({
    /** @param {boolean} [error] Error message returned from the server */
    error: PropTypes.bool.isRequired,
    /** @param {boolean} [isLoaded] Busy state of the component
     *  during HTTP request */
    isLoaded: PropTypes.bool.isRequired,
    /** @param {func} handleChange Function to lift the state up from props
     * on user input */
    handleChange: PropTypes.func.isRequired,
    /** @param {func} handleSubmit Function to lift the state up from props
     * and update list of notes  */
    handleSubmit: PropTypes.func.isRequired,
    /** @param {string} note Content of the note */
    note: PropTypes.string.isRequired,
  }),
}

export default NoteList
