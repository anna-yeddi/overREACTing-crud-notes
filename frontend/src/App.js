import React, { Component } from 'react'
import './App.css'
import { nanoid } from 'nanoid'
import NoteItem from './components/NoteItem'
import NoteForm from './components/NoteForm'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      form: {},
      notes: [
        {
          id: '0070',
          content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quod deserunt nihil, praesentium animi magni!',
        },
      ],
    }

    // Bind event handlers
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  componentDidMount() {
    this.loadData()
    console.log('Data is:', this.state.notes)
  }

  handleInput = (name, value) => {
    // Update form state with new data
    this.setState({
      form: {
        [name]: value,
      },
    })
  }

  handleSubmit = (form) => {
    // Update state with a new note with new id
    // and flush form
    this.setState({
      notes: [
        ...this.state.notes,
        {
          id: nanoid(4),
          content: form.newNote,
        },
      ],
      form: {},
    })
  }

  handleRemove = (id) => {
    // Remove the note from state
    this.setState(() => this.state.notes.filter((o) => o.id !== id))
  }

  // Load data helper function for API
  loadData = () => {
    fetch(process.env.REACT_APP_NOTES_URL)
      .then((response) => response.text())
      // .then((response) => response.json())
      .then(
        (text) => console.log(text)
        // this.setState({ response })
      )
  }

  render() {
    const { form, notes } = this.state

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
          {notes.map((o) => (
            <li className="note" key={o.id}>
              <NoteItem noteId={o.id} onRemove={this.handleRemove}>
                {o.content}
              </NoteItem>
            </li>
          ))}
        </ul>
        <NoteForm
          form={form}
          onSubmit={this.handleSubmit}
          onInput={this.handleInput}
        />
      </div>
    )
  }
}
