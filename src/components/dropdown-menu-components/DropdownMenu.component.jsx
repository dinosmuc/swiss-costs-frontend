import React from 'react';

class DropdownMenu extends React.Component {
    handleLanguageMouseEnter = (language) => {
        this.props.onLanguageHover(language);
    }

    handleLanguageClick = (event, language) => {
        event.preventDefault();  // This prevents the default action of the anchor tag
        this.props.onLanguageSelect(language);
    }
    

    render() {
        return (
            <div className="dropdown-menu">
                <a href="/en" 
                   onMouseEnter={() => this.handleLanguageMouseEnter('English')} 
                   onClick={(event) => this.handleLanguageClick(event, 'English')}>
                       English
                </a>
                <a href="/de" 
                   onMouseEnter={() => this.handleLanguageMouseEnter('German')} 
                   onClick={(event) => this.handleLanguageClick(event, 'German')}>
                       German
                </a>
                <a href="/hr" 
                   onMouseEnter={() => this.handleLanguageMouseEnter('Croatian')} 
                   onClick={(event) => this.handleLanguageClick(event, 'Croatian')}>
                       Croatian
                </a>
            </div>
        );
    }
}

export default DropdownMenu;
