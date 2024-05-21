const {defineConfig} = require("cypress");
const mysql = require('mysql');
const {MongoClient, ObjectId} = require("mongodb");
const {tr} = require("@faker-js/faker");
// const {
//     addMatchImageSnapshotPlugin,
// } = require('cypress-image-snapshot/plugin');
const webpackPreprocessor = require("@cypress/webpack-preprocessor");
const preprocessor = require('@badeball/cypress-cucumber-preprocessor')
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const values = {}


async function setupNodeEvents(on, config) {

    const client = new MongoClient(config.env.MONGO);
    // addMatchImageSnapshotPlugin(on, config)

    on("task",
        {
            saveValue(value) {
                const key = Object.keys(value)[0]
                values[key] = value[key]

                return null;

            },
            getValue(key) {
                console.log('values', values)
                return values[key] ?? 'there is no value'
            }
        }
    )


    on('task',
        {
            queryDatabase(query) {
                return new Promise((resolve, reject) => {
                    const connection = mysql.createConnection({
                        host: '127.0.0.1',
                        user: "root",
                        password: "Obejo970217$",
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
                    return await employees.deleteMany({});
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
                    const db = await connect(client);
                    const employees = db.collection("tests");
                    return await employees.find({}).limit(50).toArray();

                } catch (error) {
                    console.error(error);
                } finally {
                    await client.close();
                }
            },
            async deleteEmployee(id) {
                try {
                    const db = await connect(client);
                    const employees = db.collection("tests");
                    const filter = {_id: new ObjectId(id)};

                    return await employees.deleteOne(filter)
                } catch (e) {
                    console.error(e)
                } finally {
                    await client.close()
                }
            },

            async updateEmployee({id, updatedData}) {
                try {
                    const db = await connect(client);
                    const employees = db.collection("tests");

                    const filter = {_id: new ObjectId(id)};

                    const updateOperation = {
                        $set: updatedData
                    }
                    return await employees.updateOne(filter, updateOperation);

                } catch (e) {
                    console.error(e)
                } finally {
                    await client.close()
                }
            }


        });

    config.env.vairiable = process.env.NODE_ENV ?? 'THERE IS NOT VARIABLE';

    await preprocessor.addCucumberPreprocessorPlugin(on, config);

    const options = {
        webpackOptions: {
            module: {
                rules: [{
                    test: /.feature$/,
                    use: [{loader: '@badeball/cypress-cucumber-preprocessor/webpack', options: config,},],
                },],
            },
        },

    };
    on('file:preprocessor', webpackPreprocessor(options));

    allureWriter(on, config);
    return config

}


module.exports = defineConfig({
    video: true,

    env: {
        allureReuseAfterSpec: true,
        allureResultsPath: "someFolder/results",

        credentials: {
            user: "username",
            password: "password"
        },
        DB_HOST: "localhost",
        DB_USER: "root",
        DB_PASSWORD: "Obejo970217$",
        DB_NAME: "test_cypress",
        MONGO: "mongodb://localhost:27017"
    },

    e2e: {
        //retries: 3,
        //baseUrl: 'http://localhost:3000/',
        baseUrl: 'https://pokedexpokemon.netlify.app',
        specPattern: "**/*.feature",
        setupNodeEvents,

    }
});


async function connect(client) {
    await client.connect();
    return client.db("cypress");
}


