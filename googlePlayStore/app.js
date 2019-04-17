const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('common'));
app.use(cors());

const apps = require('./playstore');

app.get('/apps', (req, res) =>
{
    const sort = req.query.sort;
    const genres = req.query.genres;

    if(sort) {
        if(!['rating', 'app'].includes(sort)) {
            return res
            .status(400)
            .send('Sort must be by rating or app')
        }
    }

    if(genres) {
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            return res
            .status(400)
            .send('Genres must be Action, Puzzle, Strategy, Causal, Arcade or Card')
        }
    }

    let results = [];
    console.log(results);

    if(genres)
    {
        results = apps.filter(app => 
            app.Genres.toLowerCase().includes(genres.toLowerCase())
    );
    }

    if(sort)
    {
        results
        .sort((a, b) => {
          return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    })
}
    res
        .json(results);

});

app.listen(6000, () => {
    console.log('Server started on PORT 6000');
})