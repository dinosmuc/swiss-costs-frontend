import React from 'react';
import '../button-components/button.styles.scss';
import DropdownMenu from './DropdownMenu.component'; 
import Button from '../button-components/Button.component';  

class ButtonWithDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            isHovered: false,
            displayedItem: props.defaultItem,
            selectedItem: props.defaultItem,
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
            isHovered: false,
        });
    }

    render() {
        return (
            <div className="myUniqueButton-container"
                 onMouseEnter={this.handleMouseEnter}
                 onMouseLeave={this.handleMouseLeave}>
                <Button className={this.state.isHovered ? 'button-open' : ''}>{this.state.displayedItem}</Button>
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
