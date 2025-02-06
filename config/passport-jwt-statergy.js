const passport=require('passport');
const jwtStrategy=require('passport-jwt').Strategy;
const ejwt=require('passport-jwt').ExtractJwt;

var opts={
    jwtFromRequest:ejwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:"API"
}

const Auth=require('../models/authModel');

passport.use(new jwtStrategy(opts, async function(payload,done){
    let checkUserData=await Auth.findOne({email:payload.data.email})
    console.log(payload);
    if(checkUserData){
        return done(null,checkUserData);
    }else{
        return done(null,false)
    }
}))

passport.serializeUser((user,done)=>{
    return done(null,user.id);
})

passport.deserializeUser(async(id,done)=>{
    let userdata = await Auth.findById(id);
    if(userdata){
        return done(null,userdata);
    }
    else{
        return done(null,false);
    }
})

module.exports=passport;