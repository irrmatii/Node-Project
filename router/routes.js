const express = require('express');
const router = express.Router();


const {
    getUsers,
    getPokes,
    register,
    logIn,
    poke,
    deleteUser
} = require('../controllers/mainController')

router.get('/users', getUsers)

router.get('/pokes', getPokes)

router.post('/register', register)

router.post('/logIn', logIn)

router.post('/poke', poke)

router.delete('/delete', deleteUser)

module.exports = router;
