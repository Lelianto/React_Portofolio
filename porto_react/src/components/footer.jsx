import React from 'react';
import '../styles/bootstrap.min.css'
import '../styles/main.css';
import { Link } from 'react-router-dom'
import ig from '../images/instagram.png'
import fb from '../images/facebook.png'
import tw from '../images/twitter.png'

class Footer extends React.Component {
    render (){
        return (
            <footer>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-1">
                    </div>
                    <div className="col-md-3 bottom1">
                        <div className="add">
                            Tentang Kutubuku
                        </div>
                    </div>
                    <div className="col-md-1">
                    </div>
                    <div className="col-md-3 bottom1">
                        <div className="add">
                            Bantuan
                        </div>
                    </div>
                    <div className="col-md-4 bottom-right">
                        <div>
                        <p>Copyright &copy; 2020 by <Link to="/" style={{ color:'black', textDecoration:'none' }} >Kutubuku.com</Link></p>
                        </div>
                    </div>
                    <div className="col-md-1">
                    </div>
                    <div className="col-md-3 bottom0">
                        <div className="add">
                            Ketentuan Kerjasama
                        </div>
                    </div>
                    <div className="col-md-1">
                    </div>
                    <div className="col-md-3 bottom0">
                        <div className="add">
                            Hubungi Kami
                        </div>
                    </div>
                </div>
            </div>
            </footer>
        )
    }
}

export default Footer;