import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';

class AgeFormField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
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
    <Tooltip id="age-tooltip" className="custom-tooltip" {...props}>
      Your age can significantly influence various aspects of your cost of living. This includes health insurance premiums,
      tax benefits or liabilities.
      Please select your current age to help us estimate these costs more accurately.
    </Tooltip>
  )

  render() {
    return (
      <Form.Group as={Row} controlId="ageForm" className="form-group-wrapper">
        <Form.Label column sm={5} className="form-label-right">Age</Form.Label>
        <Col sm={6} className={`form-control-with-arrow ${this.state.isOpen ? 'open' : ''}`}>
          <OverlayTrigger
            placement={window.innerWidth > 768 ? 'right' : 'top'}
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip}
          >
            <div onMouseDown={this.handleMouseDown}>
              <Form.Control
                as="select"
                name="age"
                value={this.props.age}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                className="red-text"
              >
                {Array.from({ length: 83 }, (_, index) => (
                  <option key={index + 18} value={index + 18}>
                    {index + 18}
                  </option>
                ))}
              </Form.Control>
              <span className="form-control-dropdown-arrow"></span> {/* Arrow element */}
            </div>
          </OverlayTrigger>
        </Col>
      </Form.Group>
    )
  }
}

export default AgeFormField;
