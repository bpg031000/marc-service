import React from 'react';
import CategoryBar from './CategoryBar';
import $ from 'jquery';

export default class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchInput: "",
            recentlyViewed: [],
            popularItems: [],
            searchResults: [],
            showSearchDropdown: false,
        }
        this.navigateEvent = new Event("onNavigate", { bubbles: true });
        document.addEventListener('onNavigate', () => {
            console.log("change pages");
        });
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onLeaveSearch = this.onLeaveSearch.bind(this);
        this.onFocusSearch = this.onFocusSearch.bind(this);
        this.onNavigateTo = this.onNavigateTo.bind(this);

        this.hideTimeout = null;
    }

    componentDidMount() {
        $.ajax({
            url: "/popular",
            method: "GET",
            success: (popular) => {
                this.setState({ popularItems: popular });
            }
        })
    }

    onChangeSearch(event) {
        const value = event.target.value;
        this.setState({ searchInput: value });
        $("#search-dropdown").addClass('show');
        $.ajax({
            url: "/search",
            method: "POST",
            data: { query: value },
            success: (results) => {
                this.setState({ searchResults: results });
            }
        })
    }

    onLeaveSearch() {
        this.hideTimeout = setTimeout(() => {
            this.setState({showSearchDropdown: false});
            this.hideTimeout = null;
        }, 200);
    }

    onFocusSearch() {
        if (this.hideTimeout !== null) {
            clearTimeout(this.hideTimeout);
        }
        this.setState({showSearchDropdown: true});
    }

    onNavigateTo(event, id) {
        console.log("got: ", id);
        this.setState((oldState) => {
            const recent = [...oldState.recentlyViewed];
            let oldIndex = recent.indexOf(id);
            if (oldIndex !== -1) {
                recent.splice(oldIndex, 1);
            }
            if (recent.length === 5) {
                recent.shift();
            }
            recent.push(id);
            return { recentlyViewed: recent };
        });
        event.target.dispatchEvent(this.navigateEvent);
        $("#search-dropdown").removeClass('show');
    }

    get isShowingPopular() {
        return this.state.searchInput === "";
    }


    render() {
        return (
            <div className="container-navigation max-width">
                <div className="row d-flex align-items-center">
                    <div className="col-md-1"><img src="https://www.stickpng.com/assets/images/5847f395cef1014c0b5e487f.png" className="img-fluid" alt="Logo" /></div>
                    <div className="col-md-9">
                        <div className="input-group input-group-lg navigation-search-group">
                            <input type="text" className="form-control navigation-search-input" placeholder="Search for items or shops" onChange={this.onChangeSearch} onBlur={this.onLeaveSearch} onFocus={this.onFocusSearch} />
                            <div className="input-group-append">
                                <button className="btn btn-search input-group-text" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18ZM10,4a6,6,0,1,0,6,6A6.007,6.007,0,0,0,10,4Z"></path><path d="M21,22a1,1,0,0,1-.707-0.293l-4-4a1,1,0,0,1,1.414-1.414l4,4A1,1,0,0,1,21,22Z"></path></svg>
                                </button>
                            </div>
                        </div>
                        <div className={"dropdown-menu" + (this.state.showSearchDropdown ? " show" : "")} aria-labelledby="search-dropdown" id="search-dropdown">
                            {this.isShowingPopular ? [(<h5 className="dropdown-title" key="popularTitle"><strong>Popular right now</strong></h5>), ...this.state.popularItems.map((item, index) => {
                                return (
                                    <button className="dropdown-item" type="button" onClick={(e) => this.onNavigateTo(e, item.id)} key={index}>{item.name}</button>
                                );
                            })] : this.state.searchResults.map((item, index) => {
                                return (
                                    <button className="dropdown-item" type="button" onClick={(e) => this.onNavigateTo(e, item.id)} key={index}>{item.name}</button>
                                );
                            })}
                            {(this.isShowingPopular && this.state.recentlyViewed.length > 0) && [<h5 className="dropdown-title" key="recentTitle"><strong>Recently viewed</strong></h5>, <div className="row" key="recentRow">
                                {this.state.recentlyViewed.map((item, index) => {
                                    return <div key={index} className="col">{item}</div>
                                })}
                            </div>]}
                        </div>
                    </div>
                    <div className="col-md-2">signin</div>
                </div>
                <CategoryBar />
            </div>);
    }

}