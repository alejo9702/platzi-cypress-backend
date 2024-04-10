const {defineConfig} = require("cypress");
const mysql = require('mysql');
const { MongoClient } = require("mongodb");



module.exports = defineConfig({

    e2e: {

        setupNodeEvents(on, config) {
            const client = new MongoClient(config.env.MONGO);

            on('task',
                {
                queryDatabase(query) {
                    return new Promise((resolve, reject) => {
                        const connection = mysql.createConnection({
                            host: '127.0.0.1',
                            user: "root",
                            password: "Munoz970217@",
                            database: "test_cypress"
                        });
                        connection.connect();

                        connection.query(query, (error, results) => {
                            if (error) reject(error);
                            else resolve(results);

                            connection.end();
                        });
                    });
                },
                queryDb: (query) => {
                    return queryTestDb(query, config);
                },

                // mongo db task
                async clearListing() {
                    try {
                        const db = await connect(client);
                        const employees = db.collection("tests");
                        return await employees.remove({});
                    } catch (error) {
                        console.error(error);
                    } finally {
                        await client.close();
                    }
                },
                async createList(list) {
                    try {
                        const db = await connect(client);
                        const employees = db.collection("tests");
                        return await employees.insertOne(list);
                    } catch (error) {
                        console.error(error);
                    } finally {
                        await client.close();
                    }
                },
                async getListing() {
                    try {
                        console.log('entre el task')
                        const client = new MongoClient(config.env.MONGO);
                        const db = await connect(client);
                        const employees = db.collection("tests");
                        return await employees.find({}).limit(50).toArray();
                    } catch (error) {
                        console.error(error);
                    } finally {
                        await client.close();
                    }
                },

            });
        },
        baseUrl: 'http://localhost:3000/',
    },

    env: {
        DB_HOST: "localhost",
        DB_USER: "root",
        DB_PASSWORD: "Munoz970217@",
        DB_NAME: "test_cypress",
        MONGO: "mongodb://localhost:27017"
    }
});


async function connect(client) {
    await client.connect();
    return client.db("cypress");
}
