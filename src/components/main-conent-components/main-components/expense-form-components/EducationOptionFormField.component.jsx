import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';

import { API_BASE_URL } from '../../../../config';






const translations = {
  English: {
    label: "Education Options",
    options: {
      none: "None",
      public_school: "Public School",
      private_school: "Private School",
      international_school: "International School",
      university: "University",
    },
    tooltips: {
      none: "No education options chosen.",
      public_school: "Public schools are funded by government and must accept all children.",
      private_school: "Private schools set their own standards and are funded privately.",
      international_school: "International schools follow an international curriculum and are usually in English.",
      university: "Universities offer undergraduate and postgraduate education.",
    },
  },
  German: {
    label: "Bildungsoptionen",
    options: {
      none: "Keine",
      public_school: "Öffentliche Schule",
      private_school: "Private Schule",
      international_school: "Internationale Schule",
      university: "Universität",
    },
    tooltips: {
      none: "Keine Bildungsoptionen gewählt.",
      public_school: "Öffentliche Schulen werden staatlich finanziert und müssen alle Kinder aufnehmen.",
      private_school: "Private Schulen legen ihre eigenen Standards fest und werden privat finanziert.",
      international_school: "Internationale Schulen folgen einem internationalen Lehrplan und sind in der Regel auf Englisch.",
      university: "Universitäten bieten Grund- und Weiterbildung an.",
    },
  },
  Croatian: {
    label: "Obrazovne opcije",
    options: {
      none: "Nijedna",
      public_school: "Javna škola",
      private_school: "Privatna škola",
      international_school: "Međunarodna škola",
      university: "Sveučilište",
    },
    tooltips: {
      none: "Nisu odabrane opcije obrazovanja.",
      public_school: "Javne škole financira vlada i moraju prihvatiti svu djecu.",
      private_school: "Privatne škole postavljaju vlastite standarde i financiraju se privatno.",
      international_school: "Međunarodne škole prate međunarodni kurikulum i obično su na engleskom jeziku.",
      university: "Sveučilišta nude preddiplomsko i poslijediplomsko obrazovanje.",
    },
  },
  // Continue with additional languages as needed
};


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
    const { language, education } = this.props;
    const currentLanguage = language || "English"; // default to English if no language prop is passed
    const tooltipText = translations[currentLanguage].tooltips[education];
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
    const { language, education, name } = this.props;
    const currentLanguage = language || "English";
    return (
      <Form.Group as={Row} controlId="educationOptionsForm" className="form-group-wrapper">
        <Form.Label column sm="5" className="form-label-right">
          {translations[currentLanguage].label}
        </Form.Label>
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
                {Object.entries(translations[currentLanguage].options).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </Form.Control>
              <span className="form-control-dropdown-arrow"></span> {/* Arrow element */}
            </div>
          </OverlayTrigger>
          <Form.Text className="text-muted form-text-custom" style={{ position: 'absolute' }}>
            {`- ${Math.floor(this.findEducationCost())} CHF`}
          </Form.Text>
        </Col>
      </Form.Group>
    );
  }
}

export default EducationOptionFormField;
