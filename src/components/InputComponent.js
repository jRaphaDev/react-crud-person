import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export class InputComponent extends Component {

    constructor(){
        super()

        this.state = {msgError: ''}
    }

    render(){
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label> 
                <input {...this.props}/>
                <span className="error">{this.state.msgError}</span>
            </div>
        )
    }

    componentDidMount() {

        PubSub.subscribe('error-validation', function(topico, error){
            if (error.field === this.props.name)
                this.setState({msgError: error.defaultMessage})
        }.bind(this));

        PubSub.subscribe('limpa-errors', function(topico, object) {
            this.setState({msgError: ''})
        }.bind(this));

    }
}