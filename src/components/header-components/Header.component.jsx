import React from 'react';
import './header.styles.scss'
import ButtonWithDropdown from './dropdown-menu-components/ButtonWithDropdown.component'; 




class Header extends React.Component {
  render() {
    return (

      <div className='header'>
        <div className="button-container">
          <div className="button-wrapper">
            <div className="button-left">
              <ButtonWithDropdown 
                items={['CHF', 'EUR']}
                defaultItem='CHF'
              />
            </div>
            <div className="button-right">
              <ButtonWithDropdown 
                items={['English', 'German', 'Croatian']}
                defaultItem='English'
              />
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Header;
