import React from "react";
import "./authStyle.scss";

class Input extends React.Component {
    render() {
        console.log("render");
        return <input {...this.props} />
    }
}


export default class Auth extends React.Component {
    constructor() {
        super();
        this.state = {
            email:"",
            password:""
        };
    }
    handlePasswordChange = (e) => {
        this.setState({
            password:e.target.value
        })
    }
    handleLogin = (e) => {
        e.preventDefault();
        alert(this.state.password);
    }
    handleEmail = (e) => {
        if (e.target.value.startsWith("remzo")) {
            this.setState({
                email:"Remzita"
            })

        }
        else {
            this.setState({
                email:e.target.value
            })
        }

    }
    render() {
        let inputClass = "loginForms";

        if (this.state.email === "Remzita") {
            inputClass += " remzo-run";
        }

        return (
            <div className="cont" id="containerLogin">
                <div className="header" id="headerLoginS">
                    <h1 className="headerTitle">BubbleIdeas</h1>
                </div>

                <div className="body" id="bodyLogin">
                    <form id="login" onSubmit={this.handleLogin}>
                        <div id="loginForms">
                            <Input type="email" id="emailLF" onChange={this.handleEmail} value={this.state.email} className={inputClass} placeholder="example@example.com"/>
                            <Input type="password" onChange={this.handlePasswordChange} value={this.state.password}  id="passLF" className="loginForms" placeholder="Input your password"/>
                        </div>
                        <div id="loginButton">
                            <input type="submit" id="loginLB" value="Log in"/>
                        </div>
                    </form>
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