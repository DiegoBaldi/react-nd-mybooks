import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class Bookshelf extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onBookMoved: PropTypes.func.isRequired
    }

    state = {
        query: '',        
    }

    updateQuery = (query) => {
        this.setState({
            query: query
        })
    }

    clearQuery = () => {
        this.setState({
            query: ''
        })
    }

    render() {

        //We use few times this.state, this.props (on every UI update)... we get along an entire object instead of single variable (less size) so we can deconstruct these object
        const { books, onBookMoved } = this.props;
        const { query } = this.state;

        let showingBooks
        if (query) {
            const match = new RegExp(escapeRegExp(this.state.query.trim()), 'i');
            showingBooks = books.filter((book) => match.test(book.title) || match.test(book.authors.join(', ')))
        } else {
            showingBooks = books;
        }
        showingBooks.sort(sortBy('title'))
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="search-books">
                    <div className="filter-books-bar">
                        <div className="filter-books-input-wrapper">
                            <input type="text" value={query} onChange={(event) => this.updateQuery(event.target.value)} placeholder="Filter by title or author" />
                        </div>
                    </div>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {showingBooks.filter((book) => book.shelf === 'currentlyReading').map((b) =>
                                        <li key={b.id}>
                                            <Book book={b} onBookMoved={ onBookMoved } />
                                        </li>
                                    )} 
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {showingBooks.filter((book) => book.shelf === 'wantToRead').map((b) =>
                                        <li key={b.id}>
                                            <Book book={b} onBookMoved={ onBookMoved } />
                                        </li>
                                    )} 
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {showingBooks.filter((book) => book.shelf === 'read').map((b) =>
                                        <li key={b.id}>
                                            <Book book={b} onBookMoved={ onBookMoved }  />
                                        </li>
                                    )} 
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>

        )
    }
}

export default Bookshelf