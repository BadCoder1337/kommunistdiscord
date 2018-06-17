import React from 'react';
import Discord from 'discord.js';

class Client extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            client: props.client
        }
    }
    render() {
        return (
            <div>
                <h2>Welcome comrade {this.state.client.user.tag}</h2>
                <h3>KGB found you at {this.state.client.guilds.array().length} guilds</h3>
            </div>
        )        
    }
}

export default Client;