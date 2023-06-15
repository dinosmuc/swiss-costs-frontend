import React from "react";

class ChurchMemberFormField extends React.Component {
  
    handleChange = (event) => {
        this.props.onChange(event);
    }

    render() {
     return (
        <div className="row">
            <div className="col-md-6">  
              <label>
                Church Member:
                <select name="churchMember" value={this.props.churchMember} onChange={this.handleChange}>
                  <option value="church_member">A church member</option>
                  <option value="not_church_member">Not a church member</option>
                </select>
              </label>
            </div>
        </div>
     );
    }
}

export default ChurchMemberFormField;
