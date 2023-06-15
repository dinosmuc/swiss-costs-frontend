import React from "react";

class FoodBudgetFormField extends React.Component {
  constructor(props) {
    super(props);

    this.budgetOptions = ['low', 'medium', 'high'];
  
  }

  handleChange = (event) => {
    this.props.onChange(event);  
  }


  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <label>
            Food Budget:
            <select name="foodBudget" value={this.props.foodBudget} onChange={this.handleChange}>
              {this.budgetOptions.map(option => (
                <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
    )
  }
}

export default FoodBudgetFormField;
