const QuestionCard = ({ title, difficulty, number }) => {
    return (
        <div className="question_card">
            <h1 className="question_card_number">{number}</h1>
            <a href={`/:${number}`}>{title}</a>
            <h1 className="question_card_difficulty">{difficulty}</h1>
        </div>
    );
};

export default QuestionCard;
