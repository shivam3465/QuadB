import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './app.scss';
import Header from './components/header/Header.jsx'
import Home from './components/home/Home.jsx';
import Show from './components/show/Show.jsx';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App"> 
        <Router>
          <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/show/:id' element={<Show/>}/>
          </Routes>
        </Router>
        <ToastContainer/>
    </div>
  );
}

export default App;
