import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/allBooks.css';
import { withRouter} from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'


class SearchAllBook extends React.Component {
    
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
    
    // Function for searching fiture (admin input)
    doSearchBook = async () => {
        await this.props.searchBook()
        this.props.history.push("/books/search");
    }

    render() {
        const { listResults } = this.props
        const searchResult = listResults.filter(item => {
            if (item.penulis !== null && item.judul !== null && item.genre !== null && item.email_user !== null) {
                return item;
            }
            return false
        });
        return (
            <div className='container-fluid' style={{paddingTop:'50px'}}>
                <div className='row'>
                    <div className="col-md-12 search">
                        <form onSubmit={e => e.preventDefault()}>
                        <div className='row'>
                            <div className='col-md-3'>
                            </div>
                            <div className='col-md-6'>
                                <div className="active-cyan-4 mb-4">
                                    <input class="form-control mr-sm-2" 
                                    style={{ width:"90%"}} 
                                    type="search" 
                                    placeholder="Cari Judul, Penulis, Genre, Status Jual" 
                                    aria-label="Search"
                                    id="keyword"
                                    name="keyword"
                                    onChange={(e) => this.props.changeInput(e)}/>
                                </div>
                            </div>
                            <div className='col-md-3'>
                                <div className="active-cyan-4 mb-4" style={{marginLeft:'-135px'}}>
                                    <button class="btn btn-info my-sm-0" 
                                    type="submit" style={{marginLeft:'-190px'}}
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
                            {searchResult.map((book,i) =>
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

export default connect("listResults,adminProductKeyword ,adminAllBook, isLoading",actions)(withRouter(SearchAllBook));