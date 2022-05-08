const express = require('express');
const mongoose = require('mongoose');

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

app.get('/acronym', (req, res) => {
    Acronym.find((err, foundAcronyms) => {
        if (err) {
            res.send(err);
        } else {
            res.send(foundAcronyms);
        }
    });
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