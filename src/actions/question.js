//import React from 'react'
import * as api from '../api'

const askQuestion = (questionData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.postQuestion(questionData);
    dispatch({ type: "POST_QUESTION", payload: data });
    dispatch(fetchAllQuestions());
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllQuestions  = () => async (dispatch) => {
  try {
    const { data } = await api.getAllQuestions()
     dispatch ( { type: 'FETCH_ALL_QUESTIONS', payload: data })
  } catch (error) {
     console.log(error)
    
  }
}

export const deleteQuestion = (id, navigate) => async (dispatch) => {
  try {
    const { data } = await api.deleteQuestion(id)
    dispatch(fetchAllQuestions())
    navigate('/')
  } catch (error) {
    console.log(error); 
  }
}

export const voteQuestion = (id, value, userId) => async (dispatch) => {
  try {
    const { data } = await api.voteQuestion(id, value, userId)
    dispatch(fetchAllQuestions())
  } catch (error) {
    console.log(error)
  }
}

export const postAnswer = (answerData) => async (dispatch) => {
  try {
    // Destructure the answerData object
    const { id, noOfAnswers, answerBody, userAnswered, userId } = answerData;

    // Make the API call using await
    const { data } = await api.postAnswer(id, noOfAnswers, answerBody, userAnswered, userId);

    // Dispatch the result
    dispatch({ type: 'POST_ANSWER', payload: data });

    // Fetch all questions (assuming fetchAllQuestions is a valid action)
    dispatch(fetchAllQuestions);
  
  } catch (error) {
    console.log(error); // Log the error
  }
};

export const deletAnswer = (id, answerId, noOfAnswers) => async (dispatch) =>{
  try {  
         const { data } = await api.deletAnswer(id, answerId,  noOfAnswers);
         dispatch(fetchAllQuestions);
        } catch (error) {
    console.log(error)
  }
};


export default askQuestion;
