import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/allBooks.css';
import { withRouter} from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'


class AccessAllBook extends React.Component {
    // Fungsi untuk mengambil semua list buku dari database
    getListBook =()=>{
        const req = {
            method: "get",
            url: store.getState().baseUrl+"/book"
            }; 
            const self = this
            axios(req)
                .then(function (response) {
                    store.setState({ adminAllBook: response.data, isLoading:false})
                    return response
                })
                .catch((error)=>{
                    store.setState({ isLoading: false})
                    switch (error.response.status) {
                        case 401 :
                            self.props.history.push('/401')
                            break
                        case 403 :
                            self.props.history.push('/403')
                            break
                        case 404 :
                            self.props.history.push('/404')
                            break
                        case 422 :
                            self.props.history.push('/422')
                            break
                        case 500 :
                            self.props.history.push('/500')
                            break
                        default :
                            break
                    }
                })
    }
    
    // Fungsi untuk menghapus buku dari database sesuai ID
    doDelete = async (e) => {
        store.setState({
            'bookId': e
        })
        await this.props.deleteItem()
        if (localStorage.getItem('token') !== null){
            this.getListBook()
            this.props.history.push("/books");
        }
    }
    
    // Untuk menjalankan Fungsi getListBook
    componentDidMount = () => {
        this.getListBook()
    };

    doSearchBook = async () => {
        this.props.history.push("/books/search");
    }

    render() {
        const { adminAllBook } = this.props
        return (
            <div className='container-fluid' style={{paddingTop:'50px'}}>
                <div className='row'>
                    <div className="col-md-6 search">
                        <form onSubmit={e => e.preventDefault()}>
                        <div className='row'>
                            <div className='col-md-9'>
                                <div className="active-cyan-4 mb-4">
                                    <input class="form-control mr-sm-2" 
                                    style={{ width:"90%"}} 
                                    type="search" 
                                    placeholder="Cari Judul, Penulis, Genre, Status Jual" 
                                    aria-label="Search"
                                    id="adminProductKeyword"
                                    name="adminProductKeyword"
                                    onChange={(e) => this.props.changeInput(e)}/>
                                </div>
                            </div>
                            <div className='col-md-3'>
                                <div className="active-cyan-4 mb-4" style={{marginLeft:'-135px'}}>
                                    <button class="btn btn-info my-sm-0" 
                                    type="submit"
                                    onClick={this.doSearchBook}
                                    >Search</button>
                                </div>
                            </div>
                        </div>
                        </form>
                    </div>
                
                <table class="table table-bordered" style={{fontSize:'12px'}}>
                        <thead>
                            <tr>
                                <th>ID Buku</th>
                                <th>Judul Buku</th>
                                <th>Penulis</th>
                                <th>Genre</th>	
                                <th>Harga</th>
                                <th>Status Jual</th>
                                <th>Stok</th>
                                <th>ID User</th>
                                <th>Email User</th>
                                <th>Hapus Akun</th>				
                            </tr>
                        </thead>
                        <tbody>
                            {adminAllBook.map((book,i) =>
                            <tr>
                                <td>{book.id}</td>
                                <td>{book.judul}</td>
                                <td>{book.penulis}</td>
                                <td>{book.genre}</td>
                                <td>{book.harga}</td>
                                <td>{book.status}</td>
                                <td>{book.stok}</td>
                                <td>{book.user_id}</td>
                                <td>{book.email_user}</td>
                                <td>
                                    <button style={{fontSize:'10px'}} onClick={()=>this.doDelete(book.id)}>
                                Delete
                                    </button>
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default connect("adminAllBook, isLoading",actions)(withRouter(AccessAllBook));