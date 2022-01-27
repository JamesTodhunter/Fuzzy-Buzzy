import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './Modal.css'

export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: "",
            name: "",
            description: "",
        }
            .then(res => {
                if (!res.show) {
                    return null
                }
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="popup">
                <div className='pop-content'>
                    <div className='pop-header'>
                        <span className='close'>x</span>
                        <h5 className='pop-title'>Alter Tome</h5>
                    </div>
                    <div className='pop-body'>
                        <Form>
                            <FormGroup>
                                <Label>Index</Label>
                                <Input
                                    type='text'
                                    name='index'
                                    value={this.state.index}
                                    handleChange={(e) => this.setState({ index: e.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <Label>name</Label>
                                <Input
                                    type='text'
                                    name='name'
                                    value={this.state.name}
                                    handleChange={(e) => this.setState({ name: e.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Index</Label>
                                <Input
                                    type='text'
                                    name='description'
                                    value={this.state.description}
                                    handleChange={(e) => this.setState({ description: e.target.value })} />
                            </FormGroup>
                        </Form>
                    </div>
                    <div className='pop-footer'>
                        <Button className='buttons'>Alter</Button>
                    </div>
                </div>

            </div>
        )
    }
}