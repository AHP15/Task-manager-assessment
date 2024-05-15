import mongoose from 'mongoose';

let isConnected = false;
const DB = {
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