import React from "react";
import CategoryBar from "./CategoryBar";
import $ from "jquery";
import Server from "../ServerInfo";

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      recentlyViewed: [],
      popularItems: [],
      searchResults: [],
      showSearchDropdown: false,
      cartItems: []
    };
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onLeaveSearch = this.onLeaveSearch.bind(this);
    this.onFocusSearch = this.onFocusSearch.bind(this);
    this.onNavigateTo = this.onNavigateTo.bind(this);

    this.hideTimeout = null;

    document.addEventListener('addToCart', (order)=>{
      console.log('add to cart clicked');
      this.setState({
        cartItems: [...this.state.cartItems, order]
      })
    });
  }

  componentDidMount() {
    $.ajax({
      url: Server.serverUrl + "/popular",
      method: "GET",
      success: popular => {
        this.setState({ popularItems: popular });
      }
    });
  }


  
  onChangeSearch(event) {
    const value = event.target.value;
    this.setState({ searchInput: value });
    $("#search-dropdown").addClass("show");
    $.ajax({
      url: Server.serverUrl + "/search",
      method: "POST",
      data: { query: value },
      success: results => {
        this.setState({ searchResults: results });
      }
    });
  }

  onLeaveSearch() {
    this.hideTimeout = setTimeout(() => {
      this.setState({ showSearchDropdown: false });
      this.hideTimeout = null;
    }, 200);
  }

  onFocusSearch() {
    if (this.hideTimeout !== null) {
      clearTimeout(this.hideTimeout);
    }
    this.setState({ showSearchDropdown: true });
  }

  onNavigateTo(event, item) {
    console.log(item);
    this.setState(oldState => {
      const recent = [...oldState.recentlyViewed];
      let oldIndex = -1;
      for (let i = 0; i < recent.length; i++) {
        if (recent[i].id === item.id) {
          oldIndex = i;
        }
      }
      if (oldIndex !== -1) {
        recent.splice(oldIndex, 1);
      }
      if (recent.length === 5) {
        recent.shift();
      }
      recent.push(item);
      return { recentlyViewed: recent, searchInput: item.name, searchResults: [item] };
    });
    let navigateEvent = new Event("onNavigate", { bubbles: true });
    navigateEvent.id = item.id;
    event.target.dispatchEvent(navigateEvent);
    $("#search-dropdown").removeClass("show");
  }

  get isShowingPopular() {
    return this.state.searchInput === "";
  }

  render() {

    return (
      <div className="container-navigation max-width">
        <div className="row d-flex align-items-center pb-2">
          <div className="col-md-1">
            <img
              src="https://www.stickpng.com/assets/images/5847f395cef1014c0b5e487f.png"
              className="img-fluid"
              alt="Logo"
            />
          </div>
          <div className="col-md-9">
            <div className="input-group input-group-lg navigation-search-group">
              <input
                type="text"
                className="form-control navigation-search-input"
                placeholder="Search for items or shops"
                value={this.state.searchInput}
                onChange={this.onChangeSearch}
                onBlur={this.onLeaveSearch}
                onFocus={this.onFocusSearch}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-search input-group-text"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18ZM10,4a6,6,0,1,0,6,6A6.007,6.007,0,0,0,10,4Z"></path>
                    <path d="M21,22a1,1,0,0,1-.707-0.293l-4-4a1,1,0,0,1,1.414-1.414l4,4A1,1,0,0,1,21,22Z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div
              className={
                "dropdown-menu" + (this.state.showSearchDropdown ? " show" : "")
              }
              aria-labelledby="search-dropdown"
              id="search-dropdown"
            >
              {this.isShowingPopular
                ? [
                    <h5 className="dropdown-title" key="popularTitle">
                      <strong>Popular right now</strong>
                    </h5>,
                    ...this.state.popularItems.map((item, index) => {
                      return (
                        <button
                          className="dropdown-item"
                          type="button"
                          onClick={e => this.onNavigateTo(e, item)}
                          key={index}
                        >
                          {item.name}
                        </button>
                      );
                    })
                  ]
                : this.state.searchResults.map((item, index) => {
                    return (
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={e => this.onNavigateTo(e, item)}
                        key={index}
                      >
                        {item.name.substring(0, this.state.searchInput.length)}
                        <strong>
                          {item.name.slice(this.state.searchInput.length)}
                        </strong>
                      </button>
                    );
                  })}
              {this.isShowingPopular &&
                this.state.recentlyViewed.length > 0 && [
                  <h5 className="dropdown-title" key="recentTitle">
                    <strong>Recently viewed</strong>
                  </h5>,
                  <div className="dropdown-title row d-inline-block" key="recentRow">
                    {this.state.recentlyViewed.map((item, index) => {
                      return (
                        <div key={index} className="w-20 recently-viewed-item embed-responsive embed-responsive-1by1 d-inline-block" onClick={(e) => this.onNavigateTo(e, item)}>
                        <img
                              className="embed-responsive-item"
                              src={item.image}
                            />
                        </div>
                      );
                    })}
                  </div>
                ]}
            </div>
          </div>
          <div className="col-md-2 d-flex justify-content-between pr-5">
          <span className="d-inline-block mr-3">Sign in</span>
          <span>
          {
            (this.state.cartItems.length > 0) &&
                (
                <span className="wt-badge wt-badge--notification-03 wt-badge--small wt-badge--outset-top-right wt-z-index-1 ge-cart-badge" id="cart-count" aria-hidden="true">
                {this.state.cartItems.length}
                </span>
                )
          }
          </span>
          <span className="d-inline-block cartIcon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="9" cy="20" r="2"></circle><circle cx="16" cy="20" r="2"></circle><path d="M21,5H5.665L4.978,1.79A1,1,0,0,0,4,1H1A1,1,0,0,0,1,3H3.191L6.022,16.21a0.962,0.962,0,0,0,.064.159,1.015,1.015,0,0,0,.063.155,0.978,0.978,0,0,0,.133.153,1.006,1.006,0,0,0,.088.1,1,1,0,0,0,.185.105,0.975,0.975,0,0,0,.107.06A0.994,0.994,0,0,0,7,17H18a1,1,0,0,0,.958-0.713l3-10A1,1,0,0,0,21,5Zm-2.244,5H16V7h3.656ZM7.819,15l-0.6-3H9v3H7.819ZM11,12h3v3H11V12Zm0-2V7h3v3H11ZM9,7v3H6.82L6.22,7H9Zm8.256,8H16V12h2.156Z"></path></svg></span>
          </div>
        </div>
        <CategoryBar />
      </div>
    );
  }
}
