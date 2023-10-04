import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';

import { API_BASE_URL } from '../../../../config';  // Make sure to import this

class ClothingBudgetFormField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            budgetData: [],
        };

        this.budgetOptions = ['low', 'medium', 'high','very_high','extreme'];

        this.budgetTooltips = {
          'none': 'You do not require any clothing budget.',
          'low': 'A low clothing budget is ideal for individuals who prioritize function over fashion and buy new clothes only when necessary.',
          'medium': 'A medium clothing budget is suitable for those who enjoy keeping up with the latest fashion trends but still look for deals and discounts.',
          'high': 'A high clothing budget caters to individuals who frequently shop for new clothes, enjoy high-end brands, and prioritize fashion and style.',
          'very_high': 'A very high clothing budget is for individuals who frequently update their wardrobe with designer and high-end brands, often purchasing new items each season.',
          'extreme': 'An extreme clothing budget is tailored for those who spare no expense in their fashion choices, opting for custom-tailored pieces, luxury brands, and often owning multiple outfits for every occasion.'
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

    componentDidMount() {
      fetch(`${API_BASE_URL}/costs/api/clothing_budget/`)  // Adjust the URL based on your Django settings
      .then(response => response.json())
      .then(data => {
          this.setState({ budgetData: data });
      })
      .catch(error => console.log("Error fetching data: ", error));
    }
    findBudgetValue = () => {
      const { clothingBudget } = this.props;
      const { budgetData } = this.state;

      const found = budgetData.find(item => item.budget === clothingBudget);
      return found ? found.value : '-';  // Return '-' if not found
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
                  <Form.Text className="text-muted form-text-custom" style={{ position: 'absolute'}}>
                    {`- ${this.findBudgetValue()} CHF`}
                  </Form.Text>
                </Col>
            </Form.Group>
        );
    }
}

export default ClothingBudgetFormField;
