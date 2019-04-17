const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

app.get('/video', (req, res) => {
    const video = {
        title: 'Cats falling over',
        description: '15 minutes of hilarious fun',
        length: '15.40',
    }
    res.json(video)
})

app.get('/grade', (req, res) => {
    const { mark } = req.query;

    if (!mark) {
        return res
        .status(400)
        .send("Please provide a mark")
    }

    const numericMark = parseFloat(mark);
    if (Number.isNaN(numericMark)) {
        return res
        .status(400)
        .send("Mark must be a numeric value");
    }

    if (numericMark < 0 || numericMark > 100) {
        return res
        .status(400)
        .send("Mark must be in range of 0 to 100")

    }

    if (numericMark >= 90) {
        return res
        .send("A");
    }
    if (numericMark > 80) {
        return res
        .send("B");
    }
    if (numericMark >= 70) {
        return res
        .send("C");
    }
    res
        .send("F");
})

app.get('/echo', (req, res) => {
    const responseText= `Here are some details of your request:
        Base URL: ${req.baseUrl}
        Host: ${req.hostname}
        Path: ${req.path}
        `;
    res.send(responseText);
})

app.get('/sum', (req, res) => {

    const a = req.query.a;
    const b = req.query.b;

    const numA = parseInt(a);
    const numB = parseInt(b);

    if (!a) {
        return res.status(400).send('Please provide an A value');
    }

    if (!b) {
        return res.status(400).send('Please provide an B value');
    }

    const sum = numA + numB;
    const sumString = `The sum of ${numA} and ${numB} is ${sum}`
    res.send(sumString);
})

app.get('/cipher', (req, res) => {
    const text = req.query.text;
    const shift = req.query.shift;

    if (!text) {
        return res.status(400).send('Please provide a text value');
    }

    if (!shift) {
        return res.status(400).send('Please provide a shift value');
    }

    const shiftInt = parseInt(shift);
    const charCodeString = []
    var newString = ""

    for (let i=0; i< text.length; i++)
    {
        charCodeString.push(text.charCodeAt(i) + shiftInt);
        console.log(charCodeString);
    }

    for (let k=0; k<charCodeString.length; k++)
    {
        newString = newString + String.fromCharCode(charCodeString[k])
    }

    res.send(newString);

})

app.get('/lotto', (req, res) => {
    const numbers = req.query.numbers;

    const guesses = numbers.map(n => parseInt(n));
    console.log(guesses);


    if (!numbers) {
        return res.status(400).send('Please provide lotto numbers');
    }

    if (numbers.length < 6) {
        return res.status(400).send('Please provide 6 lotto numbers');
    }

    const randNumbers = Array.from({length: 6}, () => Math.floor(Math.random() * 20));
    console.log(randNumbers);
    var numMatched = 0;


    for (let i=0; i<6; i++)
    {
        for (let k=0; k<6; k++)
        {
            console.log('running 2ndloop');
            if (guesses[i] == randNumbers[k]) {
                numMatched++;
                console.log(numMatched);
            }
        }

    }
    console.log(numMatched);

    if (numMatched < 4) {
        res.send(`Sorry, you lose. ${numMatched}`)
    }

    if (numMatched == 4) {
        res.send(`Congratulations, you win a free ticket.`)
    }

    if (numMatched == 5) {
        res.send(`Congratulations, you win $100!`)
    }

    if (numMatched == 6) {
        res.send(`Wow! Unbelievable! You could have won the mega millions!`)
    }


})

app.get('/greeting', (req, res) => {
    const name = req.query.name;
    const race = req.query.race;

    if (!name) {
        return res.status(400).send('Pleasee provide a name');
    }

    if (!race) {
        return res.status(400).send('Please provide a race');

    }

    const greeting = `Grettings ${name} the ${race}, welcome to our kingdom.`;

    res.send(greeting);
})

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end(); 
})

app.get('/', (req, res) => {
    res.send('Hello Express!');
})

app.get('/burgers', (req, res) => {
    res.send('We have juicy cheese burgers');
})

app.get('/pizza/pepperoni', (req, res) => {
    res.send('Your pizza is on the way!');
})

app.get('/pizza/pineapple', (req, res) => {
    res.send('We don\'t serve that here.');
})

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');

})

