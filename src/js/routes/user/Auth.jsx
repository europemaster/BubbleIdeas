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
        super();
        this.state = {
            email:"",
            password:"",
        };

    };

    static propTypes = {
        onLogin: PropType.func.isRequired
    };

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

class Register extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            fullName: "",
            email: "",
            pass1: "",
            pass2: "",
        };

    };

    static propTypes = {
        onRegister: PropType.func.isRequired
    };
    handleRegister = (e) => {
        e.preventDefault();

        if (this.state.fullName === "" || this.state.email === "" || this.state.pass1 === "" || this.state.pass2 === "") {
            alert("Fill all the forms!")
            return;
        }
        if (this.state.pass1 !== this.state.pass2) {
            alert("Passwords do not match!")
        }

        this.props.onRegister(this.state);
    };
    render() {
        let inputClass = "registerForms";

        return <form id="register" onSubmit={this.handleRegister}>
            <div id="registerForms">
                <Input type="text" className={inputClass} value={this.state.fullName} onChange={this.handleRegister} placeholder="Full name"/>
                <Input type="email" className={inputClass} value={this.state.email} onChange={this.handleRegister} placeholder="example@example.com"/>
                <Input type="password" className={inputClass} value={this.state.pass1} onChange={this.handleRegister} placeholder="Input your password"/>
                <Input type="password" className={inputClass} value={this.state.pass2} onChange={this.handleRegister} placeholder="Repeat your password"/>
            </div>
            <div id="registerButton">
                <Input type="submit" id="registerRF" value="Register"/>
            </div>
        </form>
    }
}


export default class Auth extends React.Component {
    constructor() {
        super();
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
    handleRegister = (val) => {
        api.register(val).then((val) => {
            alert('Success!');
        }).catch((err)=> {
            alert('Error: ' + err);
        })
    };

    render() {
        return (
            <div className="cont" id="containerLogin">
                <div className="header" id="headerLoginS">
                    <h1 className="headerTitle">BubbleIdeas</h1>
                </div>

                <div className="body" id="bodyLogin">
                    <Login onLogin={this.handleLogin}  />
                    <Register onRegister={this.handleRegister}/>
                </div>
            </div>
        );
    }
}