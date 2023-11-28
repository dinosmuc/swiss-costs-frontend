import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';

import { API_BASE_URL } from '../../../../config';

const translations = {
  English: {
    label: "Clothing Budget",
    tooltips: {
      none: "You do not require any clothing budget.",
      low: "A low clothing budget is ideal for individuals who prioritize function over fashion and buy new clothes only when necessary.",
      medium: "A medium clothing budget is suitable for those who enjoy keeping up with the latest fashion trends but still look for deals and discounts.",
      high: "A high clothing budget caters to individuals who frequently shop for new clothes, enjoy high-end brands, and prioritize fashion and style.",
      very_high: "A very high clothing budget is for individuals who frequently update their wardrobe with designer and high-end brands, often purchasing new items each season.",
      extreme: "An extreme clothing budget is tailored for those who spare no expense in their fashion choices, opting for custom-tailored pieces, luxury brands, and often owning multiple outfits for every occasion."
    }
  },
  German: {
    label: "Kleidungsbudget",
    tooltips: {
      none: "Sie benötigen kein Kleidungsbudget.",
      low: "Ein niedriges Kleidungsbudget ist ideal für Personen, die Funktionalität über Mode stellen und nur bei Bedarf neue Kleidung kaufen.",
      medium: "Ein mittleres Kleidungsbudget eignet sich für diejenigen, die gerne mit den neuesten Modetrends mithalten, aber dennoch nach Angeboten und Rabatten suchen.",
      high: "Ein hohes Kleidungsbudget ist für Personen gedacht, die häufig neue Kleidung kaufen, High-End-Marken genießen und Mode und Stil priorisieren.",
      very_high: "Ein sehr hohes Kleidungsbudget ist für Personen, die ihre Garderobe häufig mit Designer- und High-End-Marken aktualisieren und oft neue Artikel jede Saison kaufen.",
      extreme: "Ein extremes Kleidungsbudget ist für diejenigen zugeschnitten, die bei ihren Modeausgaben nicht sparen, sich für maßgeschneiderte Stücke und Luxusmarken entscheiden und oft mehrere Outfits für jeden Anlass besitzen."
    }
  },
  Croatian: {
    label: "Budžet za odjeću",
    tooltips: {
      none: "Ne trebate budžet za odjeću.",
      low: "Nizak budžet za odjeću je idealan za osobe koje prioritiziraju funkcionalnost nad modom i kupuju novu odjeću samo kada je to nužno.",
      medium: "Srednji budžet za odjeću odgovara onima koji vole pratiti najnovije modne trendove, ali ipak traže akcije i popuste.",
      high: "Visok budžet za odjeću namijenjen je pojedincima koji često kupuju novu odjeću, uživaju u visokokvalitetnim markama i prioritiziraju modu i stil.",
      very_high: "Vrlo visok budžet za odjeću je za pojedince koji često obnavljaju svoju garderobu dizajnerskim i skupim markama, često kupujući nove stvari svake sezone.",
      extreme: "Izuzetno visok budžet za odjeću je prilagođen onima koji ne štede na svojim modnim izborima, birajući odjeću po mjeri, luksuzne marke i često posjedujući više odjevnih kombinacija za svaku prigodu."
    }
  }
};




class ClothingBudgetFormField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      budgetData: [],
    };

    this.budgetOptions = ['low', 'medium', 'high', 'very_high', 'extreme'];

    this.budgetOptions = [
      { value: 'none', label: { English: 'None', German: 'Kein', Croatian: 'Nijedan' } },
      { value: 'low', label: { English: 'Low', German: 'Niedrig', Croatian: 'Nizak' } },
      { value: 'medium', label: { English: 'Medium', German: 'Mittel', Croatian: 'Srednji' } },
      { value: 'high', label: { English: 'High', German: 'Hoch', Croatian: 'Visok' } },
      { value: 'very_high', label: { English: 'Very High', German: 'Sehr Hoch', Croatian: 'Vrlo Visok' } },
      { value: 'extreme', label: { English: 'Extreme', German: 'Extrem', Croatian: 'Izuzetno' } }
    ];

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
    const optionValue = this.props.clothingBudget;
    const language = this.props.language || "English"; // default to English if no language prop is passed
    const tooltipText = translations[language].tooltips[optionValue] || "No tooltip found";
    return (
      <Tooltip id="clothingBudget-tooltip" className="custom-tooltip" {...props}>
        {tooltipText}
      </Tooltip>
    )
  }

  componentDidMount() {
    fetch(`${API_BASE_URL}/costs/api/clothing_budget/`)  // Adjust the URL based on your Django settings
      .then(response => response.json())
      .then(data => {
        this.setState({ budgetData: data });
      })
      .catch(error => console.log("Error fetching data: ", error));
  }
  findBudgetValue = () => {
    const { clothingBudget } = this.props;
    const { budgetData } = this.state;

    const found = budgetData.find(item => item.budget === clothingBudget);
    return found ? found.value : '-';  // Return '-' if not found
  }


  render() {
    const language = this.props.language || "English"; // default to English if no language prop is passed
    return (
      <Form.Group as={Row} controlId="clothingBudgetForm" className="form-group-wrapper">
        <Form.Label column sm="5" className="form-label-right">
          {translations[language].label}
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
                name="clothingBudget"
                value={this.props.clothingBudget}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                className="red-text"
              >
                {this.budgetOptions.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label[language]}
                  </option>
                ))}
              </Form.Control>
              <span className="form-control-dropdown-arrow"></span> {/* Arrow element */}
            </div>
          </OverlayTrigger>
          <Form.Text className="text-muted form-text-custom" style={{ position: 'absolute' }}>
            {`- ${Math.floor(this.findBudgetValue())} CHF`}
          </Form.Text>
        </Col>
      </Form.Group>
    );
  }

}

export default ClothingBudgetFormField;