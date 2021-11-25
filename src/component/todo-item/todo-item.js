import React, { Component } from "react";
import './todo-item.css'

export default class TodoItem extends Component {

    render() {
        const { value, onDeleted, onToggleImportant, onToggleDone, important, done } = this.props;

        let classNames = 'todo-item-label';
        if (done) classNames += ' done';
        if (important) classNames += ' important';


        return (
            <span className='todo-item d-flex'>
                <span
                    className={classNames}
                    onClick={onToggleDone}>
                    {value}
                </span>
                <span className="item-block_btn">
                    <button
                        type='button'
                        className='btn btn-outline-success btn-sm'
                        onClick={onToggleImportant}>
                        <i className="fa fa-exclamation" />
                    </button>
                    <button
                        type='button'
                        className='btn btn-outline-success btn-sm btn-trash'
                        onClick={onDeleted}>
                        <i className="fa fa-trash" />
                    </button>
                </span>
            </span>
        );
    }
};
