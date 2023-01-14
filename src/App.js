
import './App.css';
import { Canavs } from './components/Canavs';
import { Chat } from './components/Chat';
import { Recipient } from './components/Recipient';
import { Toolbar } from './components/Toolbar';

function App() {
  return (
    <div className="App">
     
    <Chat/>
      <Canavs/>
      <Recipient/>
    </div>
  );
}

export default App;
