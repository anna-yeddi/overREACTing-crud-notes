import React, { Component } from 'react'
import './App.css'
import NoteList from './components/NoteList'
import NoteForm from './components/NoteForm'
import ButtonImage from './components/ButtonImage'

/**
 * Renders a note taking application
 * that fetches data from a custom Koa backend
 *
 * @global
 * @app
 */
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
    this.refreshData = this.refreshData.bind(this)
    this.loadData = this.loadData.bind(this)
    this.postData = this.postData.bind(this)
    this.deleteData = this.deleteData.bind(this)
  }

  componentDidMount() {
    this.loadData()
  }

  // Type a note
  handleChange = (name, value) => {
    // Update form state with new data
    this.setState({
      form: {
        [name]: value,
      },
    })
  }

  // Add a note
  handleSubmit = () => {
    this.postData()
  }

  // Remove a note
  handleRemove = (id) => {
    this.deleteData(id)
  }

  //
  refreshData = () => {
    this.setState({
      isLoaded: false,
    })
    this.loadData()
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

    return (
      <div className="container">
        <header>
          <h1 className="header-with-btn">Notes</h1>
          <ButtonImage
            icon="refresh"
            classes="refresh-btn"
            onClick={this.refreshData}>
            Refresh the list
          </ButtonImage>
        </header>
        <NoteList
          notes={notes}
          onRemove={this.handleRemove}
          error={error}
          isLoaded={isLoaded}
        />
        <NoteForm
          note={form.newNote}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}
