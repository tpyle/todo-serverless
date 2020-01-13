import React, { Component } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

class Item extends Component {
    render() {
        return (
        <div className="col-xl-4 col-lg-6 col-12 py-2 item">
            <div className="card shadow-sm h-100">
                <div className="card-block p-2 h-100">
                    <Link to={`/${this.props.item._id}`} className="btn-circle btn btn-primary mr-1 mt-1 position-absolute top-right pt-1 pl-1">
                        <i className="fas fa-edit"></i>
                    </Link>
                    <h3 className="card-title mx-4 px-2">{this.props.item.title}</h3>
                    <div className="card-text mb-5">
			{this.props.item.description.split("\n").map(line=><p>{line}</p>)}
		    </div>
                    <div className="col-12 bottom">
                        <span className={`dot mr-2 ${{Done: 'bg-success', Todo: "bg-secondary", "In Progress": "bg-primary", Backlog: "bg-warning"}[this.props.item.status]}`}></span><div className="h-100 py-auto d-inline">{this.props.item.status}</div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Item;
