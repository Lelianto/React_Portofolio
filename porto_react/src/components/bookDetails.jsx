import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/bookDetail.css';
import '../styles/loading.css'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'

class BookDetail extends React.Component {
    // Fungsi untuk menambahkan produk ke keranjang
    doAddCart = async () => {
        await this.props.addCartItem()
        if (localStorage.getItem('token') !== null){
            alert('Buku telah ditambahkan ke dalam Keranjang')
            this.props.history.push("/");
        }
    }

    // Fungsi untuk menghapus buku oleh User (Buku milik sendiri)
    doDelete = async () => {
        await this.props.deleteItem()
        if (localStorage.getItem('token') !== null){
            this.props.history.push("/");
        }
    }
    
    // Fungsi untuk mengambil data buku sesuai ID
    componentDidMount = () => {
        const req = {
        method: "get",
        url: "http://0.0.0.0:1250/book/edit/" + this.props.match.params.id ,
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
        }
        }; 
        axios(req)
            .then(function (response) {
                store.setState({ bookById: response.data, isLoading:false})
                return response
            })
            .catch(function(error){
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
        if (localStorage.getItem('email')==bookById.email_user) {
            return (
                <div>
                    <div className='container' style={{paddingTop: '150px'}}>
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
                                            <div className='col-sm-5 book-detail-content'>Stok</div>
                                            <div className='col-sm-7 book-detail-content'>{stok} exemplar</div>
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
                                        <label><Link to='/updateproduct'>
                                            <button type="button" class="btn btn-success">Update</button></Link>
                                        </label>
                                    </div>
                                    <div className='col-md-12' style={{ paddingTop:'55px'}}>
                                        <label>
                                            <button type="button" class="btn btn-success" onClick={this.doDelete}>Delete</button>
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
        else if (localStorage.getItem('email')==='lian@alterra.id'){
            return (
                <div>
                    <div className='container' style={{paddingTop: '150px'}}>
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
                                            <div className='col-sm-5 book-detail-content'>Stok</div>
                                            <div className='col-sm-7 book-detail-content'>{stok} exemplar</div>
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
                                        <label><Link to='/updateproduct'>
                                            <button type="button" class="btn btn-success">Update</button></Link>
                                        </label>
                                    </div>
                                    <div className='col-md-12' style={{ paddingTop:'55px'}}>
                                        <label>
                                            <button type="button" class="btn btn-success" onClick={this.doDelete}>Delete</button>
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
        } else {
            return (
                <div>
                    <div className='container' style={{paddingTop: '150px'}}>
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
                                            <div className='col-sm-5 book-detail-content'>Stok</div>
                                            <div className='col-sm-7 book-detail-content'>{stok} exemplar</div>
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
                                            <button type="button" class="btn btn-success" onClick={this.doAddCart}>Masukkan Ke Keranjang</button>
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
}

export default connect("bookById, book_id, isLoading",actions)(withRouter(BookDetail));