import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';

class ChildCareOptionsFormField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };

        this.childCareOptions = [
            { value: "none", label: "None" },
            { value: "home_based", label: "Home-based Childcare" },
            { value: "daycare_center", label: "Daycare Center" },
            { value: "nanny", label: "Nanny" },
            { value: "au_pair", label: "Au Pair" },
        ];

        this.childCareTooltips = {
            'none': 'You do not require any childcare services.',
            'home_based': 'Home-based childcare is a care service in a home setting, often with fewer children than in daycare centers.',
            'daycare_center': 'Daycare centers are larger facilities and often have a more structured and educational-based environment.',
            'nanny': 'A nanny provides childcare within the kids\' own home and can offer more personalized care.',
            'au_pair': 'An au pair is a person from overseas employed to live with a family and do light housework in exchange for room and board and the opportunity to learn the family\'s language.',
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
        const optionValue = this.props.childcare;
        const tooltipText = this.childCareTooltips[optionValue];
        return (
          <Tooltip id="childCare-tooltip" className="custom-tooltip" {...props}>
            {tooltipText}
          </Tooltip>
        )
    }

    render() {
        return (
            <Form.Group as={Row} controlId="childCareForm" className="form-group-wrapper">
                <Form.Label column sm="5" className="form-label-right">Child Care Options</Form.Label>
                <Col sm="6" className={`form-control-with-arrow ${this.state.isOpen ? 'open' : ''}`}>
                  <OverlayTrigger
                    placement={window.innerWidth > 768 ? 'right' : 'top'}
                    delay={{ show: 250, hide: 400 }}
                    overlay={this.renderTooltip}
                  >
                    <div onMouseDown={this.handleMouseDown}>
                      <Form.Control 
                        as="select" 
                        name={this.props.name} 
                        value={this.props.childcare} 
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        className="red-text"
                      >
                          {this.childCareOptions.map(option => (
                              <option key={option.value} value={option.value}>{option.label}</option>
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

export default ChildCareOptionsFormField;
