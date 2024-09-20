import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { DashBoard, Login, Register } from './pages';
import Header from './components/Header';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <main className="pt-10"> 
        <Routes>
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/dashboard' element={<DashBoard />} /> 
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
