import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';

class MaritalStatusFormField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      options: [
        { value: "S", label: "Single" },
        { value: "MSI", label: "Married with a single income" },
        { value: "MDI", label: "Married with a double income" },
        { value: "SP", label: "Single parent" }
      ]
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

  renderTooltip = (props) => (
    <Tooltip id="marital-tooltip" className="custom-tooltip" {...props}>
      Your marital status can influence various aspects of your cost of living. Select your marital status to help us estimate your costs more accurately.
    </Tooltip>
  )

  render() {
    const { options } = this.state;
    return (
      <Form.Group as={Row} controlId="maritalStatusForm" className="form-group-wrapper">
        <Form.Label column sm={5} className="form-label-right">Marital Status</Form.Label>
        <Col sm={6} className={`form-control-with-arrow ${this.state.isOpen ? 'open' : ''}`}>
          <OverlayTrigger
            placement={window.innerWidth > 768 ? 'right' : 'top'}
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip}
          >
            <div onMouseDown={this.handleMouseDown}>
              <Form.Control
                as="select"
                name="maritalStatus"
                value={this.props.maritalStatus} // Fixed typo here
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                className="red-text"
              >
                {options.map((option, index) => (
                  <option key={index} value={option.value}>{option.label}</option>
                ))}
              </Form.Control>
              <span className="form-control-dropdown-arrow"></span> {/* Arrow element */}
            </div>
          </OverlayTrigger>
        </Col>
      </Form.Group>
    );
  }
}

export default MaritalStatusFormField;
