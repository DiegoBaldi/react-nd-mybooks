import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class BookDetails extends Component {

    state = {
        book: {}
    }

    componentDidMount() {
        console.log(this.props)
        BooksAPI.get(this.props.match.params.bookId).then((book) => {
            this.setState({
                book: book
            })
        })
    }

    render() {
        const { book } = this.state;
        var content = <p> </p>;
        if (book.id) {
            content =
            <div>
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>{book.title}</h1>
                    </div>
                </div>
                <div id="container" className="book-cover">
                    <img id="left" src={ book.imageLinks.thumbnail} className="book-cover" />
                    <div id="right">
                        <p><strong>Author : </strong>{ book.authors.join(", ")}</p>
                        {(book.publishedDate) ? <p><strong>Published : </strong>{ book.publishedDate}</p> : ''}
                        {(book.publisher) ? <p><strong>Publisher : </strong>{ book.publisher}</p> : ''}
                        {(book.description) ? <p><strong>Description : </strong>{ book.description}</p> : ''}
                    </div>
                    <div className="clear"></div>
                </div>
            </div>
        }
        return (content)
    }
}

// Book.propTypes = {
//     contacts : PropTypes.array.isRequired,
//     onDeleteContact : PropTypes.func.isRequired
// }

export default BookDetails