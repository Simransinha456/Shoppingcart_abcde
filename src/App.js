import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "../src/pages/home.js";
import Auth from "../src/pages/auth.js";
import CreateRecipe from "../src/pages/create-recipe.js";
import SavedRecipe from "../src/pages/saved-recipe.js";
import Navbar from './components/navbar.js';
import Login from './components/login.js';
import Register from './components/register.js';


function App() {
  return (
    <div className="App">
    <Router>
      <Navbar/>
      <Login />
      <Register />
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path='/create-recipe' element = {<CreateRecipe />} />
        <Route path='/saved-recipe' element = {<SavedRecipe />} />
        {/* <Route path='/auth' element = {<Auth />} /> */}
        
      </Routes>
    </Router>
    </div>
  );
}

export default App;
