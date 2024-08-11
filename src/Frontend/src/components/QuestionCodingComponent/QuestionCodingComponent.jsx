import QuestionContent from "./QuestionContent/QuestionContent";

const QuestionCodingComponent = ({ num_id }) => {
    return (
        <div className="question_coding_component_container">
            <QuestionContent num_id={num_id} />
        </div>
    );
};

export default QuestionCodingComponent;
