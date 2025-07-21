"use client";
import { useRouter } from "next/navigation";
import { useAnswer } from "@/app/context/AnswerContext";
import { use } from "react";

const questions = [
  {
    question: "What's your favorite flavor?",
    options: ["Sweet", "Bitter", "Sour", "Salty"],
  },
  {
    question: "What's your ideal drink time?",
    options: ["Morning", "Afternoon", "Evening", "Night"],
  },
  {
    question: "Pick a Malaysian dessert:",
    options: ["Cendol", "Ais Kacang", "Kuih Lapis", "Pisang Goreng"],
  },
  {
    question: "Preferred drink texture?",
    options: ["Smooth", "Icy", "Creamy", "Fizzy"],
  },
  {
    question: "Your go-to Malaysian hangout spot?",
    options: ["Mamak", "Café", "Pasar Malam", "Beach"],
  },
];

export default function QuestionPage({ params }) {
    const router = useRouter();
    const { addAnswer } = useAnswer();
    const { id } = use(params);
    const questionId = parseInt(id);
    const question = questions[questionId - 1];

    const handleClick = (option) => {
      // save answer
      addAnswer(option);
      if (questionId < questions.length) {
        router.push(`/question/${questionId + 1}`);
      } else {
        router.push("/completed");
      }
    };

    if (!question) return <p className="text-center">Question not found</p>;

    return (
      <div className="min-h-screen w-[600px] mx-auto bg-white flex flex-col justify-center items-center p-8 text-center text-black gap-6">
        <h1 className="text-xl font-bold">{question.question}</h1>
        <div className="flex flex-col gap-3 w-full">
          {question.options.map((option, index) => (
          <button
            key={index}
            className="bg-black text-white py-2 rounded-lg"
            onClick={() => handleClick(option)}
          >
            {option}
          </button>
          ))}
        </div>
      </div>
    )

}