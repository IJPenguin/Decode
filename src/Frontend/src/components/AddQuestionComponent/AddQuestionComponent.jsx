import { useState } from "react";
import axios from "axios";

const AddQuestionComponent = () => {
    const [questionTitle, setQuestionTitle] = useState("");
    const [questionBody, setQuestionBody] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [testCases, setTestCases] = useState([{ input: "", output: "" }]);

    const handleAddQuestion = () => {
        const formattedTestCases = testCases.map((testCase) => ({
            input: JSON.parse(testCase.input),
            output: JSON.parse(testCase.output),
        }));

        const data = {
            questionTitle: questionTitle,
            question: questionBody,
            difficulty: difficulty,
            testCases: formattedTestCases,
        };

        axios
            .post(
                "https://1c07-2409-40c4-164-c735-2411-911f-dbc3-83ba.ngrok-free.app/api/add-question",
                data
            )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleAddTestCase = () => {
        setTestCases([...testCases, { input: "", output: "" }]);
    };

    const handleRemoveTestCase = (index) => {
        const updatedTestCases = [...testCases];
        updatedTestCases.splice(index, 1);
        setTestCases(updatedTestCases);
    };

    const handleTestCaseChange = (index, field, value) => {
        const updatedTestCases = [...testCases];
        updatedTestCases[index][field] = value;
        setTestCases(updatedTestCases);
    };

    return (
        <div className="add_question_container">
            <h1 className="add_question_title">Add Question</h1>
            <input
                type="text"
                placeholder="Question Title"
                value={questionTitle}
                onChange={(e) => setQuestionTitle(e.target.value)}
                className="add_question_input"
            />
            <textarea
                placeholder="Question Body"
                value={questionBody}
                onChange={(e) => setQuestionBody(e.target.value)}
                className="add_question_textarea"
            />
            <div className="difficulty_container">
                <p>Difficulty</p>
                <label>
                    <input
                        type="radio"
                        value="Easy"
                        checked={difficulty === "Easy"}
                        onChange={(e) => setDifficulty(e.target.value)}
                    />
                    <span>Easy</span>
                </label>
                <label>
                    <input
                        type="radio"
                        value="Medium"
                        checked={difficulty === "Medium"}
                        onChange={(e) => setDifficulty(e.target.value)}
                    />
                    <span>Medium</span>
                </label>
                <label>
                    <input
                        type="radio"
                        value="Hard"
                        checked={difficulty === "Hard"}
                        onChange={(e) => setDifficulty(e.target.value)}
                    />
                    <span>Hard</span>
                </label>
            </div>
            <h3 className="add_test_case_heading">Test Cases</h3>
            {testCases.map((testCase, index) => (
                <div key={index} className="test_case">
                    <input
                        type="text"
                        placeholder='Input (e.g. "[[1, 2, 3, 1]]")'
                        value={testCase.input}
                        onChange={(e) =>
                            handleTestCaseChange(index, "input", e.target.value)
                        }
                        className="test_case_input"
                    />
                    <input
                        type="text"
                        placeholder='Output (e.g. "true")'
                        value={testCase.output}
                        onChange={(e) =>
                            handleTestCaseChange(
                                index,
                                "output",
                                e.target.value
                            )
                        }
                        className="test_case_input"
                    />
                    <button
                        onClick={() => handleRemoveTestCase(index)}
                        className="remove_test_case_button"
                    >
                        Remove
                    </button>
                </div>
            ))}
            <div className="button_container">
                <button
                    onClick={handleAddTestCase}
                    className="add_test_case_button"
                >
                    + Test Case
                </button>
                <button
                    className="add_question_button"
                    onClick={handleAddQuestion}
                >
                    Add Question
                </button>
            </div>
        </div>
    );
};

export default AddQuestionComponent;
