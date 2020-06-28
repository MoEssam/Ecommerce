const express = require('express')
require('./db/mongoose')
require('./config/passport')
const userRouter = require('./routers/user')
const passport = require('passport')
const cors = require('cors')
require('./config/passport')
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');

const app = express()
const port = process.env.PORT || 4000

const corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));


app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
app.use(userRouter)

// app.get('/', (req, res) => {
//     res.send('Hello World 🌍')
// })

app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})