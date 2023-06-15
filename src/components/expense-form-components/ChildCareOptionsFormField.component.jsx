import React from 'react';

class ChildCareOptionsFormField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [
        {value: "none", label: "None"},
        {value: "home_based", label: "Home-based Childcare"},
        {value: "daycare_center", label: "Daycare Center"}, // Changed from "day_care"
        {value: "nanny", label: "Nanny"},
        {value: "au_pair", label: "Au Pair"}, // Added option for "Au Pair"
        
      ]
    };
  }

  render() {
    const { options } = this.state;
    const { name, onChange, childcare } = this.props;

    return (
      <div>
        <label>
          Child Care Options:
          <select name={name} value={childcare} onChange={onChange}>
            {options.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
      </div>
    );
  }
}

export default ChildCareOptionsFormField;
