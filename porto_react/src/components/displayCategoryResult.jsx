import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/allBooks.css';
import bookphoto from '../images/book.jpg'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'

class CategoryFilterResult extends React.Component {

    goToBook = async (book) => {
        store.setState({ book_id: book.id })
        this.props.history.push("/bookdetail/"+store.getState().book_id);
        }

    render() {
        const { listCategory } = this.props
        const displayAvailableBooks = listCategory.filter(item => {
            if (item.foto_buku !== null && item.judul !== null && item.penulis !== null && item.harga !== null && item.berat !== null) {
                return item;
            }
            return false
        });
        console.log('ISI List', this.props.listCategory)
        return (
            <div className='container' style={{paddingTop:'110px'}}>
                <div className='row'>
                    {displayAvailableBooks.map((book,i) =>
                        <div className='col-md-3'>
                            <div className='row box-all-books'>
                                <div className='col-md-12 box-all-books-photo'>
                                    <img style={{ width:'100%'}} src={book.foto_buku} alt=""/>
                                </div>
                                <div className='col-md-12 box-all-books-title' onClick={event => this.goToBook(book)}>{book.judul}</div>
                                <div className='col-md-12 box-all-books-writer'>{book.penulis}</div>
                                <div className='col-md-12 box-all-books-price'>Rp {book.harga}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

// export default CategoryFilterResult;
export default connect("listCategory, books, book_id, token, is_login, judul, penulis, status, harga, foto_buku",actions)(withRouter(CategoryFilterResult));