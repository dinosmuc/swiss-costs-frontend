import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { API_BASE_URL } from '../../../../config';


const translations = {
  English: {
    label: "Public Transport Usage",
    options: ['None', 'Rarely', 'Occasionally', 'Weekly', 'Daily'],
    tooltips: {
      'none': 'You never use public transport. 0 rides per month.',
      'rarely': 'You use public transport infrequently. About 2-3 rides per month.',
      'occasionally': 'You use public transport occasionally. Around 8-12 rides per month.',
      'weekly': 'You’re a weekly commuter. Roughly 16-20 rides per month.',
      'daily': 'You rely on public transport daily. About 60 rides per month.'
    }
  },
  German: {
    label: "Nutzung Öffentlicher Verkehrsmittel",
    options: ['Keine', 'Selten', 'Gelegentlich', 'Wöchentlich', 'Täglich'],
    tooltips: {
      'none': 'Sie nutzen die öffentlichen Verkehrsmittel nie. 0 Fahrten pro Monat.',
      'rarely': 'Sie nutzen die öffentlichen Verkehrsmittel selten. Etwa 2-3 Fahrten pro Monat.',
      'occasionally': 'Sie nutzen die öffentlichen Verkehrsmittel gelegentlich. Rund 8-12 Fahrten pro Monat.',
      'weekly': 'Sie sind ein wöchentlicher Pendler. Ungefähr 16-20 Fahrten pro Monat.',
      'daily': 'Sie verlassen sich täglich auf öffentliche Verkehrsmittel. Ungefähr 60 Fahrten pro Monat.'
    }
  },
  Croatian: {
    label: "Korištenje Javnog Prijevoza",
    options: ['Nikad', 'Rijetko', 'Povremeno', 'Tjedno', 'Dnevno'],
    tooltips: {
      'none': 'Nikada ne koristite javni prijevoz. 0 vožnji mjesečno.',
      'rarely': 'Rijetko koristite javni prijevoz. Oko 2-3 vožnje mjesečno.',
      'occasionally': 'Povremeno koristite javni prijevoz. Otprilike 8-12 vožnji mjesečno.',
      'weekly': 'Svaki tjedan koristite javni prijevoz. Približno 16-20 vožnji mjesečno.',
      'daily': 'Dnevno se oslanjate na javni prijevoz. Oko 60 vožnji mjesečno.'
    }
  }
};



class PublicTransportFormField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      publicTransportData: []
    };

    this.publicTransportOptions = ['none', 'rarely', 'occasionally', 'weekly', 'daily'];

    this.publicTransportTooltips = {
      'none': 'You never use public transport. 0 rides per month.',
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
    const language = this.props.language || "English";
    const optionValue = this.props.publicTransport.toLowerCase();
    const tooltipText = translations[language].tooltips[optionValue];
    return (
      <Tooltip id="publicTransport-tooltip" className="custom-tooltip" {...props}>
        {tooltipText}
      </Tooltip>
    );
  }

  render() {
    const language = this.props.language || "English"; // Default to English if no prop is provided
    const { label, options, tooltips } = translations[language];
    return (
      <Form.Group as={Row} controlId="publicTransportForm" className="form-group-wrapper">
        <Form.Label column sm="5" className="form-label-right">
          {label}
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
                name="publicTransport"
                value={this.props.publicTransport}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                className="red-text"
              >
                {options.map((option, index) => (
                  <option key={option.toLowerCase()} value={this.publicTransportOptions[index]}>
                    {option} {/* Display the translated option */}
                  </option>
                ))}
              </Form.Control>
              <span className="form-control-dropdown-arrow"></span> {/* Arrow element */}
            </div>
          </OverlayTrigger>
          <Form.Text className="text-muted form-text-custom" style={{ position: 'absolute' }}>
            {`- ${Math.floor(this.findPublicTransportCost())} CHF`}
          </Form.Text>
        </Col>
      </Form.Group>
    );
  }
}

export default PublicTransportFormField;
