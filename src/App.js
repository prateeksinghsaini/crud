import './App.css';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/AddUser' element={<AddUser/>}/>
        <Route path='/EditUser/:id' element={<EditUser/>}/>
      </Routes>
    </div>
  );
}