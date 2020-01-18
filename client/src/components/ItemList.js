import React, { Component } from 'react';
import Item from './Item';
import { getItems, createItem } from './utils/api';
import Loader from './Loader.js'

class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: undefined,
            failed: false
        }
        getItems().then(items=>{
            this.setState({ items: items || [], failed: false });
        }).catch(err=>{
            console.error(err);
            this.setState({ failed: true, items: [] });
        });
    }
    refresh() {
        this.setState({ items: undefined, failed: false });
        getItems().then(items=>{
            this.setState({ items, failed: false });
        }).catch(err=>{
            console.error(err);
            this.setState({ failed: true, items: [] });
        });
    }
    submit(e) {
        e.preventDefault();
        let title = document.getElementById('title').value;
        let description = document.getElementById('description').value;
        document.getElementById('title').value = "";
        document.getElementById('description').value = "";
        createItem(title, description).then(items=>{
            this.setState({ items, failed: false });
        }).catch(err=>{
            console.error(err);
            this.setState({ items: [], failed: true });
        });
    }
    render () {
        return (
        <main className="container mt-2">
            <form autoComplete="off" onSubmit={this.submit.bind(this)} className="text-left">
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" className="form-control" id="title" placeholder="What do you need to do?" required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea className="form-control" id="description" placeholder="Give your item a description" required></textarea>
                </div>
                <button className="btn-circle btn-xl btn btn-primary float-right"><i className="fas fa-plus"></i></button>
                {this.state.failed && <div className="alert alert-danger clickable mr-6" onClick={this.refresh.bind(this)}>Something went wrong with the request - click here to try again!</div>}
            </form>
            <div className="row" id="itemlist">
                {this.state.items ? this.state.items.map(item=>(<Item key={item._id} item={item} />)) : <Loader /> }
            </div>
        </main>);
    }
}

export default ItemList;
