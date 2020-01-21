import React from 'react';
import '../styles/masuk.css';
import '../styles/bootstrap.min.css'
import '../styles/loading.css'
import logo from '../images/bug-logo.png';
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'unistore/react'
import { actions } from '../store';

class SignUp extends React.Component {
  // Function for doing SignUp
  doSignUp = async () => {
    await this.props.postSignUp()
    if (this.prop){
        this.props.history.push("/profile");
    }
  }

  render() {
    return (
    <div className="wrapper fadeInDown" style={{marginTop:'-50px', marginBottom:'100px'}}>
        <div id="formContent">
            <div className="fadeIn first">
            <img style={{ marginTop:'30px', marginBottom:'30px', width:'30%'}} src={logo} id="icon" alt="User Icon" />
            </div>

                {/* <!-- Login Form --> */}
                <form onSubmit={e => e.preventDefault()}>
                    <input 
                    type="text" 
                    id="login" 
                    className="fadeIn second" 
                    name="nama_lengkap" 
                    placeholder="Nama Lengkap"
                    pattern="^([a-zA-Z0-9]+|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$"
                    onChange={e => this.props.changeInput(e)} />
                    <input 
                    type="text" 
                    id="login" 
                    pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
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
                    value="Sign Up" 
                    onClick={this.doSignUp}/>
                </form>

            {/* <!-- Remind Passowrd --> */}
            <div id="formFooter">
            <Link style={{textDecoration:'none'}} className="underlineHover" to="/">Back to Home</Link>
            </div>

        </div>
        </div>
    )
  }
}

export default connect("nama_lengkap, email, password, isLoading",actions)(withRouter(SignUp));