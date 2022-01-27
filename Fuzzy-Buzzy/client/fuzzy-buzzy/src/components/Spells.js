import React, { Component } from 'react';
import { Table, Button, Container, Row, Col } from 'reactstrap';
import './Spells.css';

export default class myItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            index: "",
            name: "",
            description: "",
            editUserId: "",
            dndId: "",
            // userId: 
            open: true,
            tome: [],
            updatePressed: false,
            tomeToUpdate: {}



        }
    }

    displayTomes = () => {
        console.log(this.state);
        fetch(`http://localhost:8080/fuzzy/read`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw Error(`no reading for you`);
                }
                return res.json()
            })
            .then(data => {
                console.log(data);
                this.setState({
                    data: data,
                    // editUserId: userId,
                    dndId: data.id

                })

            })
            .catch(err => {
                console.log(err.message);
                console.log("error");
            })


    }
    componentDidMount() {
        this.displayTomes()
    }

    updateTome = (event, tome) => {
        console.log(this.state);  //Tracker=
        fetch(`http://localhost:8080/fuzzy/update/${event.target.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                dnd: {
                    index: tome.index,
                    name: tome.name,
                    description: tome.description
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        })
            .then((res) => {
                this.setState({ updatedTome: false })
                this.fetchTome();
                if (!res.ok) {
                    throw Error(`no update for you`);
                }

            })
            .catch(err => {
                console.log(err.message);
                console.log("error");
            })

    }

    componentWillUnmount() {
        this.setState({
            id: this.props.tome.id
        })
    }

    updatedTome = (event, tome) => {
        this.setState({
            tomeToUpdate: tome,
            updatePressed: true
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.update(event, this.state)
    }


    deleteTome = (e) => {
        fetch(`http://localhost:8080/fuzzy/${e.target.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        })
            .then(res => res.json())
    }


    render() {
        return (
            <div>
                <Table bordered>
                    <thead className='tome'>
                        <tr>

                            {this.state.data.map((tome) => {
                                return (
                                    <>
                                        <h1>{tome.index}</h1>
                                        <hr />
                                        <h1>{tome.name}</h1>
                                        <hr />
                                        <h1>{tome.description}</h1>

                                        <Button id={tome.id} onClick={(e) => {
                                            this.updateTome(e, tome);

                                        }
                                        }
                                            color="warning">Alter Tome </Button>
                                        <Button id={tome.id} onClick={(e) => this.deleteTome(e)}
                                            color="danger">Destory Tome</Button>
                                    </>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </Table>
                <br />
                <br />
                <br />
                <br />

            </div >
        )
    }
}