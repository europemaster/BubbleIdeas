import React from "react";
import "./authStyle.scss";

export default class Auth extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "Register or login"
        };
    }
    render() {
        return (
            <div className="cont" id="containerLogin">
                <div className="header" id="headerLoginS">
                    <h1>BubbleIdeas</h1>
                </div>
                <div className="body" id="bodyLogin">
                    <div id="login">
                        <div id="loginForms">
                            <input type="email" placeholder="example@example.com"/>
                            <input type="password" placeholder="Input your password"/>
                        </div>
                        <div id="loginButton">
                            <input type="button" value="Log in"/>
                        </div>
                    </div>
                    <div id="register">
                        <div id="registerForms">
                            <input type="password" placeholder="Full name"/>
                            <input type="email" placeholder="example@example.com"/>
                            <input type="password" placeholder="Input your password"/>
                            <input type="password" placeholder="Repeat your password"/>
                        </div>
                        <div id="registerButton">
                            <input type="button" value="Register"/>               
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}