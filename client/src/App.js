import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './components/Home'
import LandingPage from './components/LandingPage'
import Detail from './components/Detail';
import Create from './components/Create';
import styles from './styles/App.module.css';

export default function App() {
  return (
    <BrowserRouter>
    <div className={styles.app}>
      <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/dogs/:id" element={<Detail/>}/>
      <Route path="/dog" element={<Create/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

