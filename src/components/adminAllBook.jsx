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
            url: "http://0.0.0.0:1250/book",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
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
            'book_id': e
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

    render() {
        const { adminAllBook } = this.props
        return (
            <div className='container-fluid' style={{paddingTop:'110px'}}>
                <div className='row'>
                    <div className='col-md-1' style={{fontSize:'10px',border:'1px black solid'}}>
                        <div style={{fontSize:'10px',borderBottom:'1px black solid'}}>ID Buku</div>
                        {adminAllBook.map((book,i) =>
                            <div style={{fontSize:'10px',marginTop:'12px'}}>
                                {book.id}
                            </div>
                        )}
                    </div>
                    <div className='col-md-2' style={{fontSize:'10px',border:'1px black solid'}}>
                        <div style={{fontSize:'10px',borderBottom:'1px black solid'}}>Judul Buku</div>
                        {adminAllBook.map((book,i) =>
                        <div style={{fontSize:'10px',marginTop:'12px'}}>
                            {book.judul}
                        </div>
                        )}
                    </div>
                    <div className='col-md-2' style={{fontSize:'10px',border:'1px black solid'}}>
                        <div style={{fontSize:'10px',borderBottom:'1px black solid'}}>Penulis</div>
                        {adminAllBook.map((book,i) =>
                        <div style={{fontSize:'10px',marginTop:'12px'}}>
                            {book.penulis}
                        </div>
                        )}
                    </div>
                    <div className='col-md-1' style={{fontSize:'10px',border:'1px black solid'}}> 
                        <div style={{fontSize:'10px',borderBottom:'1px black solid'}}>Genre</div>
                        {adminAllBook.map((book,i) =>
                        <div style={{fontSize:'10px',marginTop:'12px'}}>
                            {book.genre}
                        </div>
                        )}
                    </div>
                    <div className='col-md-1' style={{fontSize:'10px',border:'1px black solid'}}>
                        <div style={{fontSize:'10px',borderBottom:'1px black solid'}}>Harga</div>
                        {adminAllBook.map((book,i) =>
                        <div style={{fontSize:'10px',marginTop:'12px'}}>
                            {book.harga}
                        </div>
                        )}
                    </div>
                    <div className='col-md-1' style={{fontSize:'10px',border:'1px black solid'}}>
                        <div style={{fontSize:'10px',borderBottom:'1px black solid'}}>Stok</div>
                        {adminAllBook.map((book,i) =>
                        <div style={{fontSize:'10px', marginTop:'12px'}}>
                            {book.stok}
                        </div>
                        )}
                    </div>
                    <div className='col-md-1' style={{fontSize:'10px',border:'1px black solid'}}>
                        <div style={{borderBottom:'1px black solid'}}>ID User</div>
                        {adminAllBook.map((book,i) =>
                        <div style={{fontSize:'10px',marginTop:'12px'}}>
                            {book.user_id}
                        </div>
                        )}
                    </div>
                    <div className='col-md-1' style={{fontSize:'10px',border:'1px black solid'}}>
                        <div style={{borderBottom:'1px black solid'}}>Delete</div>
                        {adminAllBook.map((book,i) =>
                        <button style={{fontSize:'8px',marginTop:'9px'}} onClick={()=>this.doDelete(book.id)}>
                            Delete
                        </button>
                        )}
                    </div>
                    <div className='col-md-2' style={{fontSize:'10px',border:'1px black solid'}}>
                        <div style={{fontSize:'10px',borderBottom:'1px black solid'}}>Email</div>
                        {adminAllBook.map((book,i) =>
                        <div style={{fontSize:'10px',marginTop:'12px'}}>
                            {book.email_user}
                        </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect("adminAllBook, isLoading",actions)(withRouter(AccessAllBook));