import React from 'react';

export default class CategoryBar extends React.Component {
    constructor(props) {
        super(props);

        this.onHoverCategory = this.onHoverCategory.bind(this);
        this.state = {
            
        };
    }

    onHoverCategory(event) {
        console.log(event.target.getAttribute('value'));
        $("#category-dropdown").addClass("show");
    }

    

    render() {
        return (
            <div className="max-width">
                <div className="row categories-bar">
                    <div className="col" value="test" onMouseEnter={this.onHoverCategory}><a href="#">Jewelry & Accessories</a></div>
                    <div className="col"><a href="#">Clothing & Shoes</a></div>
                    <div className="col"><a href="#">Home & Living</a></div>
                    <div className="col"><a href="#">Wedding & Party</a></div>
                    <div className="col"><a href="#">Toys & Entertainment</a></div>
                    <div className="col"><a href="#">Art & Collectibles</a></div>
                    <div className="col"><a href="#">Craft Supplies</a></div>
                    <div className="col"><a href="#">Vintage</a></div>
                </div>
                <div className="dropdown-menu max-width" aria-labelledby="category-dropdown" id="category-dropdown">
                    <div className="row">
                        <div className="col-md-4">
                            <button className="dropdown-item" type="button">Action</button>
                            <button className="dropdown-item" type="button">Another action</button>
                            <button className="dropdown-item" type="button">Something else here</button>
                            <button className="dropdown-item" type="button">Something else here</button>
                            <button className="dropdown-item" type="button">Something else here</button>
                            <button className="dropdown-item" type="button">Something else here</button>
                            <button className="dropdown-item" type="button">Something else here</button>
                        </div>
                        <div className="col-md-8"></div>
                    </div>
                </div>
            </div>
        )
    }
}