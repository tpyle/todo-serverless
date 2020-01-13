const config = require('./config');
const uuid = require('uuid/v4');

module.exports = {
    async getById (id) {
        let coll = await config.todo();
        let results = await coll.findOne({_id: id});
        return results
    },
    async getByUser(username) {
        if ( !config.schemas.todo.username.verify(username) ) {
            throw `Invalid username`;
        }
        let coll = await config.todo();
        let results = await coll.find({username}).toArray();
        return results;
    },
    async createItem(username, title, description) {
        if ( !config.schemas.todo.username.verify(username) ) {
            throw `Invalid username`;
        }
        if ( !config.schemas.todo.title.verify(title) ) {
            throw `Invalid title`;
        }
        if ( !config.schemas.todo.description.verify(description) ) {
            throw `Invalid description`;
        }
        let newitem = {_id: uuid(), username, title, description, status: "Todo"};
        let coll = await config.todo();
        let results = await coll.insertOne(newitem);
        return results.insertedCount == 1;
    },
    async updateItem(id,{title,description,status}) {
        if ( !config.schemas.todo.id.verify(id) ) {
            throw `Invalid id`;
        }
        let updates = {};
        if ( title != undefined && !config.schemas.todo.title.verify(title) ) {
            throw `Invalid title`;
        } else if ( title != undefined ) {
            updates = { title, ...updates };
        }
        if ( description != undefined && !config.schemas.todo.description.verify(description) ) {
            throw `Invalid description`;
        } else if ( description != undefined ) {
            updates = { description, ...updates };
        }
        if ( status != undefined && !config.schemas.todo.status.verify(status) ) {
            throw `Invalid status`;
        } else if ( status != undefined ) {
            updates = { status, ...updates };
        }
        let coll = await config.todo();
        let results = await coll.updateOne({_id: id},{$set: updates});
        return results.modifiedCount == 1;
    },
    async deleteItem(id) {
        if ( !config.schemas.todo.id.verify(id) ) {
            throw `Invalid id`;
        }
        let coll = await config.todo();
        let results = await coll.removeOne({_id: id});
        return results.deletedCount == 1;
    }
}