import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';

class EntertainmentAndLeisureBudgetFormField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };

        this.budgetOptions = ['low', 'medium', 'high'];

        this.budgetTooltips = {
            'low': 'A low budget for entertainment and leisure...',
            'medium': 'A medium budget for entertainment and leisure...',
            'high': 'A high budget for entertainment and leisure...',
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
        const optionValue = this.props.entertainmentAndLeisure;
        const tooltipText = this.budgetTooltips[optionValue];
        return (
          <Tooltip id="entertainment-leisure-tooltip" className="custom-tooltip" {...props}>
            {tooltipText}
          </Tooltip>
        )
    }

    render() {
        return (
            <Form.Group as={Row} controlId="entertainmentAndLeisureForm" className="form-group-wrapper">
                <Form.Label column sm="5" className="form-label-right">Entertainment and Leisure Budget</Form.Label>
                <Col sm="6" className={`form-control-with-arrow ${this.state.isOpen ? 'open' : ''}`}>
                  <OverlayTrigger
                    placement={window.innerWidth > 768 ? 'right' : 'top'}
                    delay={{ show: 250, hide: 400 }}
                    overlay={this.renderTooltip}
                  >
                    <div onMouseDown={this.handleMouseDown}>
                      <Form.Control 
                        as="select" 
                        name="entertainmentAndLeisure" 
                        value={this.props.entertainmentAndLeisure} 
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

export default EntertainmentAndLeisureBudgetFormField;
