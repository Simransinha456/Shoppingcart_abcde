import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "../src/pages/home.js";
import Navbar from './components/navbar.js';
import Register from './components/register.js';
import Login from './components/login.js';
import Order from './pages/order.js';
import AddtoCart from './pages/add-to-cart.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/add-to-cart' element={<AddtoCart />} />
          <Route path='/orders' element={<Order />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;