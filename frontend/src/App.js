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
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.loadData = this.loadData.bind(this)
    this.postData = this.postData.bind(this)
    this.deleteData = this.deleteData.bind(this)
  }

  componentDidMount() {
    this.loadData()
  }

  handleChange = (name, value) => {
    // Update form state with new data
    this.setState({
      form: {
        [name]: value,
      },
    })
  }

  handleSubmit = () => {
    this.postData()
  }

  handleRemove = (id) => {
    this.deleteData(id)
  }

  // GET data from API
  loadData = () => {
    fetch(process.env.REACT_APP_NOTES_URL)
      .then((response) => response.json())
      .then(
        (result) => {
          this.setState({
            form: {},
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
  }

  // POST data from API
  postData = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: this.state.form.newNote }),
    }
    fetch(process.env.REACT_APP_NOTES_URL, requestOptions)
      .then(
        this.setState({
          form: {
            newNote: '',
          },
        })
      )
      .then(() => this.loadData())
  }

  // DELETE data from API
  deleteData = (id) => {
    const requestOptions = {
      method: 'DELETE',
    }
    fetch(`${process.env.REACT_APP_NOTES_URL}/${id}`, requestOptions).then(() =>
      this.loadData()
    )
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
            <button className="refresh-btn" onClick={this.loadData}>
              <i className="material-icons" role="presentation">
                refresh
              </i>
              <span className="sr-only">Refresh the list</span>
            </button>
          </header>
          {notes.length > 0 ? (
            <ul className="notes-container">
              {notes.map((o) => (
                <li className="note" key={o.id}>
                  <NoteItem id={o.id} onRemove={this.handleRemove}>
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
          <NoteForm
            form={form}
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
          />
        </div>
      )
    }
  }
}
