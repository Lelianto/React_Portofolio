import React from 'react';
import '../styles/masuk.css';
import '../styles/bootstrap.min.css'
import '../styles/loading.css'
import logo from '../images/logo.png';
import { withRouter, Link, Redirect } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'

class SignIn extends React.Component {

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
        if(this.props.isLoading){
            return (
            <div>
              <body style={{paddingTop:'200px'}}>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-5'>
                  </div>
                  <div className='col-md-2'>
                    <div class="loader"></div>
                  </div>
                  <div className='col-md-5'>
                  </div>
                </div>
               
              </div>
            </body>
            </div>
            )
          }
        else {        
        return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <div className="fadeIn first">
                <img style={{ marginTop:'60px', marginBottom:'60px', width:'50%'}} src={logo} id="icon" alt="User Icon" />
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
                        name="kata_sandi" 
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
                <Link className="underlineHover" to="/">Back to Home</Link>
                </div>

            </div>
            </div>
        )
        }
    }
}

export default connect("Bearer, email, kata_sandi, is_login, isLoading",actions)(withRouter(SignIn));