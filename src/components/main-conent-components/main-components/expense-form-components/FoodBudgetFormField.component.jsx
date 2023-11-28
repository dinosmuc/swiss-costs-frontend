import React from 'react';
import { Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './formField.styles.scss';

import { API_BASE_URL } from '../../../../config';

const translations = {
  English: {
    label: "Food Budget",
    options: {
      very_low: "Very low",
      low: "Low",
      moderate_low: "Moderately low",
      medium: "Medium",
      moderate_high: "Moderately high",
      high: "High",
      very_high: "Very high",
      extreme: "Extreme"
    },
    tooltips: {
      very_low: `You're mostly shopping at discount stores...`,
      low: `You're buying budget-friendly groceries and occasionally treating yourself.`,
      moderate_low: `You're managing a balanced mix of value and variety in your diet.`,
      medium: `You're spending a reasonable amount on a mix of essentials and luxuries.`,
      moderate_high: `You often opt for organic and high-quality products.`,
      high: `You prefer premium products and frequently dine out.`,
      very_high: `You indulge in gourmet food and exclusive dining experiences.`,
      extreme: `You've got a personal shopper...`
    }
  },
  German: {
    label: "Lebensmittelbudget",
    options: {
      very_low: "Sehr gering",
      low: "Gering",
      moderate_low: "Mittelgering",
      medium: "Mittel",
      moderate_high: "Mittelhoch",
      high: "Hoch",
      very_high: "Sehr hoch",
      extreme: "Extrem"
    },
    tooltips: {
      very_low: `Sie kaufen hauptsächlich in Discountern...`,
      low: `Sie achten auf ein gutes Preis-Leistungs-Verhältnis und gönnen sich ab und zu etwas.`,
      moderate_low: `Sie halten eine ausgewogene Mischung aus Preiswertigkeit und Vielfalt.`,
      medium: `Sie geben einen vernünftigen Betrag für eine Mischung aus Notwendigem und Luxus aus.`,
      moderate_high: `Sie wählen oft Bio- und Qualitätsprodukte.`,
      high: `Sie bevorzugen Premiumprodukte und gehen häufig essen.`,
      very_high: `Sie genießen Gourmetessen und exklusive Essenserlebnisse.`,
      extreme: `Sie haben einen persönlichen Einkäufer...`
    }
  },
  Croatian: {
    label: "Proračun za hranu",
    options: {
      very_low: "Vrlo nisko",
      low: "Nisko",
      moderate_low: "Umjereno nisko",
      medium: "Srednje",
      moderate_high: "Umjereno visoko",
      high: "Visoko",
      very_high: "Vrlo visoko",
      extreme: "Izuzetno"
    },
    tooltips: {
      very_low: `Većinom kupujete u diskontnim trgovinama...`,
      low: `Pazite na omjer cijene i kvalitete te si ponekad priuštite nešto posebno.`,
      moderate_low: `Imate uravnoteženu mješavinu povoljnih cijena i raznolikosti u prehrani.`,
      medium: `Trošite razuman iznos na mješavinu osnovnih i luksuznih proizvoda.`,
      moderate_high: `Često birate organske i visokokvalitetne proizvode.`,
      high: `Preferirate premium proizvode i često jedete vani.`,
      very_high: `Uživate u gurmanskim jelima i ekskluzivnim gastronomskim iskustvima.`,
      extreme: `Imate osobnog kupca...`
    }
  },
  // ... add more languages if needed
};


class FoodBudgetFormField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      foodBudgetData: [],
    };

    this.budgetOptions = ['very_low', 'low', 'moderate_low', 'medium', 'moderate_high', 'high', 'very_high', 'extreme'];

    this.budgetTooltips = {
      'very_low': `You're mostly shopping at discount stores like Denner or buying the "M-Budget" line from Migros. Fresh produce is limited to what's on sale. Forget about dining out; even a basic meal in a Swiss restaurant will blow this budget.`,
      'low': `You're still focused on budget stores but can afford some occasional quality items from Coop or Migros. You might even splurge on a bar of Frey or Toblerone chocolate. Takeaway from a kebab shop or a slice of pizza is the max you can afford for dining out.`,
      'moderate_low': `You can have a more diversified diet, maybe even add some affordable Swiss cheese or local sausages. Dining out is restricted to cheaper options like Coop Pronto takeaway or the occasional McDonald's, and that's once or twice a month.`,
      'medium': `You're comfortable with your groceries, mixing in some organic or local products. Dining out can be a weekly thing but stick to casual places like local pizzerias or a simple fondue place. Forget about Michelin stars, though.`,
      'moderate_high': `Your grocery cart regularly includes local specialties like Gruyère cheese or Bundnerfleisch. You're dining out 2-3 times a week, which can include mid-range places serving Swiss cuisine like raclette or rösti.`,
      'high': `Your pantry is well-stocked with quality products, including some organic items. Dining out is a regular 4 times a week, including some of the finer restaurants in town. You could even do an occasional weekend brunch at a nice lakeside café.`,
      'very_high': `You're eating out so often you almost don't need a kitchen. You're not only going to well-known places but also indulging in occasional fine dining experiences, including tasting menus.`,
      'extreme': `You've got a personal shopper to get your groceries from high-end stores like Globus. For dining, you're a regular at top Michelin-starred places and wouldn't hesitate to fly to a neighboring country just for a meal if you could.`
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
    const optionValue = this.props.foodBudget;
    const language = this.props.language || "English"; // default to English if no language prop is passed
    const tooltipText = translations[language].tooltips[optionValue];
    return (
      <Tooltip id="foodBudget-tooltip" className="custom-tooltip" {...props}>
        {tooltipText}
      </Tooltip>
    )
  }

  componentDidMount() {
    fetch(`${API_BASE_URL}/costs/api/food_budget/`)
      .then(response => response.json())
      .then(data => {
        this.setState({ foodBudgetData: data });
      })
      .catch(error => console.log("Error fetching data: ", error));
  }

  findFoodBudgetValue = () => {
    const { foodBudget } = this.props;
    const { foodBudgetData } = this.state;

    const found = foodBudgetData.find(item => item.budget === foodBudget);
    return found ? found.value : '-';  // Return '-' if not found
  }

  render() {
    return (
      <Form.Group as={Row} controlId="foodBudgetForm" className="form-group-wrapper">
        <Form.Label column sm="5" className="form-label-right">{translations[this.props.language].label}</Form.Label>
        <Col sm="6" className={`form-control-with-arrow ${this.state.isOpen ? 'open' : ''}`}>
          <OverlayTrigger
            placement={window.innerWidth > 768 ? 'right' : 'top'}
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip}
          >
            <div onMouseDown={this.handleMouseDown}>
              <Form.Control
                as="select"
                name="foodBudget"
                value={this.props.foodBudget}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                className="red-text"
              >
                {this.budgetOptions.map(option => (
                  <option key={option} value={option}>
                    {translations[this.props.language].options[option]}
                  </option>
                ))}
              </Form.Control>
              <span className="form-control-dropdown-arrow" />
            </div>
          </OverlayTrigger>
          <Form.Text className="text-muted form-text-custom" style={{ position: 'absolute' }}>
            {`- ${Math.floor(this.findFoodBudgetValue())} CHF`}
          </Form.Text>
        </Col>
      </Form.Group>
    );
  }
}

export default FoodBudgetFormField;