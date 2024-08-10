import HeroImage from "../../assets/images/hero_image.jpg";
import Button from "../Button/Button";

const HeroSection = () => {
    return (
        <div className="hero_section_container">
            <div className="hero_section_text">
                <h1 className="hero_section_heading">
                    Elevate Your Coding Skills Anytime, Anywhere
                </h1>
                <p className="hero_section_subheading">
                    Join our community of passionate developers. Solve
                    challenges, compete with peers, and refine your coding
                    skills with our powerful tools
                </p>
                <Button
                    text="Get Started"
                    classNames="hero_section_button"
                    clickHandler={() => {
                        window.location.href = "/register";
                    }}
                />
            </div>
            <div className="hero_section_image">
                <img
                    src={HeroImage}
                    alt="Hero"
                    className="hero_section_image"
                />
            </div>
        </div>
    );
};

export default HeroSection;
