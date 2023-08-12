import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';

class InternetPlanFormField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };

        this.internetPlanOptions = ['basic', 'standard', 'high-speed', 'ultra high-speed'];

        this.internetPlanTooltips = {
          'basic': 'The Basic plan offers moderate internet speed, suitable for light web browsing, checking emails, and using social media. Ideal for individuals or small households in Switzerland with minimal streaming needs.',
          'standard': 'The Standard plan provides faster internet speed, catering to regular online activities such as streaming videos in HD, online gaming, and downloading large files. Suitable for family use and moderate online multitasking.',
          'high-speed': 'The High-Speed plan ensures very high-speed internet connectivity. Designed for tech-savvy households, it supports multiple devices streaming HD or 4K video, real-time gaming, and seamless video conferencing. It’s a great fit for a connected lifestyle.',
          'ultra high-speed': 'The Ultra High-Speed plan delivers the highest available internet speed, meeting the demands of heavy usage. Capable of handling multiple devices streaming HD or 4K video, conducting high-quality video conferences, and engaging in real-time gaming simultaneously. Perfect for professionals and enthusiasts who need top-tier connectivity.',
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
        const optionValue = this.props.internetPlan;
        const tooltipText = this.internetPlanTooltips[optionValue];
        return (
          <Tooltip id="internetPlan-tooltip" className="custom-tooltip" {...props}>
            {tooltipText}
          </Tooltip>
        )
    }

    render() {
        return (
            <Form.Group as={Row} controlId="internetPlanForm" className="form-group-wrapper">
                <Form.Label column sm="5" className="form-label-right">Internet Plan</Form.Label>
                <Col sm="6" className={`form-control-with-arrow ${this.state.isOpen ? 'open' : ''}`}>
                  <OverlayTrigger
                    placement={window.innerWidth > 768 ? 'right' : 'top'}
                    delay={{ show: 250, hide: 400 }}
                    overlay={this.renderTooltip}
                  >
                    <div onMouseDown={this.handleMouseDown}>
                      <Form.Control 
                        as="select" 
                        name="internetPlan" 
                        value={this.props.internetPlan} 
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        className="red-text"
                      >
                          {this.internetPlanOptions.map(option => (
                              <option key={option} value={option}>
                                {option.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                              </option>
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

export default InternetPlanFormField;
