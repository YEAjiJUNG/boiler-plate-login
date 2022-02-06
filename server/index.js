const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
//mongoDB에서 유저 생성 후 앱과 연결시키기
mongoose.connect('mongodb+srv://YeajiJung:dpwl1998@boiler-plate-login.zci9t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
}).then(()=> console.log('MongoDB Connected...'))
.catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('Hello Word!dddd')
})

app.post('/api/users/register', (req, res) => {
    //회원가입 시 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다.
    
    const user = new User(req.body);


    //save는 mongoDB의 method
    user.save((err,userInfo)=> {
        if(err) return res.json({ success: false, err});
        return res.status(200).json({
            success: true
        })

    })

})

app.post('/api/users/login', (req, res)=> {
    //요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({email: req.body.email}, (err , user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: '제공된 이메일에 해당하는 유저가 없습니다.'
            })
        }
        else{
            //요청된 이메일이 DB에 있다면 비밀번호가 같은지 확인한다.
            user.comparePassword(req.body.password , (err, isMatch) => {
                if(!isMatch)
                return res.json({ loginSuccess: false, message: '비밀번호가 틀렸습니다.'})

                 //비밀번호까지 같다면 Token을 생성한다.
                 user.generateToken((err, user) => {
                    if(err) return res.status(400).send(err);

                    //토큰을 저장한다. -> 쿠키나 로컬스토리지, 세션스토리지에 보관/ 우리는 쿠키에 저장
                    res.cookie('x_auth', user.token)
                    .status(200)
                    .json({loginSuccess: true, userId: user._id})
                 })
            })
        }
    })
})

//쿠키에 저장된 토큰과 DB에 저장된 토큰이 계속 같은지 확인해준다.
//쿠키에 저장된 토큰을 클라이언트에서 가져와 디코드시키면 userId가 나온다.
//그 userId를 가진 그 유저 DB에 이 토큰이 있다면, 인증이 가능
app.get('/api/users/auth', auth, (req, res) => {
    //auth는 middleware -> req를 받은다음 콜백function 하기전에 중간에서 어떤 것을 해줌
    //여기까지 미들웨어를 통과해 왔다는 얘기는 인증 성공

    res.status(200).json({ 
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    
    User.findOneAndUpdate({ _id: req.user._id }, 
        {token: ''}
        , (err, user) => {
            if(err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })
        })
})

app.get('/api/hello', (req, res) => {
  res.send('HelloWord!')
})
//cors 이슈 발생 서버는 5000, client는 3000
//이슈 해결하기 위해 proxy를 사용한다.
//proxy 서버 사용하는 이유: 인터넷 사용제어, 캐시를 이용해 더 빠른 인터넷, 더 나은 보안, 제한된 사이트 접근 가능



app.listen(port, () => console.log(`Example app listening on port ${port}`));

//서버 단 작업이 끝난 후, client 폴더에 npx create-react-app으로 리액트 파일 생성
//