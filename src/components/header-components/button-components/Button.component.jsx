import React from 'react';
import './button.styles.scss';

class MyUniqueButton extends React.Component {
  render() {
    return (
      <button className={`myUniqueButton ${this.props.className}`}>
        {this.props.children}
        <span className="myUniqueButton-dropdown-arrow"></span> 
      </button>
    );
  }
}

export default MyUniqueButton;