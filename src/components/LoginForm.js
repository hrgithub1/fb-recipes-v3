/**
 * React component
 * ------------------
 * LoginForm
 */

import { useState } from 'react';
import FirebaseAuthService from '../FirebaseAuthService';

function LoginForm({ existingUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //------------------------- LOGIN (PREV NEW USER) ---------------------------

  // define functions that handle the interaction with the auth Firestore service
  async function handleSubmit(event) {
    // when a form is submitted, it is always good practice
    // to pass the event and call the event.preventDefault(),
    // Then this default behavior, submitting to the server, is prevented.
    // In an single page appl this behavior is typically not desired.
    event.preventDefault();

    // WHEN USING REGISTAR-USER : => IT IS LIKE REGISTRATING THE USER.
    // SO THE USER CAN START HIM SELF !!!
    //
    // try catch, best practices in JS, to handle async and promises.....
    try {
      // NEXT CODE ONLY FOR NEW USERS TO REGISTRATE
      //   await FirebaseAuthService.registarUser(username, password);
      // FOLLOWING CODE, MAKE SURE USER EXISTS !!! => DONE BY ADMIN
      await FirebaseAuthService.loginUser(username, password);
      setUsername('');
      setPassword('');
    } catch (error) {
      // message comes from firebase
      // HOW TO CHANGE THE LANGUAGE ????
      alert(error.message);
    }
  }

  //------------------------- LOGGING OUT  ---------------------------------

  function handleLogout() {
    FirebaseAuthService.logoutUser();
  }

  //------------------------- LOGIN WITH GOOGLE  ---------------------------------

  //   async function handleLoginWithGoogle() {
  //     try {
  //       await FirebaseAuthService.loginWithGoogle(username);
  //     } catch (error) {
  //       alert(error.message);
  //     }
  //   }

  //------------------------- RESETTING PASSWORD ---------------------------------
  async function handleSendResetPasswordEmail() {
    if (!username) {
      alert('No user known by that name');
      return;
    }

    try {
      await FirebaseAuthService.sendPasswordResetEmail(username);
      alert('password is send to emailaddress');
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="login-form-container">
      {existingUser ? (
        <div className="row">
          {/* next variable should be the actual name */}
          {/* <h3>Welcome, {existingUser.email}</h3> */}

          <h3>Welcome, user</h3>
          <button
            type="button"
            className="primary-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <label className="input-label login-label">
            Username (email):
            {/* GOOD PRACTICE HTML JS: PUT INPUT ELEMENT INSIDE LABEL ELEMENT:
            THIS ENSURES THAT WHEN YOU CLICK ON THE LABEL OR THE INPUT ELEMENT,
            IT WILL CORRECTLY FOCUS THE ELEMENT */}
            <input
              type="email"
              required
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="input-text"
            />
          </label>
          <label className="input-label login-label">
            Password:
            <input
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="input-text"
            />
          </label>
          <div className="button-box">
            {/* Next submit button was to create a new user (NOT by admin) */}
            {/* <button className="primary-button">Submit</button> */}
            <button className="primary-button">Login</button>
            {/* adding attributes, in order to:
            type = button, preventing to sent the form
            when clicking => execute handler */}
            <button
              type="button"
              onClick={handleSendResetPasswordEmail}
              className="primary-button"
            >
              Reset password
            </button>
            {/* <button
              type="button"
              onClick={handleLoginWithGoogle}
              className="primary-button"
            >
              Login with google
            </button> */}
          </div>
        </form>
      )}
    </div>
  );
}

export default LoginForm;
