import React from 'react';
//import strings from './Localization';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import '../assets/stylesheets/base.css'
import '../assets/stylesheets/login.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: localStorage["email"] || "",
            password: "",
            mfa: ""
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        window.that = this;
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange(event) {
        //event.target.id == "email" ? localStorage["email"] = event.target.value :
        this.setState({
            ...this.state,
            [event.target.id]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
            let login = await (await fetch("https://discordapp.com/api/v6/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })).json();
            if (login.token) {
                localStorage["token"] = login.token;
                this.props.logged()
            } else {
                let mfa = await (await fetch("https://discordapp.com/api/v6/auth/mfa/totp", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        code: this.state.mfa,
                        ticket: login.ticket
                    })
                })).json();
                localStorage["token"] = mfa.token;
                localStorage["email"] = this.state.email;
                this.props.logged()
            }
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            placeholder="carlmarx@ussr.su"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            type="password"                            
                            placeholder="leninstestament"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="mfa" bsSize="small">
                        <ControlLabel>MFA Code</ControlLabel>
                        <FormControl
                            type="number"                           
                            placeholder="011924"
                            value={this.state.mfa}
                            onChange={this.handleChange} 
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        {this.props.alert}
                    </Button>
                </form>
            </div>
        )
    }
}

export default Login;