const express = require('express')
const router = express.Router()
const { generateToken, sendToken } = require('../config/token')
const User = require('../models/user')
const passport = require('passport')
require('../config/passport')()


router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// router.get('/auth/google', passport.authenticate('google', {
//     scope: ['profile']
// }))

// router.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
//         // Successful authentication, redirect home.
//         res.redirect('/Dashboard');
//     });

// router.get('/auth/facebook', passport.authenticate('facebook', {
//     profileFields: ['id', 'name'],

// }));

// router.get('/auth/facebook/callback',
//     passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
//         res.redirect('/');
//     });

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(400).send('error')
        }
        if (!user) {
            return res.status(404).send({ message: 'no user found' })
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(400).send('error2')
            }
            return res.status(200).send({ message: `logged in ${user.id}` })
        })
    })(req, res, next)
});


router.route('/auth/facebook')
    .post(passport.authenticate('facebook-token', { session: false }), (req, res, next) => {
        if (!req.user) {
            return res.send(401, 'User Not Authenticated');
        }
        req.auth = {
            id: req.user.id
        };

        next();
    }, generateToken, sendToken);

router.route('/auth/google')
    .post(passport.authenticate('google-token', { session: false }), (req, res, next) => {
        if (!req.user) {
            return res.send(401, 'User Not Authenticated');
        }
        req.auth = {
            id: req.user.id
        };

        next();
    }, generateToken, sendToken);

module.exports = router



// router.post('/users/login', async (req, res) => {
//     try {
//         const user = await User.findByCredentials(req.body.email, req.body.password)
//         res.send(user)
//     } catch (e) {
//         res.status(400).send()
//     }
// })

// router.get(('/', (req, res) => {
//     res.json({
//         message: 'Hello World'
//     })
// })
// )


