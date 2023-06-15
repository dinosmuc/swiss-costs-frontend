import React from 'react';

class EducationOptionFormField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [
        {value: "none", label: "None"},
        {value: "public_school", label: "Public School"},
        {value: "private_school", label: "Private School"},
        {value: "international_school", label: "International School"},
        {value: "university", label: "University"},
        // You may add more options if you have more education types
      ]
    };
  }

  render() {
    const { options } = this.state;
    const { name, onChange, education } = this.props;

    return (
      <div>
        <label>
          Education Options:
          <select name={name} value={education} onChange={onChange}>
            {options.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
      </div>
    );
  }
}

export default EducationOptionFormField;
