import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';

class EducationOptionFormField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };

        this.educationOptions = [
            { value: "none", label: "None" },
            { value: "public_school", label: "Public School" },
            { value: "private_school", label: "Private School" },
            { value: "international_school", label: "International School" },
            { value: "university", label: "University" },
        ];

        this.educationTooltips = {
            'none': 'No education options chosen.',
            'public_school': 'Public schools are funded by local, state, and federal government funds. In contrast to private schools, they must accept all children.',
            'private_school': 'Private schools are not funded by the government but by private contributions. They are generally free to set their own standards for teachers and students.',
            'international_school': 'International schools follow an international curriculum, such as the International Baccalaureate, and are usually taught in English.',
            'university': 'Universities provide undergraduate and postgraduate education and academic research.',
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
        const optionValue = this.props.education;
        const tooltipText = this.educationTooltips[optionValue];
        return (
          <Tooltip id="education-tooltip" className="custom-tooltip" {...props}>
            {tooltipText}
          </Tooltip>
        )
    }

    render() {
        return (
            <Form.Group as={Row} controlId="educationOptionsForm" className="form-group-wrapper">
                <Form.Label column sm="5" className="form-label-right">Education Options</Form.Label>
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
                        value={this.props.education} 
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        className="red-text"
                      >
                          {this.educationOptions.map(option => (
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

export default EducationOptionFormField;
