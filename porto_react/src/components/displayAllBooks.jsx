import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/allBooks.css';
import bookphoto from '../images/book.jpg'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'


class AllBooks extends React.Component {

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
            .catch(function (error){
                store.setState({ isLoading: false})
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
        return (
            <div className='container' style={{marginTop:'40px'}}>
                <div className='row'>
                    {displayAvailableBooks.map((book,i) =>
                        <div className='col-md-3'>
                            <div className='row box-all-books'>
                                <div className='col-md-12 box-all-books-photo'>
                                    <img style={{ width:'100%'}} src={book.foto_buku} alt=""/>
                                </div>
                                <div className='col-md-12 box-all-books-title'>{book.judul}</div>
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

// export default AllBooks;
export default connect("books, token, is_login, judul, penulis, jumlah_halaman,tanggal_terbit, isbn, genre, bahasa, penerbit, berat, lebar, panjang, jenis_cover, status, harga, stok, foto_buku, sinopsis",actions)(withRouter(AllBooks));