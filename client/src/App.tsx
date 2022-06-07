import React from 'react';
import Feed from './pages/Feed';
import Login from './pages/Login';
import Register from './pages/Register';
import User from "./pages/User"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Explore from './pages/Explore';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/feed" element={<Feed />} />
          <Route path='/' element={<Explore/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/user/:username" element={<User />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
