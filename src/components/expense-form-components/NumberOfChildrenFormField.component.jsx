import React from "react";

class NumberOfChildrenFormField extends React.Component {
    
    handleChange = (event) => {
      this.props.onChange(event);  
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                  <label>   
                    Number of Children:
                    <select name="numChildren" value={this.props.numChildren} onChange={this.handleChange}>
                      {[...Array(11).keys()].map((num) => 
                        <option key={num} value={num}>{num}</option>
                      )}
                    </select>
                  </label>
                </div>
            </div>
        )
    }       
}

export default NumberOfChildrenFormField;
