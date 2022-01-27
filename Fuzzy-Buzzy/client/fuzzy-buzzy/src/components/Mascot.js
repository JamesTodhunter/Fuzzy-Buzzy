import React, { Component } from 'react';
import Fuzzy from '../assets/Fuzzy.png';

export default class FuzzyBuzzy extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    };

    render() {
        return (
            <div className="Mascot">
                <img src={Fuzzy.png} alt="Logo" />
            </div>
        )
    }
}