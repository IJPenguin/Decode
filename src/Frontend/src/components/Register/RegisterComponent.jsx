import React, { useState } from "react";
import axios from "axios";
import LoginImage from "../../assets/images/login_image.jpg";

const RegisterComponent = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameVal, setNameVal] = useState(0);
    const [emailVal, setEmailVal] = useState(0);
    const [passwordVal, setPasswordVal] = useState(0);

    const handleRegister = (name, email, password) => {
        const data = {
            name: name,
            email: email,
            password: password,
        };
        axios
            .post(
                "https://1c07-2409-40c4-164-c735-2411-911f-dbc3-83ba.ngrok-free.app/auth/register",
                data
            )
            .then((response) => {
                localStorage.setItem("userId", response.data.user.id);
                localStorage.setItem("name", response.data.user.name);
                localStorage.setItem("loggedIn", true);
                window.location.href = "/";
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const nameChangeHandler = (e) => {
        setName(e.target.value);
        setNameVal((prev) => prev + 1);
    };

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
        setEmailVal((prev) => prev + 1);
    };

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
        setPasswordVal((prev) => prev + 1);
    };

    return (
        <div className="login_page">
            <img src={LoginImage} alt="Login" className="login_page_image" />
            <div className="login_page_text">
                <h1 className="login_page_title">Welcome to DeCode</h1>
                <p className="login_page_description">
                    DeCode is a platform where you can practice coding and
                    participate in contests. <br /> Join us now!
                </p>
            </div>
            <div className="login_form_container">
                <h1 className="login_form_title">Register</h1>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={nameChangeHandler}
                    className={`login_form_input login_form_name ${
                        nameVal > 0 ? (name === "" ? "error" : "ok") : ""
                    }`}
                />

                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={emailChangeHandler}
                    className={`login_form_input login_form_email ${
                        emailVal > 0
                            ? email === "" || !email.includes("@")
                                ? "error"
                                : "ok"
                            : ""
                    }`}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className={`login_form_input login_form_password ${
                        passwordVal > 0
                            ? password === ""
                                ? "error"
                                : "ok"
                            : ""
                    }`}
                    value={password}
                    onChange={passwordChangeHandler}
                />
                <button
                    className="login_form_button"
                    onClick={() => handleRegister(name, email, password)}
                >
                    Register
                </button>
                <span>
                    Already have an account?{" "}
                    <a href="/login" className="login_form_link">
                        Login
                    </a>
                </span>
            </div>
        </div>
    );
};

export default RegisterComponent;
