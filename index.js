const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://YeajiJung:dpwl1998@boiler-plate-login.zci9t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
}).then(()=> console.log('MongoDB Connected...'))
.catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('Hello Word!')
})

app.listen(port, () => console.log(`Example app listening on port ${port}`));