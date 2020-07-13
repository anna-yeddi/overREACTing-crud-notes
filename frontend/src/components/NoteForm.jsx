import React from 'react'
import PropTypes from 'prop-types'

function NoteForm(props) {
  const { form } = props

  const handleInput = (name, value) => {
    props.onInput(name, value)
  }

  // Lift form state up to update clocks
  const handleSubmit = (e) => {
    // Prevent default submit event
    e.preventDefault()
    props.onSubmit(form)
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
          onInput={handleInput}></textarea>
        <button
          type="submit"
          className="form-submit-btn"
          onClick={() => console.log('Added!')}>
          <i className="material-icons" role="presentation">
            add
          </i>
          <span className="sr-only">Add note</span>
        </button>
      </div>
    </form>
  )
}

NoteForm.propTypes = {
  // /** @param {Object} form State of form fields */
  // form: PropTypes.shape({
  //   /** @param {string} city Name of the city for the clock */
  //   city: PropTypes.string.isRequired,
  //   /** @param {number} gmt Offset / Time zone for the clock */
  //   gmt: PropTypes.number.isRequired,
  // }).isRequired,
  // /** @param {*} [name] Name of the input control */
  // name: PropTypes.any,
  // /** @param {func} onInput Function to lift the state up from props */
  // onInput: PropTypes.func.isRequired,
  // /** @param {func} onSubmit Function to lift the state up from props
  //  * and update clocks  */
  // onSubmit: PropTypes.func.isRequired,
}

export default NoteForm
