import React from 'react'
import {useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './HomeMainbar.css'
import QuestionList from './QuestionList'


const HomeMainbar = () => {
  const location = useLocation()
    
    const user = null;
    const navigate = useNavigate()

  const questionList = useSelector (state => state.questionsReducer) 

//console.log(questionList); 


    
const checkAuth = () =>{
  if (user === 1){
    alert("Login or signup to ask question")
    navigate('/Auth')
}else{
  navigate ('/AskQuestion')
}
}
   
  return (
     <div className='main-bar'>
      <div className='main-bar-header'>
          {
            location.pathname === '/' ? <h1>Top Questions</h1> : <h1>Ask Question</h1> 
          }
          <button onClick={checkAuth} className='ask-btn'>Ask Question</button>
         
      </div>
      <div>
         { 
             questionList.data === null ?
             <h1>Loading...</h1> : 
             <>
                <p>{ questionList.data.length} questions</p>

               <QuestionList questionList ={questionList.data}/>
                  
             </>
         }
      </div>

    </div>
  )
}

export default HomeMainbar
