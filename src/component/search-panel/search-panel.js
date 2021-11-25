import React, { Component } from "react";

import './search-panel.css'

export default class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
        this.textSearch = "Type here to search";
        this.searchStyle = {
            fontWeight: "bold",
            fontSize: "16px"
        }

        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onSearchChange(e) {
        const term = e.target.value;
        this.setState({ term });
        this.props.onSearchChange(term)
    }
    render() {
        const { term } = this.state;
        return (
            <input
                style={this.searchStyle}
                placeholder={this.textSearch}
                className='search-field'
                onChange={this.onSearchChange}
                value={term}
            />
        );
    }
};
