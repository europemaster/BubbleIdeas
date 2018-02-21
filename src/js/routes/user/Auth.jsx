import React from "react";
import PropType from 'prop-types';
import "./authStyle.scss";
import api from "../../api"

class Input extends React.Component {
    render() {
        console.log("render");
        return <input {...this.props} />
    }
}

class Login extends React.PureComponent {
    constructor() {
        super()
        this.state = {
            email:"",
            password:"",
        };

    }

    static propTypes = {
        onLogin: PropType.func.isRequired
    }

    handlePasswordChange = (e) => {
        this.setState({
            password:e.target.value
        })
    };
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
    };
    handleLogin = (e) => {
        e.preventDefault();

        if (this.state.email === "" || this.state.password === "") {
            if (this.state.password === "") {
                alert("No password submitted");
            } if (this.state.email === "") {
                alert("No email submitted");
            }
            return;
        }

        this.props.onLogin(this.state);
    };
    render() {
        let inputClass = "loginForms";

        if (this.state.email === "Remzita") {
            inputClass += " remzo-run";
        }
        return <form id="login" onSubmit={this.handleLogin}>
            <div id="loginForms">
                <Input type="email" id="emailLF" onChange={this.handleEmail} value={this.state.email} className={inputClass} placeholder="example@example.com"/>
                <Input type="password" onChange={this.handlePasswordChange} value={this.state.password}  id="passLF" className="loginForms" placeholder="Input your password"/>
            </div>
            <div id="loginButton">
                <Input type="submit" onClick={this.handleLogin} id="loginLB" value="Log in"/>
            </div>
        </form>
    }
}

export default class Auth extends React.Component {
    constructor() {
        super()
        this.state = {
            email:"",
            password:""

        };
        this.register = {
            fullName:"",
            email:"",
            pass1:"",
            pass2:""
        }
    }

    handleLogin = (val) => {


        api.login(val).then((val) => {
            alert('Success!');
        }).catch((err)=> {
            alert('Error: ' + err);
        })

    };
    handleRegisterFName = (e) => {
        this.setState({

        })
    };
    handleRegister = (e) => {
        e.preventDefault();

    };

    render() {


        return (
            <div className="cont" id="containerLogin">
                <div className="header" id="headerLoginS">
                    <h1 className="headerTitle">BubbleIdeas</h1>
                </div>

                <div className="body" id="bodyLogin">
                    <Login onLogin={this.handleLogin}  />
                    <div id="register">
                        <div id="registerForms">
                            <Input type="password" className="registerForms" value={this.register.fullName} placeholder="Full name"/>
                            <Input type="email" className="registerForms" value={this.register.email} placeholder="example@example.com"/>
                            <Input type="password" className="registerForms" value={this.register.pass1} placeholder="Input your password"/>
                            <Input type="password" className="registerForms" value={this.register.pass2} placeholder="Repeat your password"/>
                        </div>
                        <div id="registerButton">
                            <Input type="button" id="registerRF" value="Register"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}