"use client";
import { createContext, useContext, useState } from "react";

const AnswerContext = createContext();

export function AnswerProvider({ children }) {
  const [answers, setAnswers] = useState([]);

  const addAnswer = (answer) => {
    setAnswers((prev) => [...prev, answer]);
  };

  return (
    <AnswerContext.Provider value={{ answers, addAnswer }}>
      {children}
    </AnswerContext.Provider>
  );
}

export function useAnswer() {
  return useContext(AnswerContext);
}
