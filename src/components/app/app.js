import React from 'react';

import PostAddForm from '../post-add-form/post-add-form';
import AppHeader from '../app-header/app-header';
import PostList from '../post-list/post-list';
import PostStatusFilter from '../post-status-filter.js/post-status-dilter'
import SearchPanel from '../search-panel/search-panel'

import './app.css';

const App = () => {

    const data = [
        {label: 'Going to learn react', impottant: true, id: 1},
        {label: 'That is so good', impottant: false, id: 2},
        {label: 'I need a breack...', impottant: false, id: 3},
    ]

    return (
        <div className="app">
            <AppHeader/>
            <div className="search-panel d-flex">
                <SearchPanel/>
                <PostStatusFilter/>
            </div>
            <PostList posts={data}/>
            <PostAddForm/>
        </div>
    )
}

export default App;