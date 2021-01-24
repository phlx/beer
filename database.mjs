import Datastore from "nedb";

export default class Database {
  // filename = "./beer.nedb"
  constructor(filename) {
    this.db = new Datastore({ filename, autoload: false });
  }

  async prepare(indexField) {
    await this.load();
    await this.index({ fieldName: indexField, unique: true });
    return this;
  }

  load() {
    return new Promise((resolve, reject) =>
      this.db.loadDatabase((err) => (err ? reject(err) : resolve()))
    );
  }

  index(index) {
    return new Promise((resolve, reject) =>
      this.db.ensureIndex(index, (err) => (err ? reject(err) : resolve()))
    );
  }

  find(query, fields = []) {
    return new Promise((resolve, reject) =>
      this.db.find(
        query,
        fields.reduce((acc, field) => ({ ...acc, [field]: 1 }), {
          _id: Number(fields.length === 0),
        }),
        (err, documents) => (err ? reject(err) : resolve(documents))
      )
    );
  }

  findOne(position) {
    return new Promise((resolve, reject) =>
      this.db.findOne({ position }, (err, document) =>
        err ? reject(err) : resolve(document)
      )
    );
  }

  updateOne(beer) {
    return new Promise((resolve, reject) =>
      this.db.update(
        { position: beer.position },
        beer,
        { upsert: true },
        (err, num) => (err ? reject(err) : resolve(num > 0))
      )
    );
  }

  update(where, values) {
    return new Promise((resolve, reject) =>
      this.db.update(where, values, { multi: true }, (err, updatedCount) =>
        err ? reject(err) : resolve(updatedCount)
      )
    );
  }

  insert(beer) {
    return new Promise((resolve, reject) =>
      this.db.insert(beer, (err, beer) => (err ? reject(err) : resolve(beer)))
    );
  }

  removeOne(position) {
    return new Promise((resolve, reject) =>
      this.db.remove({ position }, (err, n) => (err ? reject(err) : resolve(n)))
    );
  }

  remove(query) {
    return new Promise((resolve, reject) =>
      this.db.remove(query, { multi: true }, (err, n) =>
        err ? reject(err) : resolve(n)
      )
    );
  }
}
