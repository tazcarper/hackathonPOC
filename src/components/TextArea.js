"use client";

import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../store/globalStore";
import { debounce } from "lodash";

function TextAreaComponent(props) {
  const { required, name, question } = props;
  const [tempValue, setTempValue] = useState(question.answer);
  const dispatch = useContext(GlobalDispatchContext);

  const updateValue = useCallback(
    debounce((val) => {
      if (val !== question.answer) {
        dispatch({
          type: "SET_QUESTION_ANSWER",
          payload: { questionTitle: question.title, answer: val },
        });
      }
    }, 500),
    []
  );

  useEffect(() => {
    // This function will be called when the component unmounts
    return () => {
      updateValue.cancel();
    };
  }, [updateValue]);

  useEffect(() => {
    updateValue.cancel();
    updateValue(tempValue);
    return () => updateValue.cancel();
  }, [tempValue]);

  const handleChange = (event) => {
    setTempValue(event.target.value);
  };

  return (
    <div>
      <textarea
        value={tempValue}
        onChange={handleChange}
        required={required}
        name={name}
      />
    </div>
  );
}

export default TextAreaComponent;
