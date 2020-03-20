import React from 'react';
import './SearchBar.css';


class SearchBar extends React.Component
{
    constructor(props) {
        super(props);
        
        this.state = {
            term: '',               // refers to search term in the search input
            location: '',           // refers to the location to search near from the location input
            sortBy: 'best_match'    // refers to the selected sorting option to use
        };
        
        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count'
        };

            //binding the handlers of term and location inputs to the 'this' object
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    
    //                                      *** Sort By Options area - displaying and handling changes ***

            // returns the current CSS class of the sort options, impacting whether or not each one should be styled as if it has been selected
    
    getSortByClass(sortByOption) {
        if (this.state.sortBy === sortByOption)
                return 'active';
            else
                return '';
    }

        // sets the state of a sorting option
    handleSortByChange(sortByOption) {
        this.setState({
            sortBy: sortByOption
        });
    }

        // dynamically create the list items for displaying the sort options (Best Match etc.)
    renderSortByOptions() {

            //access the keys of the "sortByOptions" object
        return Object.keys(this.sortByOptions)

                    // iterate through the keys of the "sortByOptions" object and store their corresponding values in "sortByOptionValue"
                .map(sortByOption => {
                let sortByOptionValue = this.sortByOptions[sortByOption];

                
                return (<li key = { sortByOptionValue }
                            className = { this.getSortByClass(sortByOptionValue) }
                            onClick = { this.handleSortByChange.bind(this, sortByOptionValue) } 
                            
                            > {sortByOption} </li>)
                        
                            /*  for className: makes sure to conditionally style each sortByOption,
                                displaying to the user which sorting option is currently selected
                            */

                            /*  for onClick: the event handler both binds to the current value of "this" (as usual in constructor),
                            and also binds the current "sortByOptionValue" as the first argument to the method call,
                            ensuring the method is called with the appropriate value when clicked.
                            */
                });
    }
    
    //                                              *** Event handlers for the term and location inputs ***
    handleTermChange(event) {
        this.setState({
            term: event.target.value
        });
    }   
    
    handleLocationChange(event) {
        this.setState({
            location: event.target.value
        });
    }

    //                                               *** Event handler for the search button ***
    handleSearch(event) {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        event.preventDefault();
    }

    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        { this.renderSortByOptions() }
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input placeholder="Search Businesses" onChange = { this.handleTermChange } />
                    <input placeholder="Where?" onChange = { this.handleLocationChange } />
                </div>
                <div className="SearchBar-submit">
                    <a onClick = { this.handleSearch }>Let's Go</a>
                </div>
            </div>
        )
    }
}

export default SearchBar;
