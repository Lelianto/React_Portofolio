import React from 'react';
import '../styles/main.css';
import '../styles/bootstrap.min.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'unistore/react'
import { actions } from '../store'

class Header extends React.Component {
    // Function for searching fiture (user input)
    doSearchBook = async () => {
        await this.props.searchBook()
        if (localStorage.getItem('token') !== null){
            this.props.history.push("/search");
        }
    }
    // Function for filter fiture (by category)
    doSearchCategoryBook = async (e) => {
        await this.props.categoryBook(e)
        if (localStorage.getItem('token') !== null){
            this.props.history.push("/category");
        }
    }

    render (){
        return (
        <header>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-4 logo-name" style={{paddingBottom:'15px'}}>
                        <Link to='/' style={{textDecoration:'none', textAlign:'center'}}>
                        <h4 className="toko">kutubuku.store</h4></Link>
                    </div>
                    <div className="col-md-4">
                    </div>
                </div>
            </div>
        </header>
        )
    }
}

export default connect("keyword, kategori",actions)(withRouter(Header));