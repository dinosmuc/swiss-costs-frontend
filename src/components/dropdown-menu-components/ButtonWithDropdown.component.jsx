import React from 'react';
import '../button-components/button.style.scss';
import DropdownMenu from './DropdownMenu.component'; // Replace with the actual import in your project
import Button from '../button-components/Button.component';  // Replace with the actual import in your project

class ButtonWithDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            isHovered: false,
            displayedItem: props.defaultItem,
            selectedItem: props.defaultItem
        };
    }

    handleMouseEnter = () => {
        this.setState({ isHovered: true });
    }

    handleMouseLeave = () => {
        this.setState({ 
            isHovered: false, 
            displayedItem: this.state.selectedItem
        });
    }

    handleItemHover = (item) => {
        this.setState({ displayedItem: item });
    }

    handleItemSelect = (item) => {
        this.setState({
            displayedItem: item, 
            selectedItem: item,
            isHovered: false
        });
    }

    render() {
        return (
            <div className="button-container"
                 onMouseEnter={this.handleMouseEnter}
                 onMouseLeave={this.handleMouseLeave}>
                <Button>{this.state.displayedItem}</Button> {/* Use Button component here */}
                {this.state.isHovered && 
                 <DropdownMenu 
                     items={this.props.items}
                     onItemHover={this.handleItemHover} 
                     onItemSelect={this.handleItemSelect} 
                 />}
            </div>
        );
    }
}

export default ButtonWithDropdown;
