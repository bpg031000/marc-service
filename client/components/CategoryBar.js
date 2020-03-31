import React from 'react';

export default class CategoryBar extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            showDropdown: false,
            categories: {
                "0": [
                    {
                        name: "Pistols",
                        subCategories: [
                            {
                                name: "Glock",
                                subcategories: [
                                    "Beanies & Winter Hats"
                                ]
                            },
                            {
                                name: "Desert Eagle",
                                subcategories: []
                            }
                        ]
                    },
                    {
                        name: "Assault Rifles",
                        subCategories: [
                            {
                                name: "AK-47",
                                subcategories: [
                                    "Beanies & Winter Hats"
                                ]
                            },
                            {
                                name: "Hair Accessories",
                                subcategories: []
                            }
                        ]
                    },
                    {
                        name: "Shotguns",
                        subCategories: {
                            "Hats & Caps": {
                                subcategories: [
                                    "Beanies & Winter Hats"
                                ]
                            },
                            "Hair Accessories": {
                                subcategories: []
                            }
                        }
                    },
                    {
                        name: "Ammo",
                        subCategories: {
                            "Pistaol Ammo": {
                                subcategories: [
                                    "Beanies & Winter Hats"
                                ]
                            },
                            "Rifle Ammo": {
                                subcategories: {

                                }
                            },
                            "Shotgun Ammo": {
                                subcategories: {

                                }
                            }
                        }
                    }
                ],
                "1": [
                    {
                        name: "Shirts",
                        subCategories: [
                            {
                                name: "T-Shirts",
                                subcategories: []
                            },
                            {
                                name: "Long Sleeve",
                                subcategories: []
                            }
                        ]
                    },
                    {
                        name: "Hats",
                        subCategories: [
                            {
                                name: "Beanies",
                                subcategories: []
                            },
                            {
                                name: "Face Masks",
                                subcategories: []
                            },
                            {
                                name: "Cowboy Hats",
                                subcategories: []
                            }
                        ]
                    },
                ],
                "2": [],
                "3": [],
                "4": [],
                "5": [],
                "6": [],
                "7": []
            },
            currentCategory: null,
            currentSubCategory: null,
        };
        this.inDropdown = false;
        this.hideTimeout = null;

        this.onHoverCategory = this.onHoverCategory.bind(this);
        this.onLeaveCategory = this.onLeaveCategory.bind(this);
        this.onHoverDropdown = this.onHoverDropdown.bind(this);
        this.onLeaveDropdown = this.onLeaveDropdown.bind(this);
        this.onHoverSubcategory = this.onHoverSubcategory.bind(this);
    }

    componentDidCatch() {

    }

    onHoverCategory(category) {
        if (this.hideTimeout !== null) {
            clearTimeout(this.hideTimeout);
        }
        this.setState({ currentCategory: category, showDropdown: true });
        $("#category-dropdown").addClass("show");
    }

    onHoverSubcategory(subCategory) {
        this.setState({currentSubCategory: subCategory});
    }

    onLeaveCategory(event) {
        this.hideTimeout = setTimeout(() => this.setState({ showDropdown: false, currentSubCategory: null }), 200);
    }

    onHoverDropdown(event) {
        if (this.hideTimeout !== null) {
            clearTimeout(this.hideTimeout);
        }
        this.inDropdown = true;
    }

    onLeaveDropdown(event) {
        this.setState({ showDropdown: false });
    }



    render() {
        return (
            <div className="max-width">
                <div className="row categories-bar">
                    <div className="col" onMouseEnter={() => this.onHoverCategory(0)} onMouseLeave={this.onLeaveCategory}><a href="#">Weapons & Ammo</a></div>
                    <div className="col" onMouseEnter={() => this.onHoverCategory(1)} onMouseLeave={this.onLeaveCategory}><a href="#">Armor & Clothing</a></div>
                    <div className="col" onMouseEnter={() => this.onHoverCategory(2)} onMouseLeave={this.onLeaveCategory}><a href="#">Medical Supplies</a></div>
                    <div className="col" onMouseEnter={() => this.onHoverCategory(3)} onMouseLeave={this.onLeaveCategory}><a href="#">Rations</a></div>
                    <div className="col" onMouseEnter={() => this.onHoverCategory(4)} onMouseLeave={this.onLeaveCategory}><a href="#">Home Defense</a></div>
                    <div className="col" onMouseEnter={() => this.onHoverCategory(5)} onMouseLeave={this.onLeaveCategory}><a href="#">Tools</a></div>
                    <div className="col" onMouseEnter={() => this.onHoverCategory(6)} onMouseLeave={this.onLeaveCategory}><a href="#">Vehicles & Parts</a></div>
                    <div className="col" onMouseEnter={() => this.onHoverCategory(7)} onMouseLeave={this.onLeaveCategory}><a href="#">Technology</a></div>
                </div>
                <div className={"dropdown-menu max-width" + (this.state.showDropdown ? " show" : "")} aria-labelledby="category-dropdown" id="category-dropdown" onMouseEnter={this.onHoverDropdown} onMouseLeave={this.onLeaveDropdown}>
                    <div className="row">
                        <div className="col-md-4">
                            {this.state.currentCategory !== null ? this.state.categories[this.state.currentCategory].map((cat, index) => {
                                return <button className="dropdown-item" type="button" key={index} onMouseEnter={() => this.onHoverSubcategory(index)}>{cat.name}</button>
                            }) : null}
                        </div>
                        <div className="col-md-8">
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}