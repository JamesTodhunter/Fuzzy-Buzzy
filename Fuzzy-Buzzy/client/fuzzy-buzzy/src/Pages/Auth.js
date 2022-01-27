import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";



export default class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""

        }
    };


    title = () => {
        return !this.state.login ? "Signup" : "Login";
    };

    loginToggle = (e) => {
        e.preventDefault();
        this.setState({
            login: !this.state.login,
            email: "",
            password: "",
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let reqBody = {
            user: {
                email: this.state.email,
                password: this.state.password,
            },
        }

        let url = this.state.login
            ? "http://localhost:8080/user/login"
            : "http://localhost:8080/user/register";
        fetch(url, {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: new Headers({
                "Content-Type": "application/json",
                // Authorization: `Bearer ${localStorage.getItem('token')}`
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                this.props.setToken(data.sessionToken)
            })
            .catch((err) => console.log(err));
    };

    render() {
        return (
            <Form className="login-form">
                <Button color="danger" onClick={this.loginToggle}>Login/Signup</Button>
                <br />
                <h1>{this.title()}</h1>
                <FormGroup>

                    <Label>Email</Label>
                    <Input
                        type="email"
                        id="email"
                        value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value })}
                    />
                </FormGroup>
                <FormGroup>

                    <Label>Password</Label>
                    <Input
                        type="password"
                        id="password"
                        value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value })}
                    />
                </FormGroup>

                <Button color="success"
                    type="submit"
                    onClick={this.handleSubmit}

                >
                    <Link to="/home">Creat User/ Login</Link>
                </Button>
                {/*<div className="text-center">
                <a href="/forgot-password">Forgot Password?</a>*/}
            </Form >
        );
    };

}
