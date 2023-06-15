import React from 'react';

class CantonFormField extends React.Component {
  constructor(props) {
    super(props);

    this.cantons = [
      'Aargau', 'Appenzell Ausserrhoden', 'Appenzell Innerrhoden', 'Basel-Landschaft',
      'Basel-Stadt', 'Bern', 'Fribourg', 'Geneva', 'Glarus', 'Graubünden', 'Jura',
      'Lucerne', 'Neuchâtel', 'Nidwalden', 'Obwalden', 'Schaffhausen', 'Schwyz',
      'Solothurn', 'St. Gallen', 'Thurgau', 'Ticino', 'Uri', 'Valais', 'Vaud', 'Zug', 'Zürich'
    ];
  }

  handleChange = (event) => {
    this.props.onChange(event);  
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <label>
            Canton:
            <select name="canton" value={this.props.canton} onChange={this.handleChange}>
              {this.cantons.map(canton => (
                <option key={canton} value={canton}>{canton}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
    );
  }
}

export default CantonFormField;
