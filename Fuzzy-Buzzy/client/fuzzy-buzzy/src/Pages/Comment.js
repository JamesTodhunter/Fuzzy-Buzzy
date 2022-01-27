import { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Table } from 'reactstrap';
import './Comment.css'


export default class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            title: "",
            date: "",
            entry: "",
            userId: "",
            dndId: ""
        }
    };

    comment = () => {
        return !this.state.comment

    }



    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state);
        fetch(`http://localhost:8080/comment/create`, {
            method: "POST",
            body: JSON.stringify({ comment: { title: this.state.title, date: this.state.date, entry: this.state.entry } }),
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: localStorage.getItem('token')
            })
        })
            .then(res => {
                console.log(res);
                if (!res.ok) {
                    throw Error(`no comment for you`)
                }
            })

            .catch(err => {
                console.log(err.message);
                console.log("error");
            })
    }

    displayScrolls = (userId) => {
        fetch(`http://localhost:8080/comment/entry/${userId}`, {
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
                    dndId: data.id,
                    commentId: data.id

                })

            })
            .catch(err => {
                console.log(err.message);
                console.log("error");
            })


    }
    componentDidMount() {
        this.displayScrolls()
    }

    updateScroll = (e, scroll) => {
        console.log(this.state);  //Tracker=
        fetch(`http://localhost:8080/comment/update/${e.target.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                dnd: {
                    tilte: scroll.title,
                    date: scroll.date,
                    entry: scroll.entry
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            })
        })
            .then((res) => {
                if (!res.ok) {
                    throw Error(`no update for you`);
                }
            })
            .then(data => {
                this.setState({
                    data: data,
                    dndId: data.results.id

                })
            })
            .catch(err => {
                console.log(err.message);
                console.log("error");
            })
    }



    deleteScroll = (e) => {
        fetch(`http://localhost:8080/comment/${e.targert.id}`, {
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
            <div className="scroll">
                <Form >
                    <FormGroup className="scrolls">
                        <Label>Title</Label>
                        <Input
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={(e) => this.setState({ title: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup className="scrolls">
                        <Label>Date</Label>
                        <Input
                            type="date"
                            name="calender"
                            value={this.state.date}
                            onChange={(e) => this.setState({ date: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup className="scrolls">
                        <Label>Entry</Label>
                        <Input
                            type="text"
                            id="entry"
                            name="entry"
                            value={this.state.entry}
                            onChange={(e) => this.setState({ entry: e.target.value })}
                        />
                    </FormGroup>
                    <Button color='success'
                        type="submit"
                        onClick={this.handleSubmit}

                    >
                        Create Scroll
                    </Button>

                    <Table className="scrollss">
                        <thead>
                            <tr>
                                <th>Scrolls</th>
                                {this.state.data.map((scroll) => {
                                    return (
                                        <>
                                            <h1>{scroll.title}</h1>
                                            <h1>{scroll.date}</h1>
                                            <h1>{scroll.entry}</h1>
                                            <Button id={scroll.id} onClick={(e) => this.updateScroll(e, scroll)}
                                                color="warning">Alter Scroll </Button>
                                            <Button id={scroll.id} onClick={(e) => this.deleteScroll(e)}
                                                color="danger">Destory Scroll</Button>
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
                </Form >
                <br />
                <br />
            </div >
        )
    }
}

