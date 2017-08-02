import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf';
import BookDetails from './BookDetails';
import Book from './Book';
import { Debounce } from 'react-throttle';
import './App.css'

class BooksApp extends React.Component {

  state = {
    searchedBooks: [],
    books: [],
    query: ''
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books
      })
    })
  }

  clearSearchedBooks = () => {
    this.setState({
      searchedBooks: []
    })
  }

  searchBooks = (query, maxResults) => {
    BooksAPI.search(query, 100).then((books) => {
      if (Array.isArray(books)) {
        this.setState({
          searchedBooks: books
        })
      } else {
        this.clearSearchedBooks()
      }
    })
  }

  moveBook = (book, where) => {
    this.setState((state) => ({
    books: state.books.map((b) => {
      if(b.id === book.id){
        b.shelf = where
      }
      return b
    })
    }))
    BooksAPI.update(book, where)
  }

  addBook = (book, where) => {
    this.setState((state) => ({
    searchedBooks: state.searchedBooks.map((b) => {
      if(b.id === book.id){
        b.shelf = where
      }
      return b
    }),
    books: state.books.concat(state.searchedBooks.filter((b) => b.id === book.id))
    }))
    BooksAPI.update(book, where)
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <Debounce time="400" handler="onChange">
                  <input type="text" placeholder="Search by title or author" onChange={(event) => this.searchBooks(event.target.value, 100)} />
                </Debounce>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.searchedBooks.filter((b) => b.shelf === 'none').map((book) =>
                  <li key={book.id}>
                    <Book book={book} onBookMoved={this.addBook} />
                  </li>
                )}
              </ol>
            </div>
          </div>
        )} />
        <Route exact path='/' render={() => (
          <Bookshelf books={this.state.books} onBookMoved={this.moveBook} />
        )} />
        <Route path='/books/:bookId' component={BookDetails} />
      </div>
    )
  }
}

export default BooksApp
