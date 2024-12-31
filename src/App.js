
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import ViewProductTransactions from './ViewProductTransactions';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { useState } from 'react';
import PieChartComponent from './PieChartComponent';
import StatisticsBox from './StatisticsBox';
import BarChartComponent from './BarChartComponent ';


function App() {

   const [month,setMonth]=useState("March")


  return (
    <div className="App">
      
      
     
      <BrowserRouter>
         <Header></Header>
         <Routes>
             {/* <Route path='/home' element={<Home></Home>}></Route> */}
             <Route path='/view' element={<ViewProductTransactions onMonthChange={setMonth}/>}/>
         </Routes>
         <div className='d-flex'>
              <div className='col w-50 mb-3'>
                <PieChartComponent month={month}/>   
              </div>
              <div className='col w-50 mt-5'>
                <StatisticsBox month={month}/>
              </div>
               <div>
                 <BarChartComponent month={month}/>
               </div>
         </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
