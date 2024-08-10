const Button = ({ text, clickHandler, classNames }) => {
    return (
        <button className={classNames} onClick={clickHandler}>
            {text}
        </button>
    );
};

export default Button;
