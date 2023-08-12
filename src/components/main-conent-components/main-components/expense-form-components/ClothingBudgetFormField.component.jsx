import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';

class ClothingBudgetFormField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };

        this.budgetOptions = ['low', 'medium', 'high'];

        this.budgetTooltips = {
            'low': 'A low clothing budget is ideal for individuals who prioritize function over fashion and buy new clothes only when necessary.',
            'medium': 'A medium clothing budget is suitable for those who enjoy keeping up with the latest fashion trends but still look for deals and discounts.',
            'high': 'A high clothing budget caters to individuals who frequently shop for new clothes, enjoy high-end brands, and prioritize fashion and style.',
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
        const optionValue = this.props.clothingBudget;
        const tooltipText = this.budgetTooltips[optionValue];
        return (
          <Tooltip id="clothingBudget-tooltip" className="custom-tooltip" {...props}>
            {tooltipText}
          </Tooltip>
        )
    }

    render() {
        return (
            <Form.Group as={Row} controlId="clothingBudgetForm" className="form-group-wrapper">
                <Form.Label column sm="5" className="form-label-right">Clothing Budget</Form.Label>
                <Col sm="6" className={`form-control-with-arrow ${this.state.isOpen ? 'open' : ''}`}>
                  <OverlayTrigger
                    placement={window.innerWidth > 768 ? 'right' : 'top'}
                    delay={{ show: 250, hide: 400 }}
                    overlay={this.renderTooltip}
                  >
                    <div onMouseDown={this.handleMouseDown}>
                      <Form.Control 
                        as="select" 
                        name="clothingBudget" 
                        value={this.props.clothingBudget} 
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

export default ClothingBudgetFormField;
