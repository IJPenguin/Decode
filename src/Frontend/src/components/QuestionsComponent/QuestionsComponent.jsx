import axios from "axios";
import QuestionCard from "../QuestionCard/QuestionCard";

const QuestionsComponent = () => {
    return (
        <div>
            <QuestionCard
                title={"title 1"}
                difficulty={"easy"}
                content={"content1"}
            />
            <QuestionCard
                title={"title 2"}
                difficulty={"medium"}
                content={"content2"}
            />
            <QuestionCard
                title={"title 3"}
                difficulty={"hard"}
                content={"content3"}
            />
        </div>
    );
};

export default QuestionsComponent;
