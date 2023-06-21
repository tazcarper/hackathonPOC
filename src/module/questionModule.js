"use client";
import React, { useEffect, useContext } from "react";
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../store/globalStore";
import TextAreaComponent from "../components/TextArea";

const CategoriesModule = () => {
  const state = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);

  const handleSubmit = (event, questionTitle) => {
    event.preventDefault();

    // Retrieve the answer from the textarea
    const answer = event.target.elements.answer.value;

    // Update the answer in the state
    dispatch({
      type: "SET_QUESTION_ANSWER",
      payload: { questionTitle, answer },
    });

    // AFTER RESPONSE FROM CHATGPT WE CHANGE STATE AND ADD FEEDBACK

    dispatch({
      type: "SET_QUESTION_FEEDBACK",
      payload: {
        questionTitle,
        feedback:
          "Dealing with feedback effectively involves a few key steps, beginning with actively listening and fully understanding the points raised. It's crucial to keep an open mind and not become defensive; instead, understand that feedback, especially when constructive, is aimed at promoting growth and improvement. Once you've grasped the feedback, spend some time reflecting on it",
      },
    });

    // Set the question state to 'complete'
    dispatch({
      type: "SET_QUESTION_STATE",
      payload: { questionTitle, state: "complete" },
    });

    // You can add your API request here to get feedback and update feedback state
  };

  // Get the current category
  const currentCategory = state.categories.find(
    (category) => category.title === state.currentCategory
  );

  const activeQuestion = currentCategory.questions.find(
    (question) => question.state === "inProgress"
  );

  useEffect(() => {
    if (!activeQuestion) {
      const firstIncomplete = currentCategory.questions.find(
        (question) => question.state === "incomplete"
      );
      if (!firstIncomplete) {
        dispatch({ type: "SET_STEP", payload: "feedback" });
      } else {
        dispatch({
          type: "SET_QUESTION_STATE",
          payload: {
            questionTitle: firstIncomplete.title,
            state: "inProgress",
          },
        });
      }
    }
  }, [currentCategory]);

  return (
    <div className="container">
      {currentCategory.questions.map((question) => (
        <div key={question.title}>
          <h3>{question.title}</h3>
          <form onSubmit={(event) => handleSubmit(event, question.title)}>
            <TextAreaComponent name="answer" question={question} />
            <button type="submit">Submit Answer</button>
          </form>
          <p
            className={
              question.state === "incomplete"
                ? "text-red"
                : question.state === "inProgress"
                ? "text-black"
                : "text-green"
            }
          >
            Status: {question.state}
          </p>
          {question.feedback.length > 0 && <p>{question.feedback}</p>}
        </div>
      ))}
      <button
        onClick={() =>
          dispatch({ type: "SET_STEP", payload: "choose_category" })
        }
      >
        Back
      </button>
    </div>
  );
};

export default CategoriesModule;
