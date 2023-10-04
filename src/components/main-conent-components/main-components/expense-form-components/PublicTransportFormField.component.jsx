import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { API_BASE_URL } from '../../../../config';

class PublicTransportFormField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      publicTransportData: []
    };
    
    this.publicTransportOptions = ['never', 'rarely', 'occasionally', 'weekly', 'daily'];
    
    this.publicTransportTooltips = {
      'never': 'You never use public transport. 0 rides per month.',
      'rarely': 'You use public transport infrequently. About 2-3 rides per month.',
      'occasionally': 'You use public transport occasionally. Around 8-12 rides per month.',
      'weekly': 'You\'re a weekly commuter. Roughly 16-20 rides per month.',
      'daily': 'You rely on public transport daily. About 60 rides per month.'
    };
  }

  componentDidMount() {
    fetch(`${API_BASE_URL}/costs/api/public_transport/`)
    .then(response => response.json())
    .then(data => {
      this.setState({ publicTransportData: data });
    })
    .catch(error => console.log('Error fetching data:', error));
  }
  findPublicTransportCost = () => {
    const { publicTransport } = this.props;
    const { publicTransportData } = this.state;
  
    const found = publicTransportData.find(item => item.usage === publicTransport); // Changed 'plan' to 'usage' to match your backend model
    return found ? found.value : '-';
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
          <Form.Text className="text-muted form-text-custom" style={{ position: 'absolute' }}>
            {`- ${this.findPublicTransportCost()} CHF`}
          </Form.Text>

        </Col>
      </Form.Group>
    );
  }
}

export default PublicTransportFormField;
