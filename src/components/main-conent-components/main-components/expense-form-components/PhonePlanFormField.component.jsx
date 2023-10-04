import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';

import { API_BASE_URL } from '../../../../config';

class PhonePlanFormField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            phonePlanData: []
        };

        this.phonePlanOptions = ['none','basic', 'standard', 'premium'];

        this.phonePlanTooltips = {
            'none': 'No phone plan selected.',
            'basic': 'The Basic plan is tailored for minimal usage, offering essential features like voice calling and SMS, along with limited data. Suitable for those who mainly use their phone for calls and texts within Switzerland.',
            'standard': 'The Standard plan is designed for average users, providing a balanced mix of voice calling, SMS, and data. It includes roaming options and caters to those who need regular internet access for apps and browsing.',
            'premium': 'The Premium plan is aimed at heavy users, with generous allowances for voice calling, SMS, and high-speed data. Including international roaming and additional services, it\'s ideal for business users and frequent travelers.',
            
        };
    }

    componentDidMount() {
       
        fetch(`${API_BASE_URL}/costs/api/phone_plan/`)
        .then(response => response.json())
        .then(data => {
            this.setState({ phonePlanData: data });
        })
        .catch(error => console.log("Error fetching data: ", error));
    }

    findPhonePlanCost = () => {
        const { phonePlan } = this.props;
        const { phonePlanData } = this.state;

        const found = phonePlanData.find(item => item.plan === phonePlan);
        return found ? found.value : '-';
    }


    handleChange = (event) => {
        this.props.onChange(event);
        this.setState({ isOpen: false }); // Close when an option is chosen
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
        const optionValue = this.props.phonePlan;
        const tooltipText = this.phonePlanTooltips[optionValue];
        return (
            <Tooltip id="phonePlan-tooltip" className="custom-tooltip" {...props}>
            {tooltipText}
        </Tooltip>
        )
    }

    render() {
        return (
            <Form.Group as={Row} controlId="phonePlanForm" className="form-group-wrapper">
                <Form.Label column sm="5" className="form-label-right">Phone Plan</Form.Label>
                <Col sm="6" className={`form-control-with-arrow ${this.state.isOpen ? 'open' : ''}`}>
                  <OverlayTrigger
                    placement={window.innerWidth > 768 ? 'right' : 'top'}
                    delay={{ show: 250, hide: 400 }}
                    overlay={this.renderTooltip}
                  >
                    <div onMouseDown={this.handleMouseDown}>
                      <Form.Control 
                        as="select" 
                        name="phonePlan" 
                        value={this.props.phonePlan} 
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        className="red-text"
                      >
                          {this.phonePlanOptions.map(option => (
                              <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                          ))}
                      </Form.Control>
                      <span className="form-control-dropdown-arrow"></span> {/* Arrow element */}
                    </div>
                  </OverlayTrigger>
                  <Form.Text className="text-muted form-text-custom" style={{ position: 'absolute'}}>
                        {`- ${this.findPhonePlanCost()} CHF`}
                  </Form.Text>
                </Col>
            </Form.Group>
        );
    }
}

export default PhonePlanFormField;
