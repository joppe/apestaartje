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
        if (this.has(name, false)) {
            throw 'Service "' + name + '" already defined';
        }

        this.services[name] = new Service(func, singleton);

        return this;
    }

    /**
     * Check if a service/alias exists
     *
     * @param {string} name
     * @param {boolean} [checkAliasses]
     * @returns {boolean}
     */
    has(name, checkAliasses = true) {
        let service = (undefined !== this.services[name]),
            alias = (true === checkAliasses && undefined !== this.aliases[name]);

        return service || alias;
    }

    /**
     * Get a service
     *
     * @param {string} name
     * @returns {*}
     * @throws {string}
     */
    get(name) {
        /** @type {Service} service */
        let service = this.services[this.resolve(name)],
            args = _.map(service.getArgumentNames(), function (arg) {
                return this.has(arg) ? this.get(arg) : null;
            }, this);

        return service.call(args);
    }

    /**
     * Create an alias for a service or alias
     *
     * @param {string} alias
     * @param {string} name
     * @returns {Container}
     * @throws {string}
     */
    alias(alias, name) {
        if (false === this.has(name)) {
            throw 'Service/alias "' + name + '" not found';
        }

        if (this.has(alias)) {
            throw 'Service/alias "' + alias + '" already exists';
        }

        this.aliases[alias] = name;

        return this;
    }

    /**
     * @param {string} name
     * @returns {string}
     * @throws {string}
     */
    resolve(name) {
        var serviceName;

        if (undefined !== this.services[name]) {
            serviceName = name;
        } else if (undefined !== this.aliases[name]) {
            serviceName = this.resolve(this.aliases[name]);
        } else {
            throw 'Cannot resolve service "' + name + '"';
        }

        return serviceName;
    }
}