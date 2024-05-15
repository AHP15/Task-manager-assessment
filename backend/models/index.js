import mongoose from 'mongoose';

import User from './user.js';


let isConnected = false;
const DB = {
    user: User,
    connect(uri) {
        if (isConnected) return;

        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => {
                console.log('Connecting to the DB seccussfully');
                isConnected = true;
            })
            .catch(err => {
                console.log('Error while connecting to the db', err);
                process.exit();
            });
    },
    disconnect() {
        mongoose.disconnect();
    }
};

export default DB;