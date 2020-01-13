if (!Array.isArray) {
    Array.isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
}

module.exports = {
    todo: {
      id: { verify: (id) => { return typeof(id) == 'string' } },
      username: { verify: (username)=>{ return typeof(username) == 'string' } },
      title: { verify: (title)=>{ return typeof(title) == 'string'} },
      description: { verify: (description)=>{ return typeof(description) == 'string'} },
      status: { verify: (status)=>{ return typeof(status) == 'string' && ["Todo","In Progress","Done","Backlog"].indexOf(status) >= 0} }
    }
}