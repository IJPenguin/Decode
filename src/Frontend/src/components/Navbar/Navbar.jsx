import { useState } from "react";

const Navbar = () => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    const [username, setUsername] = useState(
        localStorage.getItem("name").charAt(0).toUpperCase() +
            localStorage.getItem("name").slice(1)
    );

    const logout = () => {
        localStorage.setItem("loggedIn", false);
        localStorage.setItem("name", "");
        localStorage.setItem("userId", "");
        window.location.href = "/";
    };

    return (
        <nav className="navbar">
            <ul className="navbar_list">
                <li className="navbar_list_item">DeCode</li>
                <div className="navbar_list_item_container">
                    <li className="navbar_list_item">
                        <a href="/contests" className="navbar_list_item_link">
                            Contests
                        </a>
                    </li>
                    <li className="navbar_list_item">
                        <a href="/questions" className="navbar_list_item_link">
                            Questions
                        </a>
                    </li>
                    {loggedIn ? (
                        <li className="navbar_list_item">
                            <a
                                href="/user"
                                className="navbar_list_item_link navbar_list_user"
                            >
                                {username}
                            </a>
                            <a
                                href="/"
                                onClick={logout}
                                className="navbar_list_item_link"
                            >
                                Logout
                            </a>
                        </li>
                    ) : (
                        <li className="navbar_list_item">
                            <a
                                href="/login"
                                className="navbar_list_item_link navbar_list_login"
                            >
                                Login
                            </a>
                        </li>
                    )}
                </div>
            </ul>
        </nav>
    );
};

export default Navbar;
