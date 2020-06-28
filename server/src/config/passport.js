const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const mongoose = require('mongoose')
const User = require('../models/user')
const keys = require('./keys')
const bcrypt = require('bcryptjs')
const config = require('./keys')
const FacebookTokenStrategy = require('passport-facebook-token');
const GoogleTokenStrategy = require('passport-google-token').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
})

module.exports = function () {
    // passport.use(new GoogleStrategy({
    //     clientID: keys.googleclientID,
    //     clientSecret: keys.googleclientSecret,
    //     callbackURL: '/auth/google/callback',
    //     proxy: true
    // }, async (accessToken, refreshToken, profile, done) => {
    //     const newUser = {
    //         'googleId': profile.id,
    //         'google.displayName': profile.displayName,
    //         'google.firstName': profile.name.givenName,
    //         'google.lastName': profile.name.familyName,
    //         'google.image': profile.photos[0].value,
    //     }
    //     try {
    //         let user = await User.findOne({ googleId: profile.id })

    //         if (user) {
    //             done(null, user)
    //         } else {
    //             user = await User.create(newUser)
    //             done(null, user)
    //         }
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }
    // )
    // )

    // passport.use(new FacebookStrategy({
    //     clientID: keys.FACEBOOK_APP_ID,
    //     clientSecret: keys.FACEBOOK_APP_SECRET,
    //     callbackURL: "/auth/facebook/callback",
    //     proxy: true
    // }, async (accessToken, refreshToken, profile, done) => {
    //     const newUser = {
    //         facebookId: profile.id,
    //         'facebook.displayName': profile.displayName,
    //     }
    //     try {
    //         let user = await User.findOne({ facebookId: profile.id })

    //         if (user) {
    //             done(null, user)
    //         } else {
    //             user = await User.create(newUser)
    //             done(null, user)
    //         }
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }
    // ));

    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        await User.findOne({ email }, (err, user) => {
            if (err) { return done(err); }
            if (!email) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            else {
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                })
            }
        });
    }
    ));

    passport.use(new FacebookTokenStrategy({
        clientID: keys.FACEBOOK_APP_ID,
        clientSecret: keys.FACEBOOK_APP_SECRET,
        //fbGraphVersion: 'v3.0'
    },
        (accessToken, refreshToken, profile, done) => {
            User.upsertFbUser(accessToken, refreshToken, profile, (err, user) => {
                return done(err, user);
            });
        }));

    passport.use(new GoogleTokenStrategy({
        clientID: keys.googleclientID,
        clientSecret: keys.googleclientSecret,
    },
        (accessToken, refreshToken, profile, done) => {
            User.upsertGoogleUser(accessToken, refreshToken, profile, (err, user) => {
                return done(err, user);
            });
        }));


}