import { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';


export default class Crud extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            index: "",
            name: "",
            desc: "",

        }
    };


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8080/fuzzy/save`, {
            method: 'POST',
            body: JSON.stringify({ log: this.state }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res) => res.json())
            .then((spellData) => {
                this.props.updateDndArray();
                this.setState({
                    id: '',
                    index: '',
                    name: '',
                    description: ''

                })
            })
    }

    // componentWillUnmount() {
    //     this.getCrud()
    // }

    // getCrud = () => {
    //     fetch("http:localhost:8080/fuzzy/read", {
    //         method: 'GET',
    //         headers: new Headers({
    //             'Content-Type': 'apllication/json',
    //             'Authorization': this.props.token
    //         })
    //     })
    //         .then((res) => res.json())
    //         .then((spellData) => {
    //             return this.setState({ dnd: spellData })
    //         })
    // }




    render() {
        return (
            <div>
                <hr />

            </div >
        )
    }
}


