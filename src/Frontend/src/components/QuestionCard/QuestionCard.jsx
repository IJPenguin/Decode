const QuestionCard = ({ title, difficulty, number }) => {
    return (
        <div className="question_card">
            <h1 className="question_card_number">{number}</h1>
            <a
                href={`/api/questions/:${number}`}
                className="question_card_title"
            >
                {title[0].toUpperCase() + title.slice(1)}
            </a>
            <h1 className="question_card_difficulty">
                {difficulty[0].toUpperCase(0) + difficulty.slice(1)}
            </h1>
        </div>
    );
};

export default QuestionCard;
