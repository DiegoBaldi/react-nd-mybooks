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
    if (query.length > 1) {
      BooksAPI.search(query, 100).then((books) => {
        if (Array.isArray(books)) {
          this.setState({
            searchedBooks: this.filterArray(this.removeDuplicates(books), this.state.books)
          })
        } else {
          this.clearSearchedBooks()
        }
      })
    } else {
      this.clearSearchedBooks();
    }

  }

  //Remove duplicates from backend response
  removeDuplicates = (array) => {
    return array.filter((book, index, self) => self.findIndex(b => b.id === book.id ) === index)
  }

  //In order to homogenize the two arrays
  filterArray = (array, filters) => {
    for (var arr in array) {
      var found = false
      for (var filter in filters) {
        if (array[arr].id === filters[filter].id) {
          array[arr].shelf = filters[filter].shelf
          found = true
        } 
      }
      if(!found){
        array[arr].shelf = "none"
      }
    }
    return array
  }

  moveBook = (book, where) => {
    this.setState((state) => ({
      books: state.books.map((b) => {
        if (b.id === book.id) {
          b.shelf = where
        }
        return b
      }),
      searchedBooks: state.searchedBooks.map((b) => {
        if (b.id === book.id) {
          b.shelf = where
        }
        return b
      })
    }))
  }


  render() {
    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
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
                {this.state.searchedBooks.map((book) =>
                  <li key={book.id}>
                    <Book book={book} onBookMoved={ (book, where) => {
                      this.moveBook(book, where)                      
                      BooksAPI.update(book, where).then((result) => {
                        BooksAPI.getAll().then((books) => {
                          this.setState({
                            books: books
                          })
                          history.push('/')                          
                        })
                      })
                    }} />
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
