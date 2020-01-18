import React, { Component } from 'react';
import ItemList from './components/ItemList';
import EditView from './components/EditView';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import { ping } from './components/utils/api';

class App extends Component {
    render() {
		return (
			<div className="App">
				<header className="App-header p-2 bg-primary shadow-sm">
					<nav className="navbar navbar-dark p-0">
						<Link class="navbar-brand" to="/">ToDo</Link>
					</nav>
				</header>
				<Switch>
					<Route path="/:id" component={EditView} />
					<Route path="/">
						<ItemList />
					</Route>
				</Switch>
			</div>
		);
    }
}

export default App;
