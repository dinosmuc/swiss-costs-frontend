import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';

import { API_BASE_URL } from '../../../../config';

class InternetPlanFormField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            internetPlanData: []
        };

        this.internetPlanOptions = ['none', 'basic', 'standard', 'high_speed'];

        this.internetPlanTooltips = {
          'none': 'No internet plan. Rely on public Wi-Fi or mobile data.',
          'basic': 'Basic Connectivity: Up to 100 Mbps. Good for light browsing, emails, and standard-definition streaming.',
          'standard': 'Standard Plan: Up to 500 Mbps. Suitable for HD streaming, online gaming, and smooth video conferencing.',
          'high_speed': 'High-Speed Plan: Up to 2 Gbps. Ideal for 4K streaming, multiple video conferences, and high-end online gaming.'
      };
      
    }

    componentDidMount() {
        fetch(`${API_BASE_URL}/costs/api/internet_plan/`)
        .then(response => response.json())
        .then(data => {
            this.setState({ internetPlanData: data });
        })
        .catch(error => console.log("Error fetching data: ", error));
    }

    findInternetPlanCost = () => {
        const { internetPlan } = this.props;
        const { internetPlanData } = this.state;

        const found = internetPlanData.find(item => item.plan === internetPlan);
        return found ? found.value : '-';
    }

    handleChange = (event) => {
        this.props.onChange(event);
        this.setState({ isOpen: false });
    }

    handleMouseDown = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    }

    handleFocus = () => {
        this.setState({ isOpen: true });
    }

    handleBlur = () => {
        this.setState({ isOpen: false });
    }

    renderTooltip = (props) => {
        const optionValue = this.props.internetPlan;
        const tooltipText = this.internetPlanTooltips[optionValue];
        return (
            <Tooltip id="internetPlan-tooltip" className="custom-tooltip" {...props}>
                {tooltipText}
            </Tooltip>
        );
    }

    render() {
        return (
            <Form.Group as={Row} controlId="internetPlanForm" className="form-group-wrapper">
                <Form.Label column sm="5" className="form-label-right">Internet Plan</Form.Label>
                <Col sm="6" className={`form-control-with-arrow ${this.state.isOpen ? 'open' : ''}`}>
                    <OverlayTrigger
                        placement={window.innerWidth > 768 ? 'right' : 'top'}
                        delay={{ show: 250, hide: 400 }}
                        overlay={this.renderTooltip}
                    >
                        <div onMouseDown={this.handleMouseDown}>
                            <Form.Control 
                                as="select" 
                                name="internetPlan" 
                                value={this.props.internetPlan} 
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                className="red-text"
                            >
                                {this.internetPlanOptions.map(option => (
                                    <option key={option} value={option}>
                                        {option.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                    </option>
                                ))}
                            </Form.Control>
                            <span className="form-control-dropdown-arrow"></span>
                        </div>
                    </OverlayTrigger>
                    <Form.Text className="text-muted form-text-custom" style={{ position: 'absolute'}}>
                        {`- ${this.findInternetPlanCost()} CHF`}
                    </Form.Text>
                </Col>
            </Form.Group>
        );
    }
}

export default InternetPlanFormField;
