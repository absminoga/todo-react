import React, { Component } from "react";
import './add-panel.css'

export default class AddPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            label: '',
        };

        this.onLabelChange = this.onLabelChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    onLabelChange(e) {
        this.setState({
            label: e.target.value,
        });
    };

    onSubmit(e) {
        e.preventDefault();
        this.props.onItemAdded(this.state.label);
        this.setState({
            label: ''
        })
    };

    render() {
        return (
            <form
                className="d-grid gap-2 d-flex add-panel"
                onSubmit={this.onSubmit}
            >
                <input
                    type='text'
                    placeholder='Enter the task'
                    className='text-control'
                    onChange={this.onLabelChange}
                    value={this.state.label}
                />
                <button
                    className="btn btn-outline-success add-panel__btn"
                >
                    Add
                </button>
            </form>
        )
    }
}