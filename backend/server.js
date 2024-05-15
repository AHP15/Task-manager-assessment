import mongoose from 'mongoose';
import app from './app.js';

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB.');
}).catch(err => console.error(err));

app.listen(8080, () => {
    console.log('Server running on port 8080');
});

