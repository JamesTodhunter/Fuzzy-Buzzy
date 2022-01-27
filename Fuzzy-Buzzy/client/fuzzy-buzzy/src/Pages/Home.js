import React, { Component } from 'react';
import Dnd from '../components/site/Dnd';
import Comment from './Comment';
import './Home.css';
// import { Container, Row, Col } from 'reactstrap';

export default class Home extends Component {

    render() {
        return (
            <div className='main'>
                <div className='mainDiv'>
                    <Dnd />
                    <div className='comment'>
                        <Comment />
                    </div>
                </div>
            </div>
        )
    }
}

