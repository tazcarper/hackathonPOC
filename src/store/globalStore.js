"use client";

import React, { createContext, useReducer } from "react";

// Defining the initial state of our store
const initialState = {
  step: "intro",
  categories: [
    {
      title: "FAANG",
      activeCategory: false,
      questions: [
        {
          title: "FAANG Question 1",
          description: "This is a description",
          answer: "",
          feedback: "",
          state: "incomplete",
        },
        {
          title: "FAANG Question 2",
          description: "This is a description",
          answer: "",
          feedback: "",
          state: "incomplete",
        },
        {
          title: "FAANG Question 3",
          description: "This is a description",
          answer: "",
          feedback: "",
          state: "incomplete",
        },
      ],
    },
    {
      title: "Management",
      activeCategory: false,
      questions: [
        {
          title: "Management Question 1",
          description: "This is a description",
          answer: "",
          feedback: "",
          state: "incomplete",
        },
        {
          title: "Management Question 2",
          description: "This is a description",
          answer: "",
          feedback: "",
          state: "incomplete",
        },
        {
          title: "Management Question 3",
          description: "This is a description",
          answer: "",
          feedback: "",
          state: "incomplete",
        },
      ],
    },
  ],
  currentCategory: null,
  currentQuestion: null,
  currentQuestions: [],
};

// Defining our reducer
const reducer = (state, action) => {
  eee;
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_CURRENT_CATEGORY":
      return { ...state, currentCategory: action.payload };
    case "SET_CURRENT_QUESTION":
      return { ...state, currentQuestion: action.payload };
    case "SET_CURRENT_QUESTIONS":
      return { ...state, currentQuestions: action.payload };
    case "SET_QUESTION_ANSWER":
      return {
        ...state,
        currentQuestions: state.currentQuestions.map((q) =>
          q.title === action.payload.questionTitle
            ? { ...q, answer: action.payload.answer }
            : q
        ),
        categories: state.categories.map((c) =>
          c.title === state.currentCategory
            ? {
                ...c,
                questions: c.questions.map((q) =>
                  q.title === action.payload.questionTitle
                    ? { ...q, answer: action.payload.answer }
                    : q
                ),
              }
            : c
        ),
      };
    case "RESET_CATEGORY_QUESTIONS":
      return {
        ...state,
        categories: state.categories.map((c) =>
          c.title === action.payload
            ? {
                ...c,
                questions: c.questions.map((q) => ({
                  ...q,
                  state: "incomplete",
                  answer: "",
                  feedback: "",
                })),
              }
            : c
        ),
      };
    case "SET_QUESTION_FEEDBACK":
      return {
        ...state,
        currentQuestions: state.currentQuestions.map((q) =>
          q.title === action.payload.questionTitle
            ? { ...q, feedback: action.payload.feedback }
            : q
        ),
        categories: state.categories.map((c) =>
          c.title === state.currentCategory
            ? {
                ...c,
                questions: c.questions.map((q) =>
                  q.title === action.payload.questionTitle
                    ? { ...q, feedback: action.payload.feedback }
                    : q
                ),
              }
            : c
        ),
      };
    case "SET_QUESTION_STATE":
      return {
        ...state,
        currentQuestions: state.currentQuestions.map((q) =>
          q.title === action.payload.questionTitle
            ? { ...q, state: action.payload.state }
            : q
        ),
        categories: state.categories.map((c) =>
          c.title === state.currentCategory
            ? {
                ...c,
                questions: c.questions.map((q) =>
                  q.title === action.payload.questionTitle
                    ? { ...q, state: action.payload.state }
                    : q
                ),
              }
            : c
        ),
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

// Defining our contexts
export const GlobalStateContext = createContext();
export const GlobalDispatchContext = createContext();

// Defining our provider
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalDispatchContext.Provider value={dispatch}>
      <GlobalStateContext.Provider value={state}>
        {children}
      </GlobalStateContext.Provider>
    </GlobalDispatchContext.Provider>
  );
};
