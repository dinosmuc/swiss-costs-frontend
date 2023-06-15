import React from "react";

class PublicTransportFormField extends React.Component {
  constructor(props) {
    super(props);

    this.publicTransportOptions = ['rarely', 'occasionally', 'weekly', 'daily', 'occasional'];

  }

  handleChange = (event) => {
    this.props.onChange(event);  
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <label>
            Public Transport Usage:
            <select name="publicTransport" value={this.props.publicTransport} onChange={this.handleChange}>
              {this.publicTransportOptions.map(option => (
                <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
    )
  }
}

export default PublicTransportFormField;
