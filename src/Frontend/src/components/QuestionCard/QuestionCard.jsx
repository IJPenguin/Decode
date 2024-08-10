const QuestionCard = ({ title, difficulty, content }) => {
    return (
        <div className="QuestionCard">
            <h1>{title}</h1>
            <h2>{difficulty}</h2>
            <p>{content}</p>
        </div>
    );
};

export default QuestionCard;
