import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Contests from "./pages/Contestpage.jsx";
import Questions from "./pages/Questionspage.jsx";
import Userpage from "./pages/Userpage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AddQuestionpage from "./pages/Addquestionpage.jsx";
import Codingpage from "./pages/Codingpage.jsx";
import QuestionPage from "./pages/Questionpage.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route path="/contests" element={<Contests />} />
                <Route path="/questions" element={<Questions />} />
                <Route path="/user" element={<Userpage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/addquestion" element={<AddQuestionpage />} />
                <Route path="/coding" element={<Codingpage />} />
                <Route
                    path="/questioninfo/:num_id"
                    element={<QuestionPage />}
                />
            </Routes>
        </Router>
    );
}

export default App;
