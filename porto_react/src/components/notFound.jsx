import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/style.css';
import { withRouter, Link, Redirect } from 'react-router-dom'

class NotMatch extends React.Component {
    render() {
        return (
            <body>
                <div id="notfound">
                    <div class="notfound">
                        <div class="notfound-404">
                            <h1>Oops!</h1>
                            <h2 style={{fontSize:'20px'}}>Terjadi kesalahan, tidak tersedia.</h2>
                        </div>
                        <Link to="/">Kembali ke Beranda</Link>
                    </div>
                </div>
            </body>
        )
    }
}

export default NotMatch