import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';

class FoodBudgetFormField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };

        this.budgetOptions = ['low', 'medium', 'high'];

        this.budgetTooltips = {
            'low': 'A low food budget is ideal for individuals who often cook at home, rarely eat out, and shop for groceries prudently.',
            'medium': 'A medium food budget is suitable for those who occasionally eat out, order takeouts, or buy premium grocery items.',
            'high': 'A high food budget caters to individuals who frequently eat at restaurants, order expensive takeouts, or buy high-end grocery items.',
        };
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
        const optionValue = this.props.foodBudget;
        const tooltipText = this.budgetTooltips[optionValue];
        return (
          <Tooltip id="foodBudget-tooltip" className="custom-tooltip" {...props}>
            {tooltipText}
          </Tooltip>
        )
    }

    render() {
        return (
            <Form.Group as={Row} controlId="foodBudgetForm" className="form-group-wrapper">
                <Form.Label column sm="5" className="form-label-right">Food Budget</Form.Label>
                <Col sm="6" className={`form-control-with-arrow ${this.state.isOpen ? 'open' : ''}`}>
                  <OverlayTrigger
                    placement={window.innerWidth > 768 ? 'right' : 'top'}
                    delay={{ show: 250, hide: 400 }}
                    overlay={this.renderTooltip}
                  >
                    <div onMouseDown={this.handleMouseDown}>
                      <Form.Control 
                        as="select" 
                        name="foodBudget" 
                        value={this.props.foodBudget} 
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        className="red-text"
                      >
                          {this.budgetOptions.map(option => (
                              <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                          ))}
                      </Form.Control>
                      <span className="form-control-dropdown-arrow"></span> {/* Arrow element */}
                    </div>
                  </OverlayTrigger>
                  <Form.Text className="text-muted form-text-custom" style={{ position: 'absolute'}}>- 250 CHF</Form.Text>
                </Col>
            </Form.Group>
        );
    }
}

export default FoodBudgetFormField;
