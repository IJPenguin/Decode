import Card from "../Card/Card";
import CodeIcon from "../../assets/images/code_icon.svg";
import LibraryIcon from "../../assets/images/library_icon.svg";
import TrophyIcon from "../../assets/images/trophy_icon.svg";

const FeaturesSection = () => {
    const content1 =
        "Test and refine your code with real-time feedback and performance metrics. Input your data and see results instantly!";
    const content2 =
        "Solve coding challenges from our extensive library or contribute your own questions and test cases.";
    const content3 =
        "Compete in coding contests, track your progress on the leaderboard, and host your own challenges.";

    const heading1 = "Code Playground";
    const heading2 = "Challenge Library";
    const heading3 = "Code Battlegrounds";
    return (
        <div className="features_section_container">
            <h1 className="features_section_heading">
                Experience the Power of Our Platform
            </h1>
            <div className="features_cards_container">
                <Card
                    heading={heading1}
                    content={content1}
                    icon={
                        <img
                            src={CodeIcon}
                            alt="Code Playground"
                            className="features_card_icon
                    "
                        />
                    }
                    classNames="features_section_card"
                />
                <Card
                    heading={heading2}
                    content={content2}
                    icon={
                        <img
                            src={LibraryIcon}
                            alt="Challenge Library"
                            className="features_card_icon
                    "
                        />
                    }
                    classNames="features_section_card"
                />
                <Card
                    heading={heading3}
                    content={content3}
                    icon={
                        <img
                            src={TrophyIcon}
                            alt="Code Battlegrounds"
                            className="features_card_icon
                    "
                        />
                    }
                    classNames="features_section_card"
                />
            </div>
        </div>
    );
};

export default FeaturesSection;
