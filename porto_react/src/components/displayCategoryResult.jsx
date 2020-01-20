import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/allBooks.css';
import { withRouter} from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'

class CategoryFilterResult extends React.Component {
    // Function to go to book detail information
    goToBook = async (book) => {
        store.setState({ 
            bookId: book.id 
        })
        this.props.history.push("/bookdetail/"+store.getState().bookId);
        }
        
    render() {
        const { listCategory, isLoading } = this.props
        const displayAvailableBooks = listCategory.filter(item => {
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
        return (
            <div className='container top-body'>
                <div className='row'>
                    {displayAvailableBooks.map((book,i) =>
                        <div className='col-md-3 col-sm-6'>
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

export default connect("listCategory, books, bookId, token, isLoading",actions)(withRouter(CategoryFilterResult));