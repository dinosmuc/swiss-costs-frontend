import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';

import { API_BASE_URL } from '../../../../config';


const translations = {
  English: {
    label: "Housing Type",
    tooltip: "In Switzerland, the price of an apartment can vary significantly based on the canton or region. Factors such as location, local demand, and amenities contribute to these differences. The numbers associated with these apartment sizes were found through research on websites like homegate.ch, comparis.ch, and others. It's advisable to conduct your own research for specific cantonal property markets to find accurate pricing."
  },
  German: {
    label: "Wohnungstyp",
    tooltip: "In der Schweiz kann der Preis einer Wohnung je nach Kanton oder Region erheblich variieren. Faktoren wie Standort, lokale Nachfrage und Ausstattung tragen zu diesen Unterschieden bei. Die mit diesen Wohnungsgrößen verbundenen Zahlen wurden durch Recherchen auf Websites wie homegate.ch, comparis.ch und anderen gefunden. Es ist ratsam, eigene Recherchen für spezifische kantonale Immobilienmärkte durchzuführen, um genaue Preise zu finden."
  },
  Croatian: {
    label: "Tip stana",
    tooltip: "U Švicarskoj cijena stana može znatno varirati ovisno o kantonu ili regiji. Faktori poput lokacije, lokalne potražnje i sadržaja pridonose ovim razlikama. Brojke povezane s veličinama ovih apartmana pronađene su istraživanjem na web stranicama poput homegate.ch, comparis.ch i drugih. Preporučuje se provesti vlastito istraživanje specifičnih tržišta nekretnina kantona kako bi se pronašle točne cijene."
  }
  // You can add more languages here as needed
};

class HousingTypeFormField extends React.Component {
  constructor(props) {
    super(props);

    this.housingTypes = {
      English: {
        'room': 'Room in Shared Apartment',
        'studio': 'Studio Apartment',
        '1.5_bedroom': '1.5-Bedroom Apartment',
        '2.5_bedroom': '2.5-Bedroom Apartment',
        '3.5_bedroom': '3.5-Bedroom Apartment',
        '4.5_bedroom': '4.5-Bedroom Apartment',
      },
      German: {
        'room': 'Zimmer in WG',
        'studio': 'Studio-Wohnung',
        '1.5_bedroom': '1.5-Zimmer-Wohnung',
        '2.5_bedroom': '2.5-Zimmer-Wohnung',
        '3.5_bedroom': '3.5-Zimmer-Wohnung',
        '4.5_bedroom': '4.5-Zimmer-Wohnung',
      },
      Croatian: {
        'room': 'Soba u zajedničkom stanu',
        'studio': 'Studio Apartman',
        '1.5_bedroom': 'Apartman s 1.5 sobe',
        '2.5_bedroom': 'Apartman s 2.5 sobe',
        '3.5_bedroom': 'Apartman s 3.5 sobe',
        '4.5_bedroom': 'Apartman s 4.5 sobe',
      }
      // You can continue adding more languages as needed.
    };

    this.state = {
      isOpen: false,
      estimatedCost: null,

    };
  }

  componentDidMount() {
    this.fetchHousingCostEstimate(this.props.canton, this.props.housingType);

  }

  componentDidUpdate(prevProps) {

    if (prevProps.housingType !== this.props.housingType || prevProps.canton !== this.props.canton) {
      this.fetchHousingCostEstimate(this.props.canton, this.props.housingType);
    }
  }

  fetchHousingCostEstimate = async (canton, housingType) => {

    const response = await fetch(`${API_BASE_URL}/costs/api/calculate_housing_cost/?housing_Type=${housingType}&canton=${canton}`);

    const data = await response.json();



    this.setState({ estimatedCost: data.cost }); // Adjust the 'cost' to whatever field your API actually uses
  };






  handleChange = (event) => {
    this.props.onChange(event);
    this.setState({ isOpen: false }); // Close the dropdown
  }

  handleMouseDown = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  renderTooltip = (props) => {
    const language = this.props.language || "English"; // Default to English
    return (
      <Tooltip id="housing-type-tooltip" className="custom-tooltip" {...props}>
        {translations[language].tooltip}
      </Tooltip>
    );
  }
  render() {
    const language = this.props.language || "English"; // Default to English

    return (
      <Form.Group as={Row} controlId="housingTypeForm" className="form-group-wrapper" >
        <Form.Label column sm="5" className="form-label-right">
          {translations[language].label}
        </Form.Label>
        <Col sm="6" className={`form-control-with-arrow ${this.state.isOpen ? 'open' : ''}`}>
          <OverlayTrigger
            placement={window.innerWidth > 768 ? 'right' : 'top'}
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="housing-type-tooltip" className="custom-tooltip">
                {translations[language].tooltip}
              </Tooltip>
            }
          >
            <div onMouseDown={this.handleMouseDown}>
              <Form.Control
                as="select"
                name="housingType"
                value={this.props.housingType}
                onChange={this.handleChange}
                className="red-text"
              >
                {Object.entries(this.housingTypes[language]).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </Form.Control>
              <span className="form-control-dropdown-arrow"></span> {/* Arrow element */}
            </div>
          </OverlayTrigger>
          <Form.Text className="text-muted form-text-custom" style={{ position: 'absolute' }}>
            {this.state.estimatedCost !== null ? `- ${this.state.estimatedCost} CHF` : '- Loading...'}
          </Form.Text>
        </Col>
      </Form.Group>
    );
  }

}


export default HousingTypeFormField;
