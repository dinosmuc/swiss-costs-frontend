import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';

class NumberOfChildrenFormField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
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
    <Tooltip id="children-tooltip" className="custom-tooltip" {...props}>
      The number of children you have can significantly impact various aspects of your cost of living. This includes certain tax benefits. Please select the number of children to help us estimate these costs more accurately.
    </Tooltip>
  )

  render() {
    return (
      <Form.Group as={Row} controlId="numChildrenForm" className="form-group-wrapper">
        <Form.Label column sm={5} className="form-label-right">Number of Children</Form.Label>
        <Col sm={6} className={`form-control-with-arrow ${this.state.isOpen ? 'open' : ''}`}>
          <OverlayTrigger
            placement={window.innerWidth > 768 ? 'right' : 'top'}
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip}
          >
            <div onMouseDown={this.handleMouseDown}>
              <Form.Control
                as="select"
                name="numChildren"
                value={this.props.numChildren}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                className="red-text"
              >
                {[...Array(11).keys()].map((num) =>
                  <option key={num} value={num}>{num}</option>
                )}
              </Form.Control>
              <span className="form-control-dropdown-arrow"></span> {/* Arrow element */}
            </div>
          </OverlayTrigger>
        </Col>
      </Form.Group>
    );
  }
}

export default NumberOfChildrenFormField;
