import React from 'react'
import './App.css'

function App() {
  const prevData = [
    {
      id: 0,
      content:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio consequatur commodi possimus, facilis ipsam quidem adipisci eaque vero, reprehenderit cum quibusdam distinctio dicta obcaecati provident. Assumenda voluptate voluptas quasi, ullam ad earum eligendi perspiciatis maiores?',
    },
  ]
  return (
    <div className="container">
      <header>
        <h1 className="header-with-btn">Notes</h1>
        <button
          className="refresh-btn"
          onClick={() => console.log('Refreshed!')}>
          <i className="material-icons" role="presentation">
            refresh
          </i>
          <span className="sr-only">Refresh the list</span>
        </button>
      </header>
      <ul className="notes-container">
        <li className="note">
          <p className="note-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
            consequatur.
          </p>
          <button
            className="note-remove-btn"
            onClick={() => console.log('Removed!')}>
            <i className="material-icons" role="presentation">
              clear
            </i>
            <span className="sr-only">Remove me</span>
          </button>
        </li>
        <li className="note">
          <p className="note-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, eum
            porro? Suscipit nemo ex nostrum!
          </p>
          <button
            className="note-remove-btn"
            onClick={() => console.log('Removed!')}>
            <i className="material-icons" role="presentation">
              clear
            </i>
            <span className="sr-only">Remove me</span>
          </button>
        </li>
      </ul>
      <form className="form">
        <div className="form-item form-item-container">
          <h2>
            <label htmlFor="input-crud">New Note</label>
          </h2>
          <textarea
            className="form-input form-textarea"
            id="input-crud"
            cols="50"
            rows="5"
            placeholder="What would you like to add to your notes?"></textarea>
          {/* </div>
        <div className="form-item form-item-submit"> */}
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
    </div>
  )
}

export default App
