import app from './app.js';

import DB from './models/index.js';

DB.connect(process.env.MONGO_URI);

app.listen(8080, () => {
    console.log('Server running on port 8080');
});

