
import { useState } from 'react';
import './App.css';
import { Canavs } from './components/Canavs';
import { Chat } from './components/Chat';
import { Recipient } from './components/Recipient';
import { Toolbar } from './components/Toolbar';
import {BrowserRouter, Route, Routes,Navigate} from "react-router-dom";
function App() {
  
  return (
    <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path='/:id' element={<><Canavs/></>} />
            <Route path='/' element={<><Canavs/><Navigate to={`/f${(+new Date()).toString(16)}`} replace/></>} />
          </Routes>
    </div>
    </BrowserRouter>

  );
}

export default App;
