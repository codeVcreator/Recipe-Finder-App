import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './Components/MainPage';
import MealInfo from './Components/MealInfo';

function App() {

  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/:mealid' element={<MealInfo />}/> 
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
