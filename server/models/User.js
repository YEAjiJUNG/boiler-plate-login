const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//salt가 몇글자 인지
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        defualt: 0
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number
    }

})

//mongoose에서 가져온 method , 유저 정보를 save하기 전에 function실행
userSchema.pre('save', function(next){
    //비밀번호를 암호화시킨다.

    var user = this;

    if(user.isModified('password')){
        //비밀번호를 바꾸는 경우에만
        bcrypt.genSalt(saltRounds, function(err,salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash;
                next();
                //다음 로직 진행
            })
        })
    }
    else{
        next();
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    //plainPassword 1234567 를 암호화시켜서 암호화된 비밀번호와 같은지 확인한다.

    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb){
    //jsonwebtoken을 이용해서 token 생성하기
    var user = this;

    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    //secretToken을 넣었을 때 user._id가 나온다.
    //user._id + 'secretToken' = token

    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user);
    })
   
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    //토큰을 decode한다.

    jwt.verify(token, 'secretToken', function(err, decoded){
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({'_id': decoded, 'token': token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })


    })
}

 

//모델의 이름과 스키마를 넣어준다.
const User = mongoose.model('User', userSchema);

module.exports = {User}