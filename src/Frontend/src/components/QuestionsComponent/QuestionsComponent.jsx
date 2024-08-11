import axios from "axios";
import QuestionCard from "../QuestionCard/QuestionCard";
import { useState, useEffect } from "react";

const QuestionsComponent = () => {
    const [questions, setQuestions] = useState([]);

    const getQuestions = async () => {
        try {
            const response = await axios.get(
                "https://1c07-2409-40c4-164-c735-2411-911f-dbc3-83ba.ngrok-free.app/api/questions"
            );
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
            <div className="question_card_container">
                {questions.map((question) => (
                    <QuestionCard
                        key={question.number}
                        title={question.title}
                        difficulty={question.difficulty}
                        number={question.number}
                    />
                ))}
            </div>
        </div>
    );
};

export default QuestionsComponent;
