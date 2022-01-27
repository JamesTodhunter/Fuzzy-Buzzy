import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Spells from '../Spells'
import './Dnd.css'
// import Table from '../Table-2'




export default class DndItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            spell: "",
            query: "",
            index: "",
            name: "",
            description: "",
            editUserId: "",
            dndId: ""
        }
    }
    async componentDidMount() {
        const url = `https://www.dnd5eapi.co/api/spells/${this.state.query}`;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ spell: data })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    updateFetch = () => {
        fetch(`https://www.dnd5eapi.co/api/spells/${this.state.spell}`)
            .then(res => {
                return res.json();
            })
            .then(json => {
                this.setState({
                    index: json.index,
                    name: json.name,
                    description: json.desc[0]
                })
                console.log(json);
            })
            .catch(err => console.log(err))
    }


    // spell = (spellData) => {
    //     this.setState({
    //         id: spellData.id,
    //         index: spellData.index,
    //         name: spellData.name,
    //         description: spellData.desc
    //     })
    // }




    handleSubmit = (userId) => {
        console.log(this.state);
        fetch(`http://localhost:8080/fuzzy/save`, {
            method: 'POST',
            body: JSON.stringify({ dnd: { index: this.state.index, name: this.state.name, description: this.state.description } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        })
            .then((res) => {
                console.log(res);
                if (!res.ok) {
                    throw Error(`no fetch for you`);
                }
            })
            .then(data => {
                this.setState({
                    data: data,
                    editUserId: userId,
                    dndId: data.results.id

                })
            })
            // .then((spellData) => {
            //     this.spell(spellData)

            //     console.log("Works");
            // })
            .catch(err => {
                console.log(err.message);
                console.log("error");
            })

    }






    render() {
        return (
            <div >
                <div className='spell'>
                    <Form className='tome'>
                        <FormGroup>
                            <Label>Search for Spell:</Label>
                            <Input type="text" name="spell" value={this.props.spell}
                                onChange={this.handleChange} />
                            <Button color='success'
                                onClick={this.updateFetch}>
                                Get Spell
                            </Button>
                        </FormGroup>
                    </Form>
                    <Form className='save spell'>
                        <FormGroup>
                            <Label>Index</Label>
                        </FormGroup>
                        <Input
                            type="text"
                            id="spell"
                            name="spell"
                            value={this.state.index /*? this.state.spell.index : ""*/}
                            onChange={this.handleChange}
                        />
                        <FormGroup>
                            <hr />
                            <Label>Name</Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                value={this.state.name /*? this.state.spell.name : ""*/}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup className='desc'>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                id="desc"
                                name="description"
                                value={this.state.description /*? this.state.spell.desc : ""*/}
                                onChange={this.handleChange}
                            />
                            <br />
                        </FormGroup>
                    </Form>

                    {/* <Table /> */}
                    <Button color='success'
                        type="submit"
                        onClick={this.handleSubmit}
                    >
                        Create Tome!
                    </Button>
                    <br />
                    <br />
                    <Spells />
                </div>
            </div >
        );
    }
};

