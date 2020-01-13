import React, { Component } from 'react';
import ItemList from './components/ItemList';
import EditView from './components/EditView';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import { ping } from './components/utils/api';

class App extends Component {
    constructor(props) {
	super(props);
	process.env.REACT_APP_AUTHENTICATION_SERVER && 
	    ping()
	    .then(pong=>setInterval(this.ping.bind(this),2000))
	    .catch(err=>
		   window.location.assign(`${process.env.REACT_APP_AUTHENTICATION_SERVER}${encodeURIComponent(window.location.href)}`));
    }
    ping() {
	ping().catch(err=>{
	    window.location.assign(`${process.env.REACT_APP_AUTHENTICATION_SERVER}${encodeURIComponent(window.location.href)}`);
	});
    }
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
