"use client";
import { useAnswer } from "@/app/context/AnswerContext";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";

export default function CompletedPage() {
  const { answers } = useAnswer();
  const resultRef = useRef(null);
  const [status, setStatus] = useState("");

  const handleShareImage = async () => {
    if (!resultRef.current) return;

    setStatus("Preparing image...");

    try {
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        useCORS: true,
      });

      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      const file = new File([blob], "quiz-result.png", { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Quiz Result",
          text: "Check out my result!",
        });
        setStatus("✅ Shared successfully!");
      } else {
        // Fallback to download
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "quiz-result.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setStatus("⚠️ Sharing not supported, image downloaded instead.");
      }
    } catch (err) {
      console.error("Error during sharing:", err);
      setStatus("❌ Something went wrong. Try again.");
    }
  };

  if (answers.length === 0) {
    return (
      <div className="min-h-screen w-full max-w-md mx-auto bg-white text-black flex flex-col justify-center items-center p-8 text-center">
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
    <div className="min-h-screen bg-white text-black flex flex-col justify-center items-center p-6 text-center">
      <div
        ref={resultRef}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
      >
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

      {status && (
        <p className="mt-4 text-sm text-gray-600 whitespace-pre-wrap">{status}</p>
      )}
    </div>
  );
}
