import '../assets/stylesheets/base.css';
import React from 'react';
//import strings from './Localization';
import Discord from 'discord.js';
import Login from './Login';
import Client from './Client';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: null,
      alert: "Login to Discord"
    }
  }

  componentDidMount = async () => {
    console.log("Logining");
    let token = localStorage["token"];
    if (token) {
      console.log("Got token", token);
      const client = new Discord.Client({ sync: true });
      try {
        let shit = await client.login(token);
        this.setState({ ...this.state, client: client })
        window.Client = client;
        console.log("Success");
      } catch (err) {
        this.setState({ ...this.state, alert: "Please login again" })
        console.log(this.state);
        console.log("Wrong token");
      }
    } else {
      this.setState({ ...this.state, alert: "Login to Discord" })
      console.log("Welcome");
    }
  }

  // logged() {
  //   //this.props.name = "You are logged in";

  //   this.forceUpdate();
  // }

  render() {
    window.Discord = Discord;
    console.log(1, this.state.client);
    return (
      <div>
        <h1>{this.props.name}</h1>
        { this.state.client ? 
          <Client client={this.state.client}/>
          :
          <Login logged={this.componentDidMount} alert={this.state.alert}/>
        }
      </div>
    );
  }
}

export default App;
