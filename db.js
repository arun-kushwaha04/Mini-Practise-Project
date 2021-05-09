const pg = require('pg');
const client = new pg.Client('postgres://nrnpxwqx:SIjB9zmvXRblWh_fuzcnDukNqQp-eaDl@arjuna.db.elephantsql.com:5432/nrnpxwqx');

client.connect(() => { console.log('Database Connected') });
module.exports = client;