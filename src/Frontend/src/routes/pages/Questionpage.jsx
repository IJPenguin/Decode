import CodeEditor from "../../components/CodeEditor/CodeEditor";
import Layout from "../../components/Layout/Layout";
import QuestionCodingComponent from "../../components/QuestionCodingComponent/QuestionCodingComponent";
import { useParams } from "react-router-dom";

const Questionpage = () => {
    const { num_id } = useParams();
    return (
        <Layout>
            <>
                <QuestionCodingComponent num_id={num_id} />
                <CodeEditor />
            </>
        </Layout>
    );
};

export default Questionpage;
