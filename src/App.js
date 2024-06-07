import { useState } from 'react';
import FirebaseAuthService from './FirebaseAuthService';

import LoginForm from './components/LoginForm';
import AddEditRecipeForm from './components/AddEditRecipeForm';

// import logo from './logo.svg';
import './App.css';
import FirebaseFirestoreService from './FirebaseFirestoreService';

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
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState('its me');

  console.log('beginning of the App.js');

  // When firebase detects a change of the auth, the setUser function is passed on
  // into the subscribeToAuthChanges(function) => in there the auth.onAuthStateChanged()
  // is executed inwhere the setUser(user) is passed on and also executed.
  FirebaseAuthService.subscribeToAuthChanges(setUser);

  async function handleAddRecipe(newRecipe) {
    alert('this is at the app.js level: handleAddRecipe.js');
    try {
      // creating new document containing recipe, waiting response db
      const response = await FirebaseFirestoreService.createDocument(
        'recipes',
        newRecipe
      );

      console.log('response is: ', response);

      // TODO fetch newrecipes from firestore ?????
      alert(`created a new recipe with the id: ${response.id}`);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="App">
      <div className="title-row">
        <h1 className="title">Cloc INGRED</h1>
        <LoginForm existingUser={user}></LoginForm>
      </div>
      <div>
        {user ? (
          <AddEditRecipeForm
            handleAddRecipe={handleAddRecipe}
          ></AddEditRecipeForm>
        ) : null}
      </div>

      {/* <div>
        <AddEditRecipeForm
          handleAddRecipe={handleAddRecipe}
        ></AddEditRecipeForm>
      </div> */}
    </div>
  );
}

export default App;
