import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';

class HousingTypeFormField extends React.Component {
  constructor(props) {
    super(props);

    this.housingTypes = {
      'studio': 'Studio Apartment', 
      '1.5_bedroom': '1.5-Bedroom Apartment', 
      '2.5_bedroom': '2.5-Bedroom Apartment', 
      '3.5_bedroom': '3.5-Bedroom Apartment', 
      '4.5_bedroom': '4.5-Bedroom Apartment',
    };

    this.state = {
      isOpen: false,
    };
  }

  handleChange = (event) => {
    this.props.onChange(event);  
    this.setState({ isOpen: false }); // Close the dropdown
  }

  handleMouseDown = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  renderTooltip = (props) => (
    <Tooltip id="housing-type-tooltip" className="custom-tooltip" {...props}>
      In Switzerland, the price of an apartment can vary significantly based on the canton or region. Factors such as location, local demand, and amenities contribute to these differences. The numbers associated with these apartment sizes were found through research on websites like homegate.ch, comparis.ch, and others. It's advisable to conduct your own research for specific cantonal property markets to find accurate pricing.
    </Tooltip>
  )

  render() {
    return (
      <Form.Group as={Row} controlId="housingTypeForm" className="form-group-wrapper">
        <Form.Label column sm="5" className="form-label-right">Housing Type</Form.Label>
        <Col sm="6" className={`form-control-with-arrow ${this.state.isOpen ? 'open' : ''}`}>
          <OverlayTrigger
            placement={window.innerWidth > 768 ? 'right' : 'top'}
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip}
          >
            <div onMouseDown={this.handleMouseDown}>
              <Form.Control 
                as="select" 
                name="housingType" 
                value={this.props.housingType} 
                onChange={this.handleChange}
                className="red-text"
              >
                {Object.entries(this.housingTypes).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
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

export default HousingTypeFormField;
