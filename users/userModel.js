const db = require('../data/db-config');


module.exports = {
register, 
findById,
findByUser,
getUsers
}


// Resister: new user regester

function register(user){
    
    return db('users').insert(user)
  
    .then( result => {
        const [id] = result;
        return findById(id)
       
        
       
    })
   
}

function findById(id) {
    return db('users').where({id}).first()
}

function findByUser(username){
    return db('users').where({username}).first()
}


// get users: get all users after log-in

function getUsers(){

    return db('users')
}
