import HeroImage from "../../assets/images/hero_image.jpg";

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
