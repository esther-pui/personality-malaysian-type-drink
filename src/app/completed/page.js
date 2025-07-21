"use client";
import { useAnswer } from "@/app/context/AnswerContext";

export default function CompletedPage() {
  const { answers } = useAnswer();

  if (answers.length === 0) {
    return (
      <div className="min-h-screen w-[600px] mx-auto bg-white text-black flex flex-col justify-center items-center p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">You’ve completed the questionnaire!</h1>
        <p className="text-lg text-red-500">Oops! No answers recorded.</p>
        <p className="mt-4">Please retake the quiz.</p>
      </div>
    );
  }

  const frequencyMap = answers.reduce((acc, answer) => {
    acc[answer] = (acc[answer] || 0) + 1;
    return acc;
  }, {});

  const topEntry = Object.entries(frequencyMap).reduce((a, b) =>
    a[1] >= b[1] ? a : b
  );

  const topAnswer = topEntry[0];
  return (
    <div className="min-h-screen w-[600px] mx-auto bg-white text-black flex flex-col justify-center items-center p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">You’ve completed the questionnaire!</h1>
      <p className="text-lg">🎉 Thank you for participating!</p>
      <p className="mt-6 text-xl">
        Based on your answers, you are most like:{" "}
        <span className="font-bold">{topAnswer}</span>
      </p>
    </div>
  );
}
