const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById){
    const authenticateUser = async (email, password, done) => { //done is a func. used whenever we are done authenticating the user 
        const user = getUserByEmail(email)
        if(user === undefined) {
            return done(null, false, {message: 'No User With That email'})
        }

        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null,user)
            } else {
                return done(null,false, {message: "Password Incorrect"})
            }
        } catch(e) {
            done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser)) 
    passport.serializeUser((user,done) => done(null,user.id))
    passport.deserializeUser((id,done) => {
        done(null,getUserById(id))
     })
}

module.exports = initialize