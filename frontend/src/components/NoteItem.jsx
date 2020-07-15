import React from 'react'
import PropTypes from 'prop-types'
import BtnImg from './BtnImg'

/**
 * Renders a <NoteItem /> component
 * that is contains within a <NoteItem /> components
 *
 * @global
 * @component
 * @memberof <NoteList />
 *
 */
function NoteItem(props) {
  const { id } = props

  const handleRemove = (e) => {
    props.onRemove(id)
  }

  return (
    <>
      <p className="note-content">{props.children}</p>
      <BtnImg classes="note-remove-btn" onClick={handleRemove} icon="clear">
        Remove note {id}
      </BtnImg>
    </>
  )
}

NoteItem.propTypes = {
  /** @param {Object {string|func|node}} [props] Set of data for the item */
  props: PropTypes.shape({
    /** @param {node} children Content of the note */
    children: PropTypes.node.isRequired,
    /** @param {string} id Identificator of the note */
    id: PropTypes.string,
    /** @param {func} handleRemove Function to lift the state up from props
     * and remove a note */
    handleRemove: PropTypes.func.isRequired,
  }),
}

export default NoteItem
