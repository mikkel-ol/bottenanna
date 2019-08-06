const path = require('path');

const mongo = require('mongodb').MongoClient,
	settings = require(path.join(global.appRoot, '/config/database')),
	url = settings.url,
	name = settings.name;



class Commands {
    constructor() {
        this.collectionName = "commands",
        this.collection = null;
    }

    async connect() {
        mongo.connect(url, { useNewUrlParser: true }, (error, client) => {
            if (error) return; // TODO: Handle

            this.collection = client.db(name).collection(this.collectionName);
        })
    }

    async add(command) {
        if (!this.collection) await this.connect();
        // TODO: Fix this       await this.collection.updateOne( {name: command.id } , { $set: {} } , { upsert: true });
    }

    async drop() {
		if (!this.collection) await this.connect();
		await this.collection.drop();
    }
}

module.exports = {
    Commands,
}