import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/allBooks.css';
import { withRouter} from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'
import axios from 'axios'


class AdminAllBooks extends React.Component {
    // Function to go to book information detail
    goToBook = async (book) => {
        store.setState({ bookId: book.id })
        this.props.history.push("/bookdetail/"+store.getState().bookId);
        }
    
    // Function to get all book and display it into homepage
    componentDidMount = () => {
        const req = {
        method: "get",
        url: store.getState().baseUrl+"/book",
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
        }
        }; 
        const self = this
        axios(req)
            .then(function (response) {
                store.setState({ 
                    books: response.data, 
                    isLoading:false
                })
                return response
            })
            .catch((error)=>{
                store.setState({ 
                    isLoading: false
                })
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
    };

    render() {
        const { books, isLoading } = this.props
        const displayAvailableBooks = books.filter(item => {
            if (item.foto_buku !== null && item.judul !== null && item.penulis !== null && item.harga !== null && item.berat !== null) {
                return item;
            }
            return false
        });
        if(isLoading){
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
        if(localStorage.getItem('email')==='lian@alterra.id'){
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

export default connect("books, bookId, token, isLoading",actions)(withRouter(AdminAllBooks));