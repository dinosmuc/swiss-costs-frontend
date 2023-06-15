import React from "react";

class AgeFormField extends React.Component {

  handleChange = (event) => {
    this.props.onChange(event); 
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6">  
          <label>
            Age:
            <select name="age" value={this.props.age} onChange={this.handleChange}>
              {Array.from({ length: 83 }, (_, index) => (
                <option key={index + 18} value={index + 18}>
                  {index + 18}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    )
  }
} 

export default AgeFormField;
