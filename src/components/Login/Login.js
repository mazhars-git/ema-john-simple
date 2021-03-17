import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeFirebaseLoginFramework, signInWithEmailAndPassword } from './LoginManager';


function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  });

  initializeFirebaseLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
        handleResponse(res, true)
    })
  }

  const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
        handleResponse(res, true)
    })
  }

  const signOut = () => {
      handleSignOut()
      .then(res => {
        handleResponse(res, false)
      })
  }

  const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from); 
        }
      
  }
  
  const handleBlur = (e) =>{
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
     isFieldValid = /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/.test(e.target.value);
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) =>{
    console.log(user.email, user.password)
    if (newUser && user.email && user.password) {
        createUserEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
            handleResponse(res, true)
        })
    }
    if (!newUser && user.email && user.password) {
        signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
            handleResponse(res, true)
        })
    }
    e.preventDefault();
  }
  
  return (
    <div style={{textAlign: 'center'}}>
        {
          user.isSignedIn ? <button onClick={signOut}>Sign out</button>
          : <button onClick={googleSignIn}>Sign in</button>
        }
        <br/>
        <button onClick={fbSignIn}>Sign in with Facebook</button>
        {
          user.isSignedIn && 
          <div>
            <h2>Welcome, {user.name}</h2>
            <p>Your Email: {user.email}</p>
            <img src={user.photo} alt=""/>
          </div>
        }
        <h1>Our Authentication</h1>
        <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)}/>
        <label htmlFor="newUser">New User Sign Up</label>
        <form onSubmit={handleSubmit}>
          {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your name"/>}
          <br/>
          <input type="email" name="email" onBlur={handleBlur} placeholder="type your email" required/>
          <br/>
          <input type="password" name="password" onBlur={handleBlur} placeholder="password" required/>
          <br/>
          <input type="submit" value={newUser ? 'Sign Up' : 'Sign in'}/>
        </form>
        <p style={{color: 'red'}}>{user.error}</p>
        {
          user.success && <p style={{color: 'green'}}>User {newUser ? 'Created' : 'Logged in'} Successfully</p>
        }
    </div>
  );
}

export default Login;
