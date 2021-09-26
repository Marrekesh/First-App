import React, {Component} from 'react';

import PostAddForm from '../post-add-form/post-add-form';
import AppHeader from '../app-header/app-header';
import PostList from '../post-list/post-list';
import PostStatusFilter from '../post-status-filter.js/post-status-dilter'
import SearchPanel from '../search-panel/search-panel'

import './app.css';

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = { 
            data : [
                {label: 'Going to learn react', impottant: true, like: false, id: 1},
                {label: 'That is so good', impottant: false, like: false, id: 2},
                {label: 'I need a breack...', impottant: false, like: false, id: 3},
            ],
            term: '',
            filter: 'all'
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onImportant = this.onImportant.bind(this);
        this.onLike = this.onLike.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

        this.maxId = 4;
    }

    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const before = data.slice(0, index);
            const after = data.slice(index + 1);

            const newArr = [...before, ...after];
            return {
                data: newArr
            }
        })
    }

    addItem(body) {
        const newItem = {
            label: body,
            impottant: true, 
            like: false, 
            id: this.maxId++
        }

        this.setState(({data}) => {
            const newArr = [...data, newItem]

            return {
                data: newArr
            }
        })
    }

    onImportant(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, important: !old.important};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return {
                data: newArr
            }
        })
    }

    onLike(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, like: !old.like};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return {
                data: newArr
            }
        })
    }

    searchPost(items, term) {
        if (term.length === 0) {
            return items
        }

        return items.filter((item) => {
            return item.label.indexOf(term) > -1
        })
    }

    filterPosts(items, filter){
        if (filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items
        }
    }

    onUpdateSearch(term) {
        this.setState({term: term})
    }

    onFilterSelect(filter) {
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state;

        const liked = data.filter((item) => item.like).length;
        const allPosts = data.length;

        const visiblePost = this.filterPosts(this.searchPost(data, term), filter);

        return (
            <div className="app">
                <AppHeader
                liked={liked} allPosts={allPosts}/>
                <div className="search-panel d-flex">
                    <SearchPanel
                    onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect = {this.onFilterSelect}/>
                </div>
                <PostList
                    posts={visiblePost}
                    deleteItem={this.deleteItem}
                    onImportant={this.onImportant}
                    onLike={this.onLike}/>
                <PostAddForm addItem={this.addItem}/>
            </div>
        )
    }

}

