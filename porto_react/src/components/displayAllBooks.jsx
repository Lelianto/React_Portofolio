import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/allBooks.css';
import '../styles/loading.css'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'


class AllBooks extends React.Component {

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
        }
        }; 
        axios(req)
            .then(function (response) {
                store.setState({ books: response.data, isLoading:false})
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
                    case 500 :
                        this.props.history.push('/500')
                        break
                    default :
                        break
                }
            })
    };

    render() {
        const { books, isLoading } = this.props
        const displayAvailableBooks = books.filter(item => {
            if (item.foto_buku !== null && item.judul !== null && item.penulis !== null && item.harga !== null && item.berat !== null) {
                return item;
            }
            return false
        });
        if(this.props.isLoading){
            return (
            <div>
              <body style={{paddingTop:'200px'}}>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-5'>
                  </div>
                  <div className='col-md-2'>
                    <div class="loader"></div>
                  </div>
                  <div className='col-md-5'>
                  </div>
                </div>
               
              </div>
            </body>
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

export default connect("books, book_id, token, is_login, judul, penulis, status, harga, foto_buku,isLoading",actions)(withRouter(AllBooks));