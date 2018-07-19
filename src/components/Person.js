
import React, { Component } from 'react';
import $ from 'jquery';
import { InputComponent } from './InputComponent';
import '../css/App.css';
import PubSub from 'pubsub-js';

import '../css/index.css';
import '../css/pure-min.css';
import '../css/side-menu.css';

export class PersonBox extends Component {

    constructor () {
        super()

        this.state = {list: []}
        this.getPerson();

        PubSub.subscribe('update-list-person', (topico) => {
            this.getPerson();
        })
    }

    getPerson() {
        const url = 'http://localhost:8080/person';
        $.ajax({
            url: url,
            dataType: 'json',
            success: (data) => {
              this.setState({list: data});
            }
        });
    }

    render(){
        return(
            <div>
                <div className="header">
                    <h1>Create Person</h1>
                </div>
                <div className="content" id="content">
                    <PersonForm />
                </div>

                <div className="header">
                    <h1>List Person</h1>
                </div>
                <div className="content" id="content">
                    <PersonList list={this.state.list} />
                </div>
            </div>
            
        )
    }
}

class PersonForm extends Component {

    constructor(){
        super()

        this.state = {
            name: '',
            email: ''
        }
    }

    getUpdateFields(inputName, event) {
        let attribute = {}
        attribute[inputName] =  event.target.value

        this.setState(attribute)
    }

    postForm(event){
        event.preventDefault()

        let data = JSON.stringify({
            name: this.state.name,
            email: this.state.email
        })

        $.ajax({
            url: 'http://localhost:8080/person',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: data,
            success: () => {
                this.setState({name: '', email: ''})
                PubSub.publish('update-list-person')
            }
        })

    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.postForm.bind(this)} >

                  <InputComponent label="Name" id="name" type="text" name="name" 
                    value={this.state.name} onChange={this.getUpdateFields.bind(this, 'name')} />

                  <InputComponent label="Email" id="email" type="email" name="email" 
                    value={this.state.email} onChange={this.getUpdateFields.bind(this, 'email')} />

                  <div className="pure-control-group">
                    <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                  </div>
                </form>
            </div>
        )
    }
}

class PersonList extends Component {

    constructor(){
        super()
    }

    render(){
        return(
            <div className="table">
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>

                        { this.props.list.map(person => {
                            return(
                            <tr key={person.id}>
                                <td className='th-name'>{person.name}</td>
                                <td className='th-email'>{person.email}</td>
                            </tr>)
                        })}

                    </tbody>
                </table>
            </div>
        )
    }
}