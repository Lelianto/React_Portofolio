import React from 'react';
import '../styles/main.css';
import '../styles/bootstrap.min.css';
import profile from '../images/profile.png';
import cart from '../images/cart.webp';
import { Link, Redirect } from 'react-router-dom';
 

class Header extends React.Component {
    render (){
        return (
        <header>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-1">

                    </div>
                    <div className="col-md-1 logo-name">
                        <Link to='/' style={{textDecoration:'none'}}>
                        <h4 className="toko">kutubuku.com</h4></Link>
                    </div>
                    <div className="col-md-2">
                        <div className="dropdown">
                            <button className="dropbtn">
                                <a className="kategori" href="">Kategori</a></button>
                            <div className="dropdown-content">
                                <a href="#">Romantis</a>
                                <div className="dropdown-divider"></div>
                                <a href="#">Komedi</a>
                                <div className="dropdown-divider"></div>
                                <a href="#">Fan Fiction</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 search">
                        <div className="active-cyan-4 mb-4">
                            <input className="form-control" type="text" placeholder="Cari judul buku atau penulis" aria-label="Search" />
                        </div>
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

export default Header;