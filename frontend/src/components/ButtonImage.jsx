import React from 'react'
import PropTypes from 'prop-types'

/**
 * Renders a <ButtonImage /> component
 * that creates a functional image button
 *
 * @global
 * @component
 * @see https://www.w3.org/WAI/tutorials/images/functional/
 */
function ButtonImage(props) {
  return (
    <button type={props.type} onClick={props.onClick} className={props.classes}>
      <i className="material-icons" role="presentation">
        {props.icon}
      </i>
      <span className="sr-only">{props.children}</span>
    </button>
  )
}

ButtonImage.propTypes = {
  /** @param {Object {string|func|node}} [props] Set of data for the button */
  props: PropTypes.shape({
    /** @param {node} children Label text to render off-screen for image button */
    children: PropTypes.node.isRequired,
    /** @param {string} [classes] Content for className attribute of the image button */
    classes: PropTypes.string.isRequired,
    /** @param {string} icon Keyword for Material Design icon to render image button */
    icon: PropTypes.string.isRequired,
    /** @param {string} [type] Type of the button as form element (if passed) */
    type: PropTypes.string,
    /** @param {func} onClick Function to lift the state up from the button  */
    onClick: PropTypes.func.isRequired,
  }),
}

export default ButtonImage
