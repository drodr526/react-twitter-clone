import React from 'react';
import Feed from './pages/Feed';
import Login from './pages/Login';
import Register from './pages/Register';
import User from "./pages/User"
import Thread from "./pages/Thread"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Explore from './pages/Explore';
import Settings from "./pages/Settings"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/feed" element={<Feed />} />
          <Route path='/' element={<Explore/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/user/:username" element={<User />} />
          <Route path="/posts/:postID" element={<Thread />} />
          <Route path="/register" element={<Register />} />
          <Route path='/settings' element={<Settings/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
