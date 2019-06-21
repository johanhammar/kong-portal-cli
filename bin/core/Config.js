"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const yaml = require("js-yaml");
const path_1 = require("path");
class Config {
    constructor(location, filename, options = {
        encoding: 'utf8',
    }) {
        this.filename = filename;
        this.location = location;
        this.path = path_1.join(location, filename);
        this.encoding = options.encoding || 'utf8';
        this.data = null;
    }
    async load() {
        const content = await fs.readFile(this.path, this.encoding);
        this.data = yaml.safeLoad(content);
    }
    async save() {
        const content = yaml.safeDump(this.data);
        return await fs.writeFile(this.path, content, this.encoding);
    }
    toConsole() {
        const lines = yaml.safeDump(this.data).split('\n');
        for (var line of lines) {
            console.log(`  `, line);
        }
    }
}
exports.default = Config;
