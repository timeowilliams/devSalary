import { Link, withRouter } from 'react-router-dom';
import React,{Component, useState } from "react";
//Login Component should have two buttons:

//Create Account

//Login


class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      username:'',
      password: '',
   };
   this.userInfo = this.userInfo.bind(this);
   this.passwordInfo = this.passwordInfo.bind(this);
   this.validateLogin = this.validateLogin.bind(this);
   this.forgetPassword = this.forgetPassword.bind(this);
   this.signup = this.signup.bind(this);
  }
  validateLogin(e){
    e.preventDefault();
    console.log('Username is', this.state.username, 'Password is', this.state.password)
    //return this.state.username.length > 0 && this.state.password.length > 0 ? console.log('successfully logged in!'): console.log('Invalid')
  }
  forgetPassword(){
    console.log('I forgot password.')
  }
  signup(){
    console.log('Sign up fired!')
  }
 userInfo (event){
    this.setState({username: event.target.value});
  }
  passwordInfo (event){
    this.setState({password: event.target.value});
  }
  render() {
    return (
      <form>
      <h1>Log in here:</h1>    
      <input
        type='email'
        placeholder='Email'
        onChange={this.userInfo}
      /><br></br>
       <input
        type='password'
        placeholder='Password'
        onChange={this.passwordInfo}
      /><br></br>
      <button className = 'login' onClick = {this.validateLogin}>Log In</button>
      <button className = 'signup' onClick = {this.signup}>Sign up</button><br></br>
      <a href ={this.forgetPassword}>forgot password?</a>
      </form>
    );
  }
}

export default LoginComponent;