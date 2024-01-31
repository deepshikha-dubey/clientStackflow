import React, { useState }  from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import moment from 'moment';
import copy from 'react-copy-to-clipboard';
import upVote from '../../assets/sort-up.png';
import downVote from '../../assets/sort-down.png';
import './Questions.css'
import Avtar from '../../components/Avtar/Avtar'
import DisplayAnswers from './DisplayAnswers';
import { postAnswer, deleteQuestion, voteQuestion } from '../../actions/question';


const QuestionDetails = () => {
    const { id } = useParams() 
   const questionList = useSelector (state => state.questionsReducer)  
  
    // console.log(questionList);

   /*var questionList = [{
        _id: '1',
        upVotes:3,
        downVotes: 2,
        noOfAnswers: 2,
        questionTitle: "What is a function?",
        questionBody: "It meant to be",
        questionTags:['java', 'node.js', 'mongodb', 'react.js'],
        userPosted: 'mano',
        userId: 1,
        askedOn: 'Jan 1',
        answer:[{
            answerBody:"Answer",
            userAnswered:"Kumar",
            answeredOn:"jan 2",
            userId: 1,
        }]
    },{
        _id: '2',
        upVotes:3,
        downVotes: 2,
        noOfAnswers: 0,
        questionTitle: "What is a function?",
        questionBody: "It meant to be",
        questionTags:['javascript', 'R', 'python'],
        userPosted: 'mano',
        userId:2,
        askedOn: 'Jan 1',
        answer:[{
          answerBody:"Answer",
          userAnswered:"Kumar",
          answeredOn:"jan 2",
          userId:2,
      }]
    
    },{
        _id: '3',
        upVotes:3,
        downVotes: 2,
        noOfAnswers: 0,
        questionTitle: "What is a function?",
        questionBody: "It meant to be",
        questionTags:['java', 'node.js', 'mongodb'],
        userPosted: 'mano',
        userId:3,
        askedOn: 'Jan 1',
        answer:[{
          answerBody:"Answer",
          userAnswered:"Kumar",
          answeredOn:"jan 2",
          userId:3,
      }]  
    }] */

    const [Answer, setAnswer] = useState('')
    const Navigate = useNavigate()
    const dispatch = useDispatch()
     const User = useSelector((state) => (state.currentUserReducer))
  const location = useLocation()
  

 const url = 'https://serverstack-k46t.onrender.com/'
     const handlePostAns = (e, answerLength) =>{
  e.preventDefault()
  if( User === null ){
    alert('Login and signup to answer a question');
    Navigate('/Auth')
  }else{
    if (Answer === ''){
      alert('Enter an answer before submitting')
    }else{
      dispatch(postAnswer({id, noOfAnswers: answerLength + 1, answerBody: Answer, userAnswered: User.result.name, userId: User.result._id }));     
    }
  }
}

const handleShare = () => {
    copy(url+location.pathname)
    alert('Copied url : '+url+location.pathname)
} 
const handleUpVote = () => {
  dispatch(voteQuestion (id, 'upVote', User.result._id))
}
const handleDownVote = () => {
  dispatch(voteQuestion (id, 'downVote', User.result._id))
}

const handleDeleted = () => {
  dispatch(deleteQuestion(id, Navigate))
}

  return (
    <div className='question-details-page'>

       {
           questionList.data === null ?
           <h1>Loading...</h1> :
           <>
               {
          questionList.data.filter(question => question._id === id).map(question => (
                    <div key= {question._id}>
                       
                       
            <section className='question-details-container'>
              <h1>{question.questionTitle}</h1>
                <div className='question-details-container-2'>
                   <div className='question-votes'>
                   <img src={upVote} alt="" width="18" className="votes-icon" onClick={handleUpVote} />
                 
                    <p>{ question.upVote.length - question.downVote.length }</p>

                    <img src={downVote} alt="" width='18' className='votes-icon' onClick={handleDownVote}/>
                   </div>
                   <div style={{width:"100%"}}>
                     <p className='question-body'>                     
                        {question.questionBody}</p>
                  <div className='question-details-tags'>
                    {
                        question.questionTags.map((tag)=>(
                            <p key ={tag}>{tag}</p>
                        ))
                    }
                  </div>
                  <div className='question-action-user'>
                    <div>
                        <button type='button' onClick={handleShare}>Share</button>
                      {
                        User?.result?._id === question?.userId && (
                          <button type='button' onClick={handleDeleted}>Delete</button>
                        )
                      }

                    </div>
                    <div>
                        <p>asked { moment(question.askedOn).fromNow() }</p>
                        <Link to={`/Users/${question.userId}`} className='user-link' style ={{color:'#0086d8'}}>
                       <Avtar backgroundColor='orange'  px='8px' py='5px'>{question.UserPosted.charAt(0).toUpperCase()}</Avtar>
                          <div>
                            {question.UserPosted}
                          </div>
                                  </Link>
                    </div>
                  </div>
                  </div>
                </div>     
          </section>{
            question.noOfAnswers !== 0 && (
                <section>
                    <h3>{question.noOfAnswers} Answers</h3>
                    <DisplayAnswers key={question._id} question={question} handleShare={handleShare} />
                </section>
            )
          }
              <section className='post-ans-container'>
                 <h3>Your Answers</h3>
                 <form onSubmit={ (e) => {handlePostAns(e, question.answer.length)}}>
                    <textarea name="" id="" cols="50" rows="10" onChange={e => setAnswer(e.target.value)}></textarea><br/>
                    <input type='submit' className='post-ans-btn' value = 'Post Your Answer'/>
                 </form>
                 <p>
                    Browse other Question tagged 
                    { question.questionTags.map((tag) =>(
                        <Link to='/Tags' key={tag} className='ans-tags'>{tag}</Link>
                    ) ) }
                    or
                    <Link to='/AskQuestions' style={{textDecoration:'none', color:'#009dff'}} >Ask your own Question.</Link>
                 </p>
              </section>
                    </div>
                 ))
               }
           </>
       }
      
    </div>
  )
      } 

export default QuestionDetails
