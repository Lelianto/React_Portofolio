import React from 'react';
import '../styles/masuk.css';
import '../styles/bootstrap.min.css'
import '../styles/loading.css'
import logo from '../images/bug-logo.png';
import { withRouter, Link, Redirect } from 'react-router-dom'
import { connect } from 'unistore/react'
import { actions } from '../store'

class SignIn extends React.Component {
  // Function for Login
  doLogin = async () => {
    await this.props.postLogin()
    if (localStorage.getItem('token') !== null){
        this.props.history.push("/profile");
    }
    else {
      alert('Email atau Password Anda Salah...')
      return <Redirect to={{ pathname: "/login" }} />;
    }
  }

  render() { 
    return (
    <div className="wrapper fadeInDown" style={{marginTop:'-50px',marginBottom:'60px'}}>
        <div id="formContent">
            <div className="fadeIn first">
            <img style={{ marginTop:'60px', marginBottom:'60px', width:'30%'}} src={logo} id="icon" alt="User Icon" />
            </div>

                {/* <!-- Login Form --> */}
                <form onSubmit={e => e.preventDefault()}>
                    <input 
                    type="text" 
                    id="login" 
                    className="fadeIn second" 
                    name="email" 
                    placeholder="Email"
                    onChange={e => this.props.changeInput(e)} />
                    <input 
                    type="password" 
                    id="password" 
                    className="fadeIn third" 
                    name="password" 
                    placeholder="Kata Sandi"
                    onChange={e => this.props.changeInput(e)} />
                    <input 
                    type="submit" 
                    className="fadeIn fourth" 
                    value="Log In" 
                    onClick={this.doLogin}/>
                </form>

            {/* <!-- Remind Passowrd --> */}
            
            <div id="formFooter">
            <Link style={{textDecoration:'none'}} className="underlineHover" to="/signup">Sign Up</Link><p> </p>
            <Link style={{textDecoration:'none'}} className="underlineHover" to="/">Back to Home</Link>
            </div>

        </div>
        </div>
    )

  }
}

export default connect("Bearer, email, password, isLoading",actions)(withRouter(SignIn));