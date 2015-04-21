import {Service} from 'lib/dependencyinjection/Service';
import _ from 'underscore';

/**
 * @class
 */
export class Container {
    constructor() {
        this.services = {};
        this.aliases = {};
    }

    /**
     * @param {string} name
     * @param {Function} func
     * @param {boolean} singleton
     * @returns {Container}
     */
    register(name, func, singleton) {
        if (this.has(name)) {
            throw 'Service "' + name + '" already defined';
        }

        this[name] = new Service(func, singleton);

        return this;
    }

    /**
     * Check if a service/alias exists
     *
     * @param {string} name
     * @returns {boolean}
     */
    has(name) {
        return (undefined !== this[name] || undefined !== this[name]);
    }

    /**
     * Get a service
     *
     * @param {string} name
     * @returns {*}
     */
    get(name) {
        let result,
            service,
            args;

        if (this.has(name)) {
            service = this.resolve(name);
            args = _.map(service.getArgumentNames(), function (arg) {
                return this.has(arg) ? this.get(arg) : null;
            }, this);
            result = service.get(args);
        } else {
            throw 'Service "' + name + '" not found';
        }

        return result;
    }

    /**
     * @param {string} alias
     * @param {string} name
     * @returns {Container}
     * @throws {string}
     */
    alias(alias, name) {
        if (false === this.has(name)) {
            throw 'Service "' + name + '" not found';
        }

        if (this.has(alias)) {
            throw 'Service/alias "' + name + '" already exists';
        }

        this[alias] = name;

        return this;
    }

    /**
     * @param {string} name
     * @returns {Service}
     * @throws {string}
     */
    resolve(name) {
        var service;

        if (undefined !== this[name]) {
            service = this[name];
        } else if (undefined !== this[name]) {
            service = this.resolve(this[name]);
        } else {
            throw 'Cannot resolve service "' + name + '"';
        }

        return service;
    }
}