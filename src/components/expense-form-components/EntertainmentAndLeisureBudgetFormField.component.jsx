import React from "react";

class EntertainmentAndLeisureBudgetFormField extends React.Component {
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
            Entertainment and Leisure Budget:
            <select name="entertainmentAndLeisure" value={this.props.entertainmentAndLeisure} onChange={this.handleChange}>
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

export default EntertainmentAndLeisureBudgetFormField;
