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
                    <h1 className="headerTitle">BubbleIdeas</h1>
                </div>

                <div className="body" id="bodyLogin">
                    <div id="login">
                        <div id="loginForms">
                            <input type="email" id="emailLF" className="loginForms" placeholder="example@example.com"/>
                            <input type="password" id="passLF" className="loginForms" placeholder="Input your password"/>
                        </div>
                        <div id="loginButton">
                            <input type="button" id="loginLB" value="Log in"/>
                        </div>
                    </div>
                    <div id="register">
                        <div id="registerForms">
                            <input type="password" className="registerForms" placeholder="Full name"/>
                            <input type="email" className="registerForms" placeholder="example@example.com"/>
                            <input type="password" className="registerForms" placeholder="Input your password"/>
                            <input type="password" className="registerForms" placeholder="Repeat your password"/>
                        </div>
                        <div id="registerButton">
                            <input type="button" id="registerRF" value="Register"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}