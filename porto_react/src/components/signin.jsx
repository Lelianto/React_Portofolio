import React from 'react';
import '../styles/masuk.css';
import '../styles/bootstrap.min.css'
import logo from '../images/navigasi-logo.png';
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'

class SignIn extends React.Component {

    doLogin = async () => {
        await this.props.postLogin()
        console.warn('string cek', this.props.is_login)
        if (this.props.is_login){
            this.props.history.push("/profil");
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
                        name="username" 
                        placeholder="Your Username"
                        onChange={e => this.props.changeInput(e)} />
                        <input 
                        type="text" 
                        id="password" 
                        className="fadeIn third" 
                        name="password" 
                        placeholder="Your Password"
                        onChange={e => this.props.changeInput(e)} />
                        <input 
                        type="submit" 
                        className="fadeIn fourth" 
                        value="Log In" 
                        onClick={this.doLogin}/>
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
export default SignIn;
// export default connect("username, password, is_login",actions)(withRouter(SignIn));