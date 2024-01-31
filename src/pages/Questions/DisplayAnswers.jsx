import React from 'react';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Avtar from '../../components/Avtar/Avtar';
import { deletAnswer} from '../../actions/question';

//import deleteAnswer from '../../actions/question';
import './Questions.css'

const DisplayAnswers = ({question, handleShare}) => {
  const User = useSelector((state) => (state.currentUserReducer))
  const { id } = useParams()
  const dispatch = useDispatch()
  const handleDelete = (answerId, noOfAnswers) => {
    dispatch(deletAnswer(id, answerId, noOfAnswers - 1))
  }
  return (
    <div>
      {
        question.answer.map((ans) =>(
<div className='display-ans' key={ans._id}>
    <p>{ans.answerBody}</p> 
    <div className='question-action-user'>
         <div>
           <button type='button' onClick={handleShare}>Share</button>

           { 
             User?.result?._id === ans?.userId && (
           <button type='button' onClick={() => handleDelete(ans._id, question.noOfAnswers )}>Delete</button>
           )
       }
          
    </div>
     <div>
         <p>answered {moment(ans.answeredOn).fromNow()}</p>
          <Link to={`/Users/${question.userId}`} className='user-link' style ={{color:'#0086d8'}}>
          <Avtar backgroundColor='green' px='8px' py='5px'>{ans.userAnswered.charAt(0).toUpperCase()}</Avtar>
             <div>  {ans.userAnswered}  </div>
        </Link>   
                    </div>
                  </div>

</div>
        ))     
      }
    </div>
  )
}

export default DisplayAnswers
