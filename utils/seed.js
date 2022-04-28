const connection = require('../config/connection');
const { User, Thought } = require('../models');
const userData = require('./data')

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log('data deleted');

    await User.create(userData);

    console.table(userData);
    console.info('Seeding complete!');
    process.exit(0);
});