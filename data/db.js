const assert = require("assert");
const mongo = require("mongodb").MongoClient;

let db;

module.exports = {
    init: cb => {
        if (!process.env.MONGO_URI)
            return cb(null, "No MongoDB URI environment variable set");

        if (db) {
            console.warn("Already initialized database connection");
            return cb(null, db);
        }

        mongo.connect(
            process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            (err, con) => {
                if (err) return cb(err);

                db = con.db("bottenAnna");
                return cb(null, db);
            }
        );
    },

    get: () => {
        assert.ok(
            db,
            "Database connection has not yet been initialized. Call init()."
        );
        return db;
    },
};
