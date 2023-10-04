import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';

import { API_BASE_URL } from '../../../../config';


class EntertainmentAndLeisureBudgetFormField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            budgetData: []
        };

        this.budgetOptions = ['low', 'medium', 'high'];

        this.budgetTooltips = {
            'low': 'Basic streaming services, maybe a couple of movie tickets or a low-cost hobby like hiking...',
            'medium': 'Includes things like more frequent cinema visits, mid-range hobbies (e.g., painting supplies, low-cost gym membership), and occasional events like local concerts...',
            'high': 'High-end hobbies (e.g., golf, skiing), premium streaming services, high-profile concerts or sporting events, and perhaps a weekend getaway...',
        };
    }

    componentDidMount() {
        fetch(`${API_BASE_URL}/costs/api/entertainment_and_leisure/?format=json`)
        .then(response => response.json())
        .then(data => {
            this.setState({ budgetData: data, isLoading: false });
        })
        .catch(error => console.log("Error fetching data: ", error));
    }
    findBudgetValue = () => {
        const { entertainmentAndLeisure } = this.props;
        const { budgetData } = this.state;
    
        if (!Array.isArray(budgetData)) {
            return '-';
        }
    
        const found = budgetData.find(item => item.budget === entertainmentAndLeisure);
        return found ? found.value : '-';  // Return '-' if not found
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
        const optionValue = this.props.entertainmentAndLeisure;
        const tooltipText = this.budgetTooltips[optionValue];
        return (
          <Tooltip id="entertainment-leisure-tooltip" className="custom-tooltip" {...props}>
            {tooltipText}
          </Tooltip>
        )
    }

    render() {
        const { budgetData, isOpen } = this.state;
        return (
            <Form.Group as={Row} controlId="entertainmentAndLeisureForm" className="form-group-wrapper">
                <Form.Label column sm="5" className="form-label-right">Entertainment and Leisure Budget</Form.Label>
                <Col sm="6" className={`form-control-with-arrow ${this.state.isOpen ? 'open' : ''}`}>
                  <OverlayTrigger
                    placement={window.innerWidth > 768 ? 'right' : 'top'}
                    delay={{ show: 250, hide: 400 }}
                    overlay={this.renderTooltip}
                  >
                    <div onMouseDown={this.handleMouseDown}>
                      <Form.Control 
                        as="select" 
                        name="entertainmentAndLeisure" 
                        value={this.props.entertainmentAndLeisure} 
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        className="red-text"
                      >
                          {this.budgetOptions.map(option => (
                              <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                          ))}
                      </Form.Control>
                      <span className="form-control-dropdown-arrow"></span>
                    </div>
                  </OverlayTrigger>
                  <Form.Text className="text-muted form-text-custom" style={{ position: 'absolute'}}>
                        {budgetData.length > 0 ? `- ${this.findBudgetValue()} CHF` : 'Loading...'}
                  </Form.Text>
                </Col>
            </Form.Group>
        );
    }
}

export default EntertainmentAndLeisureBudgetFormField;
