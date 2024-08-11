import axios from "axios";
import QuestionCard from "../QuestionCard/QuestionCard";
import { useState, useEffect } from "react";

const QuestionsComponent = () => {
    const [questions, setQuestions] = useState([]);

    const getQuestions = async () => {
        try {
            const response = await axios.get(
                "https://1c07-2409-40c4-164-c735-2411-911f-dbc3-83ba.ngrok-free.app/api/questions",
                {
                    headers: {
                        "ngrok-skip-browser-warning": "69420",
                    },
                }
            );
            console.log("hehe");
            console.log(response.data);
            setQuestions(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getQuestions();
    }, []);

    return (
        <div className="question_page_container">
            <h1 className="question_page_title">Questions</h1>
            <div className="question_add_question">
                <a href="/addquestion" className="question_add_question_link">
                    Add Question
                </a>
            </div>
            <div className="question_card_container">
                {questions.map((question) => (
                    <QuestionCard
                        key={question.questionNumber}
                        title={question.questionTitle}
                        difficulty={question.difficulty}
                        number={question.questionNumber}
                    />
                ))}
            </div>
        </div>
    );
};

export default QuestionsComponent;
