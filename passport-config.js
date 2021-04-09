const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById){
    const authenticateUser = async (email, password, done) => { //done is a func. used whenever we are done authenticating the user 
        const user =await getUserByEmail(email);
        const user1 = user[0];
        console.log(password)
        console.log(user1)
        if(user1 === undefined) {
            return done(null, false, {message: 'No User With That email'})
        }

        try{
            if(await bcrypt.compare(password, user1.password)){
                console.log("hi")
                return done(null,user1)
            } else {
                return done(null,false, {message: "Password Incorrect"})
            }
        } catch(e) {
            done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser)) 
    passport.serializeUser((user,done) => done(null,user.email))
    passport.deserializeUser(async (email,done) => {
        const tempid = await getUserByEmail(email);
        const tempid1 = tempid[0];
        done(null,tempid1)
     })
}

module.exports = initialize

// done(null,getUserById(id))