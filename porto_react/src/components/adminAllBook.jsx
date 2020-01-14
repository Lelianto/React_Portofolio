import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/allBooks.css';
import bookphoto from '../images/book.jpg'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'


class AccessAllBook extends React.Component {
    getListBuku =()=>{
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
                    store.setState({ adminAllBook: response.data, isLoading:false})
                    console.log(response.data)
                    return response
                })
                .catch(function (error){
                    store.setState({ isLoading: false})
                })
    }
    
    doDelete = async (e) => {
        console.log('isi target e', e)
        store.setState({
            'book_id': e
        })
        await this.props.deleteItem()
        if (localStorage.getItem('token') !== null){
            this.getListBuku()
            this.props.history.push("/books");
        }
    }
    
    componentDidMount = () => {
        this.getListBuku()
    };

    render() {
        const { adminAllBook } = this.props
        console.log('ISI ALL book', adminAllBook)
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
                    <div className='col-md-3' style={{fontSize:'10px',border:'1px black solid'}}>
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
                    <div className='col-md-1' style={{fontSize:'10px',border:'1px black solid'}}>
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

// export default AccessAllBook;
export default connect("adminAllBook, token, is_login",actions)(withRouter(AccessAllBook));