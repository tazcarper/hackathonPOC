"use client";
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../src/store/globalStore";
import CategoriesModule from "@/src/store/questionModule";
import styles from "./page.module.css";
import { useContext } from "react";

export default function Home() {
  const state = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);

  const { step, currentCategory } = state;

  const chooseCategory = (category) => {
    dispatch({ type: "SET_CURRENT_CATEGORY", payload: category });
    dispatch({ type: "SET_STEP", payload: "questionsView" });
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>Hack test</div>
      {step === "intro" && (
        <div>
          <p>This is the intro sections</p>
          <button
            onClick={() =>
              dispatch({ type: "SET_STEP", payload: "choose_category" })
            }
          >
            Next
          </button>
        </div>
      )}
      {step === "choose_category" && (
        <div>
          {state.categories.map((category) => {
            return (
              <button onClick={() => chooseCategory(category.title)}>
                {category.title}
              </button>
            );
          })}
        </div>
      )}
      {step === "questionsView" && (
        <div>
          <CategoriesModule />
        </div>
      )}
      {step === "feedback" && (
        <div>
          <h1>All questions done</h1>
          <button
            onClick={() => {
              dispatch({
                type: "RESET_CATEGORY_QUESTIONS",
                payload: currentCategory,
              });
              dispatch({ type: "SET_STEP", payload: "choose_category" });
            }}
          >
            Back to categories
          </button>
        </div>
      )}
      <div className={styles.center}></div>
    </main>
  );
}
