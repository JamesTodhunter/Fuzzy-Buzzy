// import React, { Component } from 'react';
// import { Table, Button } from 'reactstrap';

// export default class myList extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: [],
//             title: "",
//             date: "",
//             entry: "",
//             dndId: "",
//             commentId: ""
//         }
//     }

//     displayScrolls = (dndId) => {
//         console.log(this.state.dndId);
//         fetch(`http://localhost:8080/comment/entry/${this.state.dndId}`, {
//             method: 'GET',
//             headers: new Headers({
//                 'Content-Type': 'application/json',
//                 Authorization: localStorage.getItem('token')
//             })
//         })
//             .then(res => {
//                 if (!res.ok) {
//                     throw Error(`no reading for you`);
//                 }
//                 return res.json()
//             })
//             .then(data => {
//                 console.log(data);
//                 this.setState({
//                     data: data,
//                     dndId: data.id,
//                     commentId: data.id

//                 })

//             })
//             .catch(err => {
//                 console.log(err.message);
//                 console.log("error");
//             })


//     }
//     componentDidMount() {
//         this.displayScrolls()
//     }

    


//     render() {
//         return (
//             <div>

//             </div >
//         )
//     }
// }