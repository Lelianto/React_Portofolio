import React from 'react';
import '../styles/masuk.css';
import '../styles/bootstrap.min.css'
import logo from '../images/navigasi-logo.png';
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store';

class SignUp extends React.Component {

    doSignUp = async () => {
        await this.props.postSignUp()
        console.warn('string cek', this.props.is_login)
        if (this.props.is_login){
            this.props.history.push("/profile");
        }
    }

    render() {
        return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <div className="fadeIn first">
                <img style={{ marginTop:'30px', marginBottom:'30px'}} src={logo} id="icon" alt="User Icon" />
                </div>

                    {/* <!-- Login Form --> */}
                    <form onSubmit={e => e.preventDefault()}>
                        <input 
                        type="text" 
                        id="login" 
                        className="fadeIn second" 
                        name="nama_lengkap" 
                        placeholder="Nama Lengkap"
                        onChange={e => this.props.changeInput(e)} />
                        <input 
                        type="text" 
                        id="login" 
                        className="fadeIn second" 
                        name="email" 
                        placeholder="Email"
                        onChange={e => this.props.changeInput(e)} />
                        <input 
                        type="text" 
                        id="password" 
                        className="fadeIn third" 
                        name="kata_sandi" 
                        placeholder="Kata Sandi"
                        onChange={e => this.props.changeInput(e)} />
                        <input 
                        type="submit" 
                        className="fadeIn fourth" 
                        value="SignUp" 
                        onClick={this.doSignUp}/>
                    </form>

                {/* <!-- Remind Passowrd --> */}
                <div id="formFooter">
                <Link className="underlineHover" to="/">Back to Home</Link>
                </div>

            </div>
            </div>
        )
    }
}
// export default SignUp;
export default connect("nama_lengkap, email, kata_sandi, is_login",actions)(withRouter(SignUp));