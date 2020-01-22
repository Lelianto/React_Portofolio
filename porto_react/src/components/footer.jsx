import React from 'react';
import '../styles/bootstrap.min.css'
import '../styles/main.css';
import { Link } from 'react-router-dom'

const Footer =()=>{
    return (
        <footer>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                </div>
                <div className="col-md-3 col-sm-12 bottom1"><Link to='/about' style={{textDecoration:'none', color:'black'}}>
                    <div className="add">
                        Tentang Kutubuku
                    </div></Link>
                </div>
                <div className="col-md-2">
                </div>
                <div className="col-md-3 col-sm-12 bottom1"><Link to='/help' style={{textDecoration:'none', color:'black'}}>
                    <div className="add">
                        Bantuan
                    </div></Link>
                </div>
                <div className="col-md-3">
                </div>
                <div className="col-md-12">
                </div>
                <div className="col-md-2">
                </div>
                <div className="col-md-3 col-sm-12 bottom0"><Link to='/rule' style={{textDecoration:'none', color:'black'}}>
                    <div className="add">
                        Ketentuan Kerjasama
                    </div></Link>
                </div>
                <div className="col-md-2">
                </div>
                <div className="col-md-3 col-sm-12 bottom0"><Link to='/contact' style={{textDecoration:'none', color:'black'}}>
                    <div className="add">
                        Hubungi Kami
                    </div></Link>
                </div>
                <div className="col-md-3">
                </div>
            </div>
            <div className='row'>
                <div className="col-md-12 col-sm-12 bottom-right">
                    <div>
                    <p>Copyright &copy; 2020 by <Link to="/" style={{ color:'black', textDecoration:'none' }} >Kutubuku.com</Link></p>
                    </div>
                </div>
            </div>
        </div>
        </footer>
    )
}

export default Footer;