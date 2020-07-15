import React, { Component } from 'react'
import './App.css'
import NoteItem from './components/NoteItem'
import NoteForm from './components/NoteForm'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      form: {},
      notes: [],
      // API helpers
      error: null,
      isLoaded: false,
    }

    // Bind event handlers
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.loadData = this.loadData.bind(this)
    this.postData = this.postData.bind(this)
    this.deleteData = this.deleteData.bind(this)
  }

  componentDidMount() {
    this.loadData()
  }

  componentDidUpdate() {
    // this.loadData()
  }

  handleInput = (name, value) => {
    // Update form state with new data
    this.setState({
      form: {
        [name]: value,
      },
    })
  }

  handleSubmit = () => {
    // Update state with a new note with new id
    // and flush form
    this.postData()
    this.setState({
      form: {
        newNote: '',
      },
    })
    // this.setState({
    //   notes: [
    //     ...this.state.notes,
    //     {
    //       id: nanoid(4),
    //       content: form.newNote,
    //     },
    //   ],
    //   form: {},
    // })
  }

  handleRemove = (id) => {
    console.log('To del', id)
    this.deleteData(id)
    // this.loadData()
    // Remove the note from state
    // this.setState(() => this.state.notes.filter((o) => o.id !== id))
  }

  // GET data from API
  loadData = () => {
    fetch(process.env.REACT_APP_NOTES_URL)
      .then((response) => response.json())
      .then(
        (result) => {
          this.setState({
            notes: result,
            isLoaded: true,
          })
        },
        // Catch error to avoid it being printed out in the app
        // and not to allow exceptions from actual bugs
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          })
        }
      )
      .then(console.log(this.state))
  }

  // POST data from API
  postData = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: this.state.form.newNote }),
    }
    fetch(process.env.REACT_APP_NOTES_URL, requestOptions)
      .then((response) => response.text())
      .then((text) => console.log(text))
    // .then((response) => response.json())
    // .then(this.loadData())
    // .then((result) =>
    //   this.setState({ notes: result, form: {}, isLoaded: true })
    // )
    // .then((result) => console.log(this.state, result))
  }

  // DELETE data from API
  deleteData = (id) => {
    const requestOptions = {
      method: 'DELETE',
    }
    fetch(`${process.env.REACT_APP_NOTES_URL}/${id}`, requestOptions)
      // .then((response) => response.text())
      // .then((text) => console.log(text))
      // .then((response) => response.json())
      // .then((result) =>
      //   this.setState({ notes: result, form: {}, isLoaded: true })
      // )
      .then((result) => console.log('Deleted', this.state, result))
  }

  render() {
    const { form, notes, error, isLoaded } = this.state

    if (error) {
      return <h2 style={{ color: 'red' }}>Error: {error.message}</h2>
    } else if (!isLoaded) {
      return <h2>Loading...</h2>
    } else {
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
                <NoteItem id={o.id} onRemove={this.handleRemove}>
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
}
