import React from 'react';
import '../button-components/button.style.scss';
import DropdownMenu from './DropdownMenu.component';

class ButtonWithDropdown extends React.Component {
    constructor() {
        super();
        this.state = { 
            isHovered: false,
            displayedLanguage: 'English',  // Language currently displayed on the button
            selectedLanguage: 'English'    // Language that has been selected with a click
        };
    }

    handleMouseEnter = () => {
        this.setState({ isHovered: true });
    }

    handleMouseLeave = () => {
        this.setState({ 
            isHovered: false, 
            displayedLanguage: this.state.selectedLanguage  // Revert to the selected language when not hovering over the menu
        });
    }

    handleLanguageHover = (language) => {
        this.setState({ displayedLanguage: language });  // Update the displayed language when hovering over a menu item
    }

    handleLanguageSelect = (language) => {
        this.setState({  // Update both displayed and selected languages when a menu item is clicked
            displayedLanguage: language, 
            selectedLanguage: language,
            isHovered: false  // Hide the dropdown
        });
    }

    render() {
        return (
            <div className="button-container"
                 onMouseEnter={this.handleMouseEnter}
                 onMouseLeave={this.handleMouseLeave}>
                <button className="my-button">{this.state.displayedLanguage}</button>
                {this.state.isHovered && 
                 <DropdownMenu 
                     onLanguageHover={this.handleLanguageHover} 
                     onLanguageSelect={this.handleLanguageSelect} 
                 />}
            </div>
        );
    }
}

export default ButtonWithDropdown;

