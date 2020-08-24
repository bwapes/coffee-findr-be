const client = require('../lib/client');
const { getEmoji } = require('../lib/emoji.js');

// async/await needs to run in a function
run();

async function run() {

  try {
    // initiate connecting to db
    await client.connect();

    // run a query to create tables
    await client.query(`
                CREATE TABLE users (
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(256) NOT NULL,
                    hash VARCHAR(512) NOT NULL
                );           
                CREATE TABLE favorites (
                    id SERIAL PRIMARY KEY NOT NULL,
                    biz_id VARCHAR(500) NOT NULL UNIQUE,
                    title VARCHAR(512) NOT NULL,
                    img VARCHAR(512) NOT NULL,
                    address VARCHAR(512) NOT NULL,
                    is_closed BOOLEAN NOT NULL,
                    rating DECIMAL(2,1) NOT NULL,
                    notes VARCHAR(65535) NOT NULL,
                    yelp_url VARCHAR(65535) NOT NULL,
                    owner_id INTEGER NOT NULL REFERENCES users(id)
            );
        `);

    console.log('create tables complete', getEmoji(), getEmoji(), getEmoji());
  }
  catch(err) {
    // problem? let's see the error...
    console.log(err);
  }
  finally {
    // success or failure, need to close the db connection
    client.end();
  }

}
