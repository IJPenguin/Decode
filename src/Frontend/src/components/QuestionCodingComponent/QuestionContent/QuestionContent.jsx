import axios from "axios";
import React, { useEffect, useState } from "react";

const QuestionContent = ({ num_id }) => {
    const [question, setQuestion] = useState(null);
    useEffect(() => {
        (async () => {
            try {
                const data = axios.get(
                    `https://1c07-2409-40c4-164-c735-2411-911f-dbc3-83ba.ngrok-free.app/api/question-data/${num_id}`,
                    {
                        headers: {
                            "ngrok-skip-browser-warning": "69420",
                        },
                    }
                );
                const response = await data;
                setQuestion(response.data);
                console.log("hehe toooooo");
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const handleDifficultyClass = (difficulty) => {
        switch (difficulty) {
            case "easy":
                return "green";
            case "medium":
                return "yellow";
            case "hard":
                return "red";
            default:
                return "green";
        }
    };

    return (
        <>
            {question && (
                <div className="question_content_container">
                    <h1 className="question_content_title">
                        {question.questionTitle}
                    </h1>
                    <h1
                        className={`question_content_difficulty ${handleDifficultyClass(
                            question.difficulty
                        )}`}
                    >
                        {question?.difficulty?.charAt(0)?.toUpperCase() +
                            question?.difficulty?.slice(1)}
                    </h1>
                    <p className="question_content_description">
                        {question.question}
                    </p>

                    <div className="question_content_input">
                        {question.testCases.map(({ input, output }, index) => {
                            return (
                                <>
                                    <h1 className="test_case_value">
                                        Example Test Case {index + 1}
                                    </h1>
                                    <div className="question_content_input_container">
                                        <span className="question_content_input_title">
                                            Input :
                                        </span>
                                        <span className="question_content_input_description">
                                            [{" "}
                                            {input[0].map((inp, index) => {
                                                return (
                                                    <>
                                                        {inp}
                                                        {index !==
                                                            input[0].length -
                                                                1 && ","}{" "}
                                                    </>
                                                );
                                            })}
                                            ]
                                        </span>
                                        <br />
                                        <span className="question_content_input_title">
                                            Output :
                                        </span>
                                        <span className="question_content_input_description">
                                            [{" "}
                                            {output.map((inp, index) => {
                                                return (
                                                    <>
                                                        {inp}
                                                        {index !==
                                                            output.length - 1 &&
                                                            ","}{" "}
                                                    </>
                                                );
                                            })}
                                            ]
                                        </span>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

export default QuestionContent;
