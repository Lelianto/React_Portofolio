import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/bookDetail.css';
import bookphoto from '../images/book.jpg'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'


class BookDetail extends React.Component {

    componentDidMount = () => {

        const req = {
        method: "get",
        url: "http://0.0.0.0:1250/book/edit/11",
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
        },
        params: {
            
        }
        }; 
        console.log(req)
        axios(req)
            .then(function (response) {
                store.setState({ bookById: response.data, isLoading:false})
                return response
            })
            .catch(function (error){
                store.setState({ isLoading: false})
            })
    };

    render() {
        const { bookById } = this.props
        const judul = bookById.judul
        const penulis = bookById.penulis
        const jumlah_halaman = bookById.jumlah_halaman
        const tanggal_terbit = bookById.tanggal_terbit
        const isbn = bookById.isbn
        const genre = bookById.genre
        const bahasa = bookById.bahasa
        const penerbit = bookById.penerbit
        const berat = bookById.berat * 1
        const lebar = bookById.lebar * 1
        const panjang = bookById.panjang * 1
        const jenis_cover = bookById.jenis_cover
        const status = bookById.status
        const harga = bookById.harga * 1
        const stok = bookById.stok * 1
        const foto_buku = bookById.foto_buku
        const sinopsis = bookById.sinopsis
        return (
            <div>
                <div className='container' style={{marginTop:'30px'}}>
                    <div className='row'>
                        <div className='col-md-4 book-photo'>
                            <img style={{width:'100%'}} src={foto_buku}></img>
                        </div>
                        <div className='col-md-5'>
                            <div className='row'>
                                <div className='col-sm-12 book-title'>{judul}</div>
                                <div className='col-sm-12 book-status'>{status}</div>
                                <div className='col-sm-12 book-writer'>{penulis}</div>
                                <div className='col-sm-12'>
                                    <div className='row list-detail'>
                                        <div className='col-sm-5 book-detail-content'>Jumlah Halaman</div>
                                        <div className='col-sm-7 book-detail-content'>{jumlah_halaman}</div>
                                        <div className='col-sm-5 book-detail-content'>Tanggal Terbit</div>
                                        <div className='col-sm-7 book-detail-content'>{tanggal_terbit}</div>
                                        <div className='col-sm-5 book-detail-content'>ISBN</div>
                                        <div className='col-sm-7 book-detail-content'>{isbn}</div>
                                        <div className='col-sm-5 book-detail-content'>Genre</div>
                                        <div className='col-sm-7 book-detail-content'>{genre}</div>
                                        <div className='col-sm-5 book-detail-content'>Bahasa</div>
                                        <div className='col-sm-7 book-detail-content'>{bahasa}</div>
                                        <div className='col-sm-5 book-detail-content'>Penerbit</div>
                                        <div className='col-sm-7 book-detail-content'>{penerbit}</div>
                                        <div className='col-sm-5 book-detail-content'>Berat</div>
                                        <div className='col-sm-7 book-detail-content'>{berat} kg</div>
                                        <div className='col-sm-5 book-detail-content'>Lebar</div>
                                        <div className='col-sm-7 book-detail-content'>{lebar} cm</div>
                                        <div className='col-sm-5 book-detail-content'>Panjang</div>
                                        <div className='col-sm-7 book-detail-content'>{panjang} cm</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3' style={{ backgroundColor: 'aliceblue', borderRadius: '5%', marginBottom:'250px' }}>
                            <div className='row' style={{ paddingTop:'25px', paddingLeft: '10px', paddingRight: '10px'}} >
                                <div className='col-md-6'>{jenis_cover}</div>
                                <div className='col-md-6'>Rp {harga}</div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12' style={{ paddingTop:'55px'}}>
                                    <label>
                                        <button type="button" class="btn btn-success">Masukkan Ke Keranjang</button>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12 book-description'>Deskripsi</div>
                        <div className='col-md-12 book-description-content'>
                            {sinopsis}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// export default BookDetail;
export default connect("bookById, token, is_login, judul, penulis, jumlah_halaman,tanggal_terbit, isbn, genre, bahasa, penerbit, berat, lebar, panjang, jenis_cover, status, harga, stok, foto_buku, sinopsis",actions)(withRouter(BookDetail));