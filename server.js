const express = require('express');
const mongoose = require('mongoose');

const paginatedResults = require('./paginatedResults');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const server = `localhost:27017`;
const database = 'acronym';

mongoose.connect(`mongodb://${server}/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const acronymSchema = {
    id: String,
    acronym: String,
    definition: String
};

const Acronym = mongoose.model('Acronym', acronymSchema);

const db = mongoose.connection;

db.once('open', async () => {
    if (await Acronym.countDocuments().exec() > 0) return

    Promise.all([
        Acronym.create({ acronym: '2B', definition: 'To be' }),
        Acronym.create({ acronym: '2EZ', definition: 'Too easy' }),
        Acronym.create({ acronym: '2G2BT', definition: 'Too good to be true' }),
        Acronym.create({ acronym: '2B', definition: 'To be' }),
        Acronym.create({ acronym: '2EZ', definition: 'Too easy' }),
        Acronym.create({ acronym: '2G2BT', definition: 'Too good to be true' }),
        Acronym.create({ acronym: '2B', definition: 'To be' }),
        Acronym.create({ acronym: '2EZ', definition: 'Too easy' }),
        Acronym.create({ acronym: '2G2BT', definition: 'Too good to be true' }),
        Acronym.create({ acronym: '2B', definition: 'To be' }),
        Acronym.create({ acronym: '2EZ', definition: 'Too easy' }),
        Acronym.create({ acronym: '2G2BT', definition: 'Too good to be true' }),
        Acronym.create({ acronym: '2B', definition: 'To be' }),
        Acronym.create({ acronym: '2EZ', definition: 'Too easy' }),
        Acronym.create({ acronym: '2G2BT', definition: 'Too good to be true' }),
    ]).then(() => console.log('Added Acronyms!'))
})

app.get('/acronym', paginatedResults(Acronym), (req, res) => {

    res.json(res.paginatedResults);
});

app.post('/acronym', (req, res) => {

    const newAcronym = new Acronym({
        acronym: req.body.acronym,
        definition: req.body.definition
    });

    newAcronym.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.send('New acronym added!');
        }
    });
});

app.delete('/acronym/:acronymID', (req, res) => {
    const acronymID = req.params.acronymID;

    Acronym.deleteOne({ _id: acronymID }, (err) => {
        if (err) {
            res.send('Failed delete acronym!');
        } else {
            res.send('Acronym is deleted!');
        }
    });
});

app.patch('/acronym/:acronymID', (req, res) => {
    const acronymID = req.params.acronymID;

    Acronym.updateOne({ _id: acronymID }, { $set: req.body }, (err) => {
        if (err) {
            res.send('Failed to update acronym!');
        } else {
            res.send('Successfully updated!');
        }
    });
});

const port = 3000 || process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});