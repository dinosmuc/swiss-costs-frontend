import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';


import { API_BASE_URL } from '../../../../config';

const healthInsuranceTranslations = {
  English: {
    label: "Health Insurance",
    tooltips: {
      'basic_coverage': 'Basic Coverage: Provides the essential healthcare services for routine and emergency treatments. It is the minimum coverage required by law for residents in Switzerland.',
      'standard_coverage': 'Standard Coverage: A step above basic, this coverage includes additional services such as dental and vision care, suitable for individuals or families who expect more than just the basics.',
      'comprehensive_coverage': 'Comprehensive Coverage: Designed for those who prioritize their health, it covers a wider range of medical treatments and preventive care services, ensuring thorough health protection.',
      'premium_coverage': 'Premium Coverage: A premium choice that offers top-tier medical services, including access to private healthcare providers and wellness programs, for those who want the best in healthcare quality.',
      'maximum_coverage': 'Maximum Coverage: The pinnacle of healthcare in Switzerland, it includes extensive options for medical treatments, with the most flexible choices for healthcare providers and facilities, ensuring the highest standard of care.'
    }
  },
  German: {
    label: "Krankenversicherung",
    tooltips: {
      'basic_coverage': 'Grundversorgung: Bietet die notwendigen Gesundheitsdienstleistungen für Routine- und Notfallbehandlungen. Es ist die gesetzlich vorgeschriebene Mindestabdeckung für Einwohner in der Schweiz.',
      'standard_coverage': 'Standardversorgung: Eine Stufe über der Grundversorgung, diese Deckung umfasst zusätzliche Dienstleistungen wie Zahn- und Sehkraftversorgung, geeignet für Einzelpersonen oder Familien, die mehr als nur das Nötigste erwarten.',
      'comprehensive_coverage': 'Umfassende Versorgung: Entwickelt für diejenigen, die ihre Gesundheit priorisieren, deckt sie ein breiteres Spektrum an medizinischen Behandlungen und präventiven Gesundheitsdienstleistungen ab, um umfassenden Gesundheitsschutz zu gewährleisten.',
      'premium_coverage': 'Premiumversorgung: Eine erstklassige Wahl, die erstklassige medizinische Dienstleistungen bietet, einschließlich Zugang zu privaten Gesundheitsdienstleistern und Wellnessprogrammen, für diejenigen, die höchste Qualität im Gesundheitswesen wünschen.',
      'maximum_coverage': 'Maximalversorgung: Der Höhepunkt der Gesundheitsversorgung in der Schweiz, sie umfasst umfangreiche Optionen für medizinische Behandlungen, mit den flexibelsten Wahlmöglichkeiten für Gesundheitsdienstleister und Einrichtungen, um den höchsten Standard der Pflege zu gewährleisten.'
    }
  },
  Croatian: {
    label: "Zdravstveno osiguranje",
    tooltips: {
      'basic_coverage': 'Osnovno pokriće: Pruža osnovne usluge zdravstvene zaštite za rutinsko i hitno liječenje. To je minimalno pokriće koje zakon zahtijeva za stanovnike u Švicarskoj.',
      'standard_coverage': 'Standardno pokriće: Korak iznad osnovnog, ovo pokriće uključuje dodatne usluge kao što su dentalna i vizualna zaštita, pogodno za pojedince ili obitelji koji očekuju više od samih osnova.',
      'comprehensive_coverage': 'Sveobuhvatno pokriće: Dizajnirano za one koji daju prioritet svom zdravlju, pokriva širi raspon medicinskih tretmana i usluga preventivne zaštite, osiguravajući temeljitu zaštitu zdravlja.',
      'premium_coverage': 'Premium pokriće: Premium izbor koji nudi usluge zdravstvene zaštite najviše klase, uključujući pristup privatnim pružateljima zdravstvenih usluga i wellness programima, za one koji žele najbolju kvalitetu zdravstvene zaštite.',
      'maximum_coverage': 'Maksimalno pokriće: Vrhunac zdravstvene zaštite u Švicarskoj, uključuje opsežne opcije medicinskih tretmana, s najfleksibilnijim izborom pružatelja zdravstvenih usluga i objekata, osiguravajući najviši standard njege.'
    }
  }
};

const healthInsuranceOptionTranslations = {
  English: {
    'basic_coverage': 'Basic Coverage',
    'standard_coverage': 'Standard Coverage',
    'comprehensive_coverage': 'Comprehensive Coverage',
    'premium_coverage': 'Premium Coverage',
    'maximum_coverage': 'Maximum Coverage',
  },
  German: {
    'basic_coverage': 'Grundversorgung',
    'standard_coverage': 'Standardversorgung',
    'comprehensive_coverage': 'Umfassende Versorgung',
    'premium_coverage': 'Premiumversorgung',
    'maximum_coverage': 'Maximalversorgung',
  },
  Croatian: {
    'basic_coverage': 'Osnovno pokriće',
    'standard_coverage': 'Standardno pokriće',
    'comprehensive_coverage': 'Sveobuhvatno pokriće',
    'premium_coverage': 'Premium pokriće',
    'maximum_coverage': 'Maksimalno pokriće',
  }
};



class HealthInsuranceFormField extends React.Component {
  constructor(props) {
    super(props);
    this.healthInsuranceOptions = {
      'basic_coverage': 'Basic Coverage',
      'standard_coverage': 'Standard Coverage',
      'comprehensive_coverage': 'Comprehensive Coverage',
      'premium_coverage': 'Premium Coverage',
      'maximum_coverage': 'Maximum Coverage',
    };

    this.healthInsuranceTooltips = {
      'basic_coverage': 'Basic Coverage: Provides the essential healthcare services tailored for individuals with minimal medical needs. It is the foundational coverage recommended for every Swiss resident.',
      'standard_coverage': 'Standard Coverage: A step above basic, this coverage includes a broader range of services, making it ideal for individuals or families with average medical requirements.',
      'comprehensive_coverage': 'Comprehensive Coverage: Designed for those who prioritize their health, it offers extensive services, including specialist visits and alternative treatments, ensuring a comprehensive health safety net.',
      'premium_coverage': 'Premium Coverage: A premium choice for those who seek more than just healthcare. It ensures access to the best medical practitioners, faster appointments, and even international coverage for treatments abroad.',
      'maximum_coverage': 'Maximum Coverage: The pinnacle of healthcare in Switzerland. It guarantees priority access, widest range of treatments, and the best healthcare experience available in the country.',
    };


    this.state = {
      isOpen: false,
      estimatedCost: null,
    }

  }

  componentDidMount() {

    this.fetchHealthInsuranceEstimate(this.props.healthInsurance, this.props.age);
  }

  componentDidUpdate(prevProps) {

    if (prevProps.healthInsurance !== this.props.healthInsurance || prevProps.age !== this.props.age) {
      this.fetchHealthInsuranceEstimate(this.props.healthInsurance, this.props.age);
    }
  }

  fetchHealthInsuranceEstimate = async (coverage, age) => {

    const response = await fetch(`${API_BASE_URL}/costs/api/calculate_insurance_cost/?age=${age}&coverage=${coverage}`);
    const data = await response.json();
    this.setState({ estimatedCost: data.cost }); // Adjust the 'cost' to whatever field your API actually uses
  };


  handleChange = (event) => {
    this.props.onChange(event);
    this.setState({ isOpen: false });
  };

  handleMouseDown = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  handleFocus = () => {
    this.setState({ isOpen: true });
  };

  handleBlur = () => {
    this.setState({ isOpen: false });
  };

  renderTooltip = (props) => {
    const language = this.props.language || "English"; // Default to English
    const optionValue = this.props.healthInsurance;
    const tooltipText = healthInsuranceTranslations[language].tooltips[optionValue];
    return (
      <Tooltip id="healthInsurance-tooltip" className="custom-tooltip" {...props}>
        {tooltipText}
      </Tooltip>
    );
  };
  render() {
    const language = this.props.language || "English"; // Define 'language' before using it
    const options = healthInsuranceOptionTranslations[language]; // Now 'language' is properly initialized
    return (
      <Form.Group as={Row} controlId="healthInsuranceForm" className="form-group-wrapper">
        <Form.Label column sm="5" className="form-label-right">
          {healthInsuranceTranslations[language].label}
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
                name="healthInsurance"
                value={this.props.healthInsurance}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                className="red-text"
              >
                {Object.entries(this.healthInsuranceOptions).map(([key, value]) => (
                  <option key={key} value={key}>{options[key]}</option>
                ))}
              </Form.Control>
              <span className="form-control-dropdown-arrow"></span> {/* Arrow element */}
            </div>
          </OverlayTrigger>
          <Form.Text className="text-muted form-text-custom" style={{ position: 'absolute' }}>
            {this.state.estimatedCost !== null ? `- ${Math.floor(this.state.estimatedCost)} CHF` : '- Loading...'}
          </Form.Text>

        </Col>
      </Form.Group>
    );
  }
}

export default HealthInsuranceFormField;
