const app = require('./app');

const server = app.listen(25567, () => {
    console.log(`Express is running on port ${server.address().port}`);
});
