"use client";
import { useAnswer } from "@/app/context/AnswerContext";
import { useRef } from "react";
import html2canvas from "html2canvas";

export default function CompletedPage() {
  const { answers } = useAnswer();
  const resultRef = useRef(null);

  const handleShareImage = async () => {
    if (!resultRef.current) return;

    const canvas = await html2canvas(resultRef.current, {
      scale: 2, // make it crisp for retina
      useCORS: true, // allow images with cross-origin
    });
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    const file = new File([blob], "quiz-result.png", { type: "image/png" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "Quiz Result",
          text: "Check out my result!",
        });
      } catch (err) {
        console.error("Sharing failed:", err);
      }
    } else {
      alert("Your browser does not support native sharing.");
    }
  };

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
    <div className="min-h-screen bg-white text-black flex flex-col justify-center items-center p-8 text-center">
      <div ref={resultRef} className="w-[600px] bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">You’ve completed the questionnaire!</h1>
        <p className="text-lg">🎉 Thank you for participating!</p>
        <p className="mt-6 text-xl">
          Based on your answers, you are most like:{" "}
          <span className="font-bold">{topAnswer}</span>
        </p>
      </div>

      <button
        onClick={handleShareImage}
        className="mt-6 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
      >
        Share to Instagram
      </button>
    </div>
  );
}
