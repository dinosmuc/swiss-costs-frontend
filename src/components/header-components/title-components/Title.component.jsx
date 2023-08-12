import React from 'react';
import './title.styles.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Title extends React.Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col xs={12} md={8} lg={6} className="text-center">
                        <div className="title">
                            <h1>Swiss Costs</h1>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Title;
