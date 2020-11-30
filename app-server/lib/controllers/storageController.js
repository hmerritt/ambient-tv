/*
 * Storage class
 * store and manipulate data
 */
class Storage {
    constructor() {
        this.defaultKey = "_default";

        this.data = {
            [this.defaultKey]: null,
        };
    }

    get(key = this.defaultKey) {
        return this.data[key];
    }

    set(newData, key = this.defaultKey) {
        this.data[key] = newData;
        return this.data[key];
    }

    exists(key = this.defaultKey) {
        return this.data[key] ? true : false;
    }

    keys() {
        return Object.keys(this.data);
    }
}

module.exports = Storage;
