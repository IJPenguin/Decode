import Layout from "../../components/Layout/Layout";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
const Questionpage = () => {
    return (
        <Layout>
            <QuestionCard
                title="Question 1"
                difficulty="Easy"
                content="This is the content of question 1"
            />
            <QuestionCard
                title="Question 2"
                difficulty="Medium"
                content="This is the content of question 2"
            />
            <QuestionCard
                title="Question 3"
                difficulty="Hard"
                content="This is the content of question 3"
            />
        </Layout>
    );
};

export default Questionpage;
