import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';

class PublicTransportFormField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.publicTransportOptions = ['never', 'rarely', 'occasionally', 'weekly', 'daily'];

    this.publicTransportTooltips = {
        'never': 'You do not use public transport at all.',
        'rarely': 'You use public transport infrequently, perhaps only a few times a year.',
        'occasionally': 'You use public transport from time to time, such as a few times a month.',
        'weekly': 'You regularly use public transport, typically at least once a week.',
        'daily': 'You rely on public transport as a primary means of commuting and use it every day.'
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
    const optionValue = this.props.publicTransport;
    const tooltipText = this.publicTransportTooltips[optionValue];
    return (
      <Tooltip id="publicTransport-tooltip" className="custom-tooltip" {...props}>
      {tooltipText}
      </Tooltip>
    )
  }

  render() {
    return (
      <Form.Group as={Row} controlId="publicTransportForm" className="form-group-wrapper">
        <Form.Label column sm="5" className="form-label-right">Public Transport Usage</Form.Label>
        <Col sm="6" className={`form-control-with-arrow ${this.state.isOpen ? 'open' : ''}`}>
          <OverlayTrigger
            placement={window.innerWidth > 768 ? 'right' : 'top'}
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip}
          >
            <div onMouseDown={this.handleMouseDown}>
              <Form.Control 
                as="select" 
                name="publicTransport" 
                value={this.props.publicTransport} 
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                className="red-text"
              >
                {this.publicTransportOptions.map(option => (
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

export default PublicTransportFormField;
