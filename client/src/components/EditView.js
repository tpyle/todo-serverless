import React, { Component } from 'react';
import { getItem, delItem, updateItem } from './utils/api';
import { Redirect } from 'react-router-dom';
import Loader from './Loader';

class EditView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            err: undefined,
            item: undefined,
            done: false
        };
        this.id = this.props.match.params.id;
        getItem(this.id)
            .then(item=>this._mounted && this.setState({ item }))
            .catch(err=>this._mounted && this.setState({ err }));
    }
    componentDidMount() {
        this._mounted = true;
    }
    componentWillUnmount() {
        this._mounted = false;
    }
    submit(e) {
        e.preventDefault();
        let title = document.getElementById('title').value;
        let description = document.getElementById('description').value;
        let status = document.getElementById('status').value;
        updateItem(this.id, { title, description, status })
            .then(_=>this._mounted && this.setState({ done: true }))
            .catch(err=>this._mounted && this.setState({ err }));
    }
    delete() {
        delItem(this.id)
            .then(_=>this._mounted && this.setState({ done: true }))
            .catch(err=>this._mounted && this.setState({ err }));
    }
    render () {
        if (this.state.done || (this.state.err && this.state.err.response.status === 400)) {
            return <Redirect to="/" />
        }
        if (this.state.item === undefined) {
            return <Loader />;
        }
        return (
        <main className="container mt-2">
            <form autoComplete="off" onSubmit={this.submit.bind(this)} className="text-left">
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" className="form-control" id="title" placeholder="What do you need to do?" defaultValue={this.state.item.title} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea className="form-control" id="description" placeholder="Give your item a description" defaultValue={this.state.item.description} required></textarea>
                </div>
                <div className="form-group">
                    <select id="status" className="custom-select" defaultValue={this.state.item.status}>
                        <option value="Todo">Todo</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                        <option value="Backlog">Backlog</option>
                    </select>
                </div>
                <button type="button" onClick={this.delete.bind(this)} className="btn-circle btn-xl btn btn-danger float-right"><i className="fas fa-trash-alt"></i></button>
                <button className="btn btn-primary">Update</button>
                {this.state.err && <div className="alert alert-danger clickable mr-6">Something went wrong with the request - click here to try again!</div>}
            </form>
        </main>);
    }
}

export default EditView;
