const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Topic = require('./models/topic');
// import routes
const topicRouter = require('./routes/topic')

const app = express();
require('dotenv/config')

app.use(express.json())
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', async (req, res) => {
    try {
        const topic = await Topic.aggregate([{
            $sample: {
                size: 1
            }
        }])
        if (topic[0].isVerified == true) {
            res.send(`bahas: ${topic[0].topic}`);
        } else {
            res.send("bahas: makanan favorit");
        }
    } catch (err) {
        res.json({
            message: err
        });
    }
});

app.use('/topic', topicRouter);

app.listen(process.env.PORT, () => {
    console.log(`App listens to port ${process.env.PORT}`);
});

// Connect to DB
var uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('Connect to DB success')
}).catch(err => {
    console.log('Connect to failed ' + err)
})

//Run app, then load http://localhost:port in a browser to see the output.