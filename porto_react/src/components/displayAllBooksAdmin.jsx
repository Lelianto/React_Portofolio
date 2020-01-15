import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/allBooks.css';
import bookphoto from '../images/book.jpg'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'


class AdminAllBooks extends React.Component {

    goToBook = async (book) => {
        console.warn('cek isi buku', book.id)
        // localStorage.setItem("book_id", book.id);
        store.setState({ book_id: book.id })
        // console.warn('cek isi buku', store.getState().book_id)
        this.props.history.push("/bookdetail/"+store.getState().book_id);
        // window.open("/bookdetail/"+localStorage.getItem('book_id'))
        }

    componentDidMount = () => {

        const req = {
        method: "get",
        url: "http://0.0.0.0:1250/book",
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
        },
        params: {
            
        }
        }; 
        console.log(req)
        axios(req)
            .then(function (response) {
                store.setState({ books: response.data, isLoading:false})
                console.log(response.data)
                return response
            })
            .catch((error)=>{
                store.setState({ isLoading: false})
                switch (error.response.status) {
                    case 401 :
                        this.props.history.push('/401')
                        break
                    case 403 :
                        this.props.history.push('/403')
                        break
                    case 404 :
                        this.props.history.push('/404')
                        break
                    case 422 :
                        this.props.history.push('/422')
                        break
                    case 500 :
                        this.props.history.push('/500')
                        break
                    default :
                        break
                }
            })
    };

    render() {
        const { books } = this.props
        const displayAvailableBooks = books.filter(item => {
            if (item.foto_buku !== null && item.judul !== null && item.penulis !== null && item.harga !== null && item.berat !== null) {
                return item;
            }
            return false
        });
        if(localStorage.getItem('email')=='lian@alterra.id'){
            return (
                <div className='container' style={{paddingTop:'90px'}}>
                    <div className='row'>
                        {displayAvailableBooks.map((book,i) =>
                            <div className='col-md-3'>
                                <div className='row box-all-books'>
                                    <div className='col-md-12 box-all-books-photo'>
                                        {book.id}
                                    </div>
                                    <div className='col-md-12 box-all-books-photo'>
                                        {book.email_user}
                                    </div>
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
        return (
            <div className='container' style={{marginTop:'40px'}}>
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

// export default AdminAllBooks;
export default connect("books, book_id, token, is_login, judul, penulis, status, harga, foto_buku",actions)(withRouter(AdminAllBooks));