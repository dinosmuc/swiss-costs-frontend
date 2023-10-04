import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';

import { API_BASE_URL } from '../../../../config';

class EducationOptionFormField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            educationData: [],
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
        'public_school': 'Public schools are funded by government and must accept all children.',
        'private_school': 'Private schools set their own standards and are funded privately.',
        'international_school': 'International schools follow an international curriculum and are usually in English.',
        'university': 'Universities offer undergraduate and postgraduate education.',
    };

    }

    componentDidMount() {
        fetch(`${API_BASE_URL}/costs/api/education/?format=json`)
        .then(response => response.json())
        .then(data => {
            this.setState({ educationData: data });
        })
        .catch(error => console.log("Error fetching data: ", error));
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

    findEducationCost = () => {
        const { education } = this.props;
        const { educationData } = this.state;
      
        const found = educationData.find(item => item.education_type === education);
        return found ? found.value : '-';  // Return '-' if not found
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
                  <Form.Text className="text-muted form-text-custom" style={{ position: 'absolute'}}>
                        {`- ${this.findEducationCost()} CHF`}
                  </Form.Text>

                </Col>
            </Form.Group>
        );
    }
}

export default EducationOptionFormField;
