import React from 'react';
import '../styles/masuk.css';
import '../styles/bootstrap.min.css'
import '../styles/loading.css';
import logo from '../images/bug-logo.png';
import { withRouter, Link, Redirect } from 'react-router-dom'
import { connect } from 'unistore/react'
import { actions, store } from '../store'

class SignIn extends React.Component {
  // Handle see password
  handlePass = () => {
    if (this.props.typeText == "password") {
      store.setState({
        typeText:"text"
      })
    } else {
      store.setState({
        typeText:"password"
      })
    }
  }
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
    // console.log(this.props.typeText)
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
                    type={this.props.typeText} 
                    id="password" 
                    className="fadeIn third" 
                    name="password" 
                    placeholder="Kata Sandi"
                    onChange={e => this.props.changeInput(e)} />
                    <p></p>
                    <input style={{fontSize:'12px', textAlign:'left'}} type="checkbox" onClick={this.handlePass}/>Show Password
                    <p></p>
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

export default connect("typeText, Bearer, email, password, isLoading",actions)(withRouter(SignIn));