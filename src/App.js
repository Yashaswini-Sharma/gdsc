import logo from './logo.svg';
import './App.css';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Home from './components/Home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import CreatePosts from './components/Posts/CreatePosts';
import Comment from './components/Posts/Comment'
import Showcomment from './components/Posts/showcomment';


function App() {
  const [userName, setUserName] =useState("")
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUserName(user.displayName);

      }
      else setUserName("");

    })})
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home name={userName} />} />
          <Route path="/createPosts" element={<CreatePosts />} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/showcomments" element={<Showcomment/>}/>


        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
