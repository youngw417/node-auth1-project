const router = require('express').Router();
const bc = require('bcryptjs');
const User = require('./userModel');
const restricted = require('../middleware/restricted');


//post for resister
router.post('/register', (req, res, next) => {
    
    const {password} = req.body;
    const hashed = bc.hashSync(password, 10);
    const user = {
        username: req.body.username,
        password: hashed
    }
    console.log('user', user);
    User.register(user)
    .then(registered => res.status(201).json({
        success: true,
        user: registered
    }))
    .catch(err => next(err))
    
})



// post for login

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    User.findByUser(username)
    .then( result => {
        console.log('result', result);
        if (result){
            bc.compare(password, result.password).then(
                match => {
                     if (match){
                         req.session.user = result;
                         res.status(200).json({
                        message: "you are logged in",
                        User_ID: result.id})
                     }
                     
                     else
                     res.status(401).json({
                            error: 'Invalid Credentials....'})
                            
                }
               
            )
            .catch( err => next(err))
            //     (err, good ) => {
            //     if (good) {
            //          res.status(200).json({
            //       message: "you are logged in",
            //       User_ID: result.id

            //          })
            //     }

            //     else  {
            //         res.status(401).json({
            //     error: 'Invalid Credentials....'
            //     })
            //     }
           
            // }

            
        }
    

        else {
            res.status(401).json({
                error: 'Invalid Credentials'
            })
        }

    })
    .catch( err => next(err))
})


// get for all users

router.get('/users', restricted, (req, res, next) => {
    
    User.getUsers()
    .then(users => res.status(200).json({
        users
    }))
    .catch(err => next(err))

})

module.exports = router;