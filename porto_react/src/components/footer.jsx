import React from 'react';
import '../styles/bootstrap.min.css'
import '../styles/main.css';
import { Link } from 'react-router-dom'

class Footer extends React.Component {
    render (){
        return (
            <footer>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-1">
                    </div>
                    <div className="col-md-3 bottom1"><Link to='/about' style={{textDecoration:'none', color:'black'}}>
                        <div className="add">
                            Tentang Kutubuku
                        </div></Link>
                    </div>
                    <div className="col-md-1">
                    </div>
                    <div className="col-md-3 bottom1"><Link to='/help' style={{textDecoration:'none', color:'black'}}>
                        <div className="add">
                            Bantuan
                        </div></Link>
                    </div>
                    <div className="col-md-4 bottom-right">
                        <div>
                        <p>Copyright &copy; 2020 by <Link to="/" style={{ color:'black', textDecoration:'none' }} >Kutubuku.com</Link></p>
                        </div>
                    </div>
                    <div className="col-md-1">
                    </div>
                    <div className="col-md-3 bottom0"><Link to='/rule' style={{textDecoration:'none', color:'black'}}>
                        <div className="add">
                            Ketentuan Kerjasama
                        </div></Link>
                    </div>
                    <div className="col-md-1">
                    </div>
                    <div className="col-md-3 bottom0"><Link to='/contact' style={{textDecoration:'none', color:'black'}}>
                        <div className="add">
                            Hubungi Kami
                        </div></Link>
                    </div>
                </div>
            </div>
            </footer>
        )
    }
}

export default Footer;