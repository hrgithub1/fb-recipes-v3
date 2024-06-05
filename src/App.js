// import { useState } from 'react';
// import FirebaseAuthService from './FirebaseAuthService';

// import LoginForm from './components/LoginForm';

// import logo from './logo.svg';
import './App.css';

// No firebase required: So previous code not necessary
// // after a first deployment: warning => removed by using eslint:
// // eslint-disable-next-line no-unused-vars
// import firebase from './FirebaseConfig';

// for manual deployment,
// in package scripts:
// "buildDeploy": "yarn build && firebase deploy --only hosting"
// "buildDeploy": "npm run build && firebase deploy --only hosting"

function App() {
  // standard setting as string
  // const [user, setUser] = useState(null);

  // When firebase detects a change of the auth, the setUser function is passed on
  // into the subscribeToAuthChanges(function) => in there the auth.onAuthStateChanged()
  // is executed inwhere the setUser(user) is passed on and also executed.
  // FirebaseAuthService.subscribeToAuthChanges(setUser);

  return (
    <div className="App">
      <h1>probe for heading</h1>
      <div className="title-row">
        <h1 className="title">Firebase recipes</h1>
        {/* <LoginForm existingUser={user}></LoginForm> */}
      </div>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <p>This is some editing</p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
