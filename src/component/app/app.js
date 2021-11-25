import React, { Component } from "react";
import AddPanel from "../add-panel/add-panel";
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from "../item-status-filter";
import TodoList from '../todo-list';

import './app.css'

export default class App extends Component {
    constructor(props) {
        super(props);

        this.maxId = 1;

        this.state = {
            todoData: [
                this.createTodoItem('Learn React'),
                this.createTodoItem('Learn React-component'),
                this.createTodoItem('Drink Coffee'),
                this.createTodoItem('Build Awesome App'),
                this.createTodoItem('Resting'),
            ],
            term: '',
            filter: 'all',
        };

        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleDone = this.onToggleDone.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
    }

    createTodoItem(value) {
        return {
            value,
            important: false,
            done: false,
            id: this.maxId++,
        }
    }

    handleDeleteItem(id) {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((elem) => elem.id === id);

            const newTodoData = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)];

            return {
                todoData: newTodoData,
            };
        });
    };

    handleAddItem(text) {
        const newItem = this.createTodoItem(text)

        this.setState(({ todoData }) => {
            const newArr = [
                ...todoData,
                newItem];

            return {
                todoData: newArr
            };
        });
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((elem) => elem.id === id);
        const oldItem = arr[idx];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] }
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    onToggleImportant(id) {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };

    onToggleDone(id) {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    };

    onSearchChange(term) {
        this.setState({ term });
    }
    onFilterChange(filter) {
        this.setState({ filter });
    }

    search(items, term) {
        if (term.length === 0) {
            return items;
        };

        return (items.filter((item) => item.value.toLowerCase().indexOf(term.toLowerCase()) > -1));
    }

    filter(items, filter) {
        console.log(filter);

        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return ItemStatusFilter;
        };
    }



    render() {
        const { todoData, term, filter } = this.state
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        const visibleItems = this.filter(this.search(todoData, term), filter);

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel search-panel d-flex">
                    <SearchPanel
                        onSearchChange={this.onSearchChange}
                    />
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange}
                    />
                </div>
                <TodoList
                    todos={visibleItems}
                    onDeleted={this.handleDeleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <AddPanel
                    onItemAdded={this.handleAddItem}
                />
            </div >
        );
    }

};