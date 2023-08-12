import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';

class HealthInsuranceFormField extends React.Component {
  constructor(props) {
    super(props);
    this.healthInsuranceOptions = {
      'basic_coverage': 'Basic Coverage',
      'standard_coverage': 'Standard Coverage',
      'comprehensive_coverage': 'Comprehensive Coverage',
      'premium_coverage': 'Premium Coverage',
      'maximum_coverage': 'Maximum Coverage',
    };

    this.healthInsuranceTooltips = {
      'basic_coverage': 'Basic Coverage: Provides the essential healthcare services tailored for individuals with minimal medical needs. It is the foundational coverage recommended for every Swiss resident.',
      'standard_coverage': 'Standard Coverage: A step above basic, this coverage includes a broader range of services, making it ideal for individuals or families with average medical requirements.',
      'comprehensive_coverage': 'Comprehensive Coverage: Designed for those who prioritize their health, it offers extensive services, including specialist visits and alternative treatments, ensuring a comprehensive health safety net.',
      'premium_coverage': 'Premium Coverage: A premium choice for those who seek more than just healthcare. It ensures access to the best medical practitioners, faster appointments, and even international coverage for treatments abroad.',
      'maximum_coverage': 'Maximum Coverage: The pinnacle of healthcare in Switzerland. It guarantees priority access, widest range of treatments, and the best healthcare experience available in the country.',
  };
  

    this.state = {
      isOpen: false,
      selectedTooltip: this.healthInsuranceTooltips[this.props.healthInsurance]
    };
  }

  handleChange = (event) => {
    this.props.onChange(event);
    this.setState({ isOpen: false });
  };

  handleMouseDown = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  handleFocus = () => {
    this.setState({ isOpen: true });
  };

  handleBlur = () => {
    this.setState({ isOpen: false });
  };

  renderTooltip = (props) => {
    const optionValue = this.props.healthInsurance;
    const tooltipText = this.healthInsuranceTooltips[optionValue];
    return (
      <Tooltip id="healthInsurance-tooltip" className="custom-tooltip" {...props}>
        {tooltipText}
      </Tooltip>
    )
}

  render() {
    return (
      <Form.Group as={Row} controlId="healthInsuranceForm" className="form-group-wrapper">
        <Form.Label column sm="5" className="form-label-right">Health Insurance:</Form.Label>
        <Col sm="6" className={`form-control-with-arrow ${this.state.isOpen ? 'open' : ''}`}>
          <OverlayTrigger
            placement={window.innerWidth > 768 ? 'right' : 'top'}
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip}
          >
            <div onMouseDown={this.handleMouseDown}>
              <Form.Control 
                as="select" 
                name="healthInsurance" 
                value={this.props.healthInsurance} 
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                className="red-text"
              >
                {Object.entries(this.healthInsuranceOptions).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </Form.Control>
              <span className="form-control-dropdown-arrow"></span> {/* Arrow element */}
            </div>
          </OverlayTrigger>
          <Form.Text className="text-muted form-text-custom" style={{ position: 'absolute' }}>- 250 CHF</Form.Text>
        </Col>
      </Form.Group>
    );
  }
}

export default HealthInsuranceFormField;
