import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './assistent.styles.scss';

import ChatbotComponent from './Chatbot.component';


class ServiceOption extends Component {
    render() {
        const { title, image, text } = this.props;
        return (
            <Col xs={12} sm={6} md={4} lg={4} className="mb-3">
                <Link to={`/service/${encodeURIComponent(title)}`} style={{ textDecoration: 'none' }}>
                    <div className="service-option-container" style={{ cursor: 'pointer' }}>
                        <img src={image} alt={`Image for ${title}`} className="service-option-image" />
                        <div className="service-option-title">{title}</div>
                        {/* Optionally, you can display text or other information here */}
                    </div>
                </Link>
            </Col>
        );
    }
}

ServiceOption.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    text: PropTypes.string,
};

class ServiceOptionsGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [
                {
                    id: 1,
                    title: 'Swiss Relocation Assistant',
                    image: '/images/relocate.png', // Ensure the image path is correct
                    system_message: 'You are the Swiss Relocation Assistant, and you need to extract all necessary data from the user and then provide guidance and tips considering your task of assisting with relocating to Switzerland.'
                },
                {
                    id: 2,
                    title: 'Swiss Canton Transition Assistant',
                    image: '/images/canton.png', // Ensure the image path is correct
                    system_message: 'You are the Swiss Canton Transition Assistant, tasked with extracting essential information from the user and providing advice on changing cantons within Switzerland.'
                },
                {
                    id: 3,
                    title: 'Swiss Business Startup Assistant',
                    image: '/images/business.png', // Ensure the image path is correct
                    system_message: 'As the Swiss Business Startup Assistant, your role involves gathering crucial data from the user and offering guidance for starting a new business in Switzerland.'
                },
                {
                    id: 4,
                    title: 'Swiss Exploration Assistant',
                    image: '/images/explore.png', // Ensure the image path is correct
                    system_message: 'You are the Swiss Exploration Assistant, responsible for understanding the users needs and providing tips to explore the beauty and opportunities of Switzerland.'
                },
                {
                    id: 5,
                    title: 'Swiss Financial Savings Assistant',
                    image: '/images/save.png', // Ensure the image path is correct
                    system_message: 'As the Swiss Financial Savings Assistant, your task is to extract relevant information from the user and advise on saving money in Switzerland.'
                },
                {
                    id: 6,
                    title: 'Swiss Employment Assistant',
                    image: '/images/job.png', // Ensure the image path is correct
                    system_message: 'You are the Swiss Employment Assistant, focused on obtaining necessary user data and assisting in finding job opportunities in Switzerland.'
                }
            ],

        };
    }

    render() {
        const { options } = this.state;
        return (
            <div className="container mt-4 service-options-grid-container">
                <Row>
                    {options.map(option => (
                        <ServiceOption
                            key={option.id}
                            title={option.title}
                            text={option.text}
                            image={option.image}
                        />
                    ))}
                </Row>
            </div>
        );
    }
}

export default ServiceOptionsGrid;