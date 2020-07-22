import React from 'react'
import PropTypes from 'prop-types'
import ButtonImage from './ButtonImage'

/**
 * Renders a <NoteForm /> component
 * that is a form to take user input and
 * submit new note content
 *
 * @global
 * @component
 */
function NoteForm(props) {
  const { note } = props

  const handleChange = (e) => {
    const { name, value } = e.target
    props.onChange(name, value)
  }

  // Lift form state up to update clocks
  const handleSubmit = (e) => {
    // Prevent default submit event
    e.preventDefault()
    props.onSubmit(note)
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-item form-item-container">
        <h2>
          <label htmlFor="input-crud">New Note</label>
        </h2>
        <textarea
          className="form-input form-textarea"
          id="input-crud"
          name="newNote"
          cols="50"
          rows="5"
          placeholder="What would you like to add to your notes?"
          value={note}
          onChange={handleChange}></textarea>
        <ButtonImage type="submit" icon="add" classes="form-submit-btn">
          Add note
        </ButtonImage>
      </div>
    </form>
  )
}

NoteForm.propTypes = {
  /** @param {Object {string|func}} [props] Set of data for the form */
  props: PropTypes.shape({
    /** @param {string} [note] Content of the note (if passed) */
    note: PropTypes.string,
    /** @param {func} handleChange Function to lift the state up from props
     * on user input */
    handleChange: PropTypes.func.isRequired,
    /** @param {func} handleSubmit Function to lift the state up from props
     * and update list of notes  */
    handleSubmit: PropTypes.func.isRequired,
  }),
}

export default NoteForm
