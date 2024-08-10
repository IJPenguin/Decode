const Card = ({ heading, content, icon, classNames }) => {
    return (
        <div className={classNames}>
            <h2 className="card_heading">{heading}</h2>
            <div className="card_icon">{icon}</div>
            <p className="card_content">{content}</p>
        </div>
    );
};

export default Card;
