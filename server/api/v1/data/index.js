const AWS = require('aws-sdk');
const uuid = require('uuid');

const TABLE_NAME = "todo-table";
const dynamoDB = new AWS.DynamoDB.DocumentClient({convertEmptyValues: true});

const statuses = { 
    "ToDo": true, 
    "In Progress": true, 
    "Done": true, 
    "Backlog": true 
}

const schema = {
    id: (t) => typeof(t) === 'string',
    username: (t) => typeof(t) === 'string',
    title: (t, optional) => typeof(t) === 'string' || (t === undefined && optional),
    description: (t, optional) => typeof(t) === 'string' || (t === undefined && optional),
    status: (t, optional) => typeof(t) === 'string' && statuses[t] || (t === undefined && optional),
}

module.exports = {
    getById (id, username) {
        return new Promise((resolve,reject)=>{
            if (!(schema.id(id) && schema.username(username))) {
                return reject({ status: 400, message: "Malformed input" })
            };
            dynamoDB.query({
                TableName: TABLE_NAME,
                KeyConditionExpression: "id = :id AND username = :username",
                ExpressionAttributeValues: {
                    ":username": username,
                    ":id": id
                }
            }, (err, res) => {
                if (err) {
                    return reject(err);
                }
                if (res.Items.length == 0) {
                    return reject({ status: 404, message: `No item with id '${id}' found` })
                }
                return resolve(res.Items[0]);
            });
        });
    },
    getByUser(username) {
        return new Promise((resolve,reject)=>{
            if (!(schema.username(username))) {
                return reject({ status: 400, message: "Malformed input" })
            };
            dynamoDB.scan({
                TableName: TABLE_NAME,
                Key: {
                    username
                }
            }, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res.Items);
            });
        });
    },
    createItem(username, title, description) {
        return new Promise((resolve,reject)=>{
            if (!(schema.username(username) && schema.title(title) && schema.description(description))) {
                return reject({ status: 400, message: "Malformed input" })
            };
            const id = uuid.v4()
            dynamoDB.put({
                TableName: TABLE_NAME,
                Item: {
                    id,
                    username,
                    title,
                    description,
                    status: "ToDo"
                }
            }, (err)=>{
                if (err) {
                    return reject(err);
                }
                return resolve ({
                    id,
                    username,
                    title,
                    description,
                    status: "ToDo"
                });
            });
        });
    },
    updateItem(id, username, {title,description,status}) {
        return new Promise((resolve,reject)=>{
            if (!(schema.id(id) && schema.username(username) && schema.title(title, true) && schema.description(description, true) && schema.status(status, true))) {
                return reject({ status: 400, message: "Malformed input" })
            };
            let toupdate = [];
            let ExpressionAttributeValues = {};
            let ExpressionAttributeNames = undefined;
            if (title) {
                toupdate.push("title = :title");
                ExpressionAttributeValues[":title"] = title;
            }
            if (description) {
                toupdate.push("description = :description");
                ExpressionAttributeValues[":description"] = description;
            }
            if (status) {
                toupdate.push("#status = :status");
                ExpressionAttributeValues[":status"] = status;
                ExpressionAttributeNames = {
                    "#status": "status"
                };
            }
            let UpdateExpression = "SET " + toupdate.join(", ");
            dynamoDB.update({
                TableName: TABLE_NAME,
                Key: {
                    id,
                    username
                },
                UpdateExpression,
                ExpressionAttributeNames,
                ExpressionAttributeValues,
                ReturnValues: "ALL_NEW"
            }, (err, res)=>{
                if (err) {
                    return reject(err);
                }
                return resolve(res.Attributes);
            });
        });
    },
    deleteItem(id, username) {
        return new Promise((resolve,reject)=>{
            if (!(schema.id(id) && schema.username(username))) {
                return reject({ status: 400, message: "Malformed input" })
            };
            dynamoDB.delete({
                TableName: TABLE_NAME,
                Key: {
                    id,
                    username
                }
            }, (err)=>{
                if (err) {
                    return reject(err);
                }
                return resolve({
                    success: true
                });
            })
        });
    }
}