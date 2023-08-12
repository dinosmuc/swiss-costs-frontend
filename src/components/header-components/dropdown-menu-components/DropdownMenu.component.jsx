import React from 'react';

class DropdownMenu extends React.Component {
    handleItemMouseEnter = (item) => {
        this.props.onItemHover(item);
    }

    handleItemClick = (event, item) => {
        event.preventDefault();
        this.props.onItemSelect(item);
    }
    
    render() {
        return (
            <div className="dropdown-menu">
                {this.props.items.map((item, index) => (
                    <a href={`/${item}`} 
                       key={index}
                       onMouseEnter={() => this.handleItemMouseEnter(item)} 
                       onClick={(event) => this.handleItemClick(event, item)}>
                           {item}
                    </a>
                ))}
            </div>
        );
    }
}

export default DropdownMenu;
