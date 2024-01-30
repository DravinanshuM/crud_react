import './App.css';
import Home from './components/Home';
import Edit from './components/Edit';
import View from './components/View';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
     <>
       <BrowserRouter>
            <Routes>
               <Route path='/' element={<Home/>}/>
               <Route path='/edit/:id' element={<Edit/>}/>
               <Route path='/view/:id' element={<View/>} />
            </Routes>
       </BrowserRouter>
     </>
  );
}

export default App;
