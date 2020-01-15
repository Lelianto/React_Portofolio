import React from 'react';
import '../styles/main.css';
import '../styles/bootstrap.min.css';
import profile from '../images/profile.png';
import cart from '../images/cart.webp';
import { Link, Redirect,  withRouter } from 'react-router-dom';
import { connect } from 'unistore/react'
import { store, actions } from '../store'

const allGenres = ['Romantis','Sejarah','Teenlit','Drama','Fantasi','Chicklit','Komedi','Misteri','Songlit','Thriller','Fan-Fiction','Dewasa','Horor','Petualangan','Metropop', 'Antologi Puisi']

class Header extends React.Component {
    doSearchBook = async () => {
        await this.props.searchBook()
        if (localStorage.getItem('token') !== null){
            this.props.history.push("/search");
        }
    }

    doSearchCategoryBook = async (e) => {
        console.log('isi e',e)
        await this.props.categoryBook(e)
        if (localStorage.getItem('token') !== null){
            this.props.history.push("/category");
        }
    }

    render (){
        console.log('isi props', this.props.changeInput)
        return (
        <header>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-1">

                    </div>
                    <div className="col-md-1 logo-name">
                        <Link to='/' style={{textDecoration:'none'}}>
                        <h4 className="toko">Kutubuku.com</h4></Link>
                    </div>
                    <div className="col-md-2">
                        <div className="dropdown">
                            <button className="dropbtn">
                                <p className="kategori" >Kategori</p></button>
                                <select className="dropdown-content" name='kategori' onClick={e => this.doSearchCategoryBook(e)}>
                                {allGenres.map((genre,i)=>
                                <option style={{fontSize:'20px'}} value={genre}>
                                {genre}</option>
                                )}
                                </select>
                        </div>
                    </div>
                    <div className="col-md-6 search">
                        <form onSubmit={e => e.preventDefault()}>
                        <div className='row'>
                            <div className='col-md-9'>
                                <div className="active-cyan-4 mb-4">
                                    <input class="form-control mr-sm-2" 
                                    style={{ width:"90%"}} 
                                    type="search" 
                                    placeholder="Cari Judul atau Penulis Buku" 
                                    aria-label="Search"
                                    id="keyword"
                                    name="keyword"
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

                    <div className="col-md-2 user_in">
                        <nav>
                            <ul className="list-unstyled navigate">
                                <li className="navi1">
                                    <Link to="/profile">
                                        <img className="navi2" src={profile} alt=""/>
                                        </Link></li>
                                <li className="navi1">
                                    <Link to="/cart">
                                        <img className="navi3" src={cart} alt=""/>
                                        </Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
        )
    }
}

// export default Header;
export default connect("keyword, kategori, is_login",actions)(withRouter(Header));