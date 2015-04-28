/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {Service} from 'lib/dependencyinjection/Service';
import {Exception} from 'lib/exception/Exception';
import {SortedMap} from 'lib/util/SortedMap';

/**
 * @class Container
 */
export class Container {
    /**
     * Constructor
     */
    constructor() {
        this.services = {};
        this.aliases = {};
        this.tags = new SortedMap();
    }

    /**
     * @param {string} identifier
     * @param {Function} func
     * @param {boolean} singleton
     * @param {string} tag
     * @returns {Container}
     * @throws {Exception}
     */
    register(identifier, func, singleton = true, tag = null) {
        if (this.has(identifier, false)) {
            throw new Exception('Service "' + identifier + '" already defined');
        }

        if (null !== tag) {
            this.tags.add(tag, identifier);
        }

        this.services[identifier] = new Service(identifier, func, singleton);

        return this;
    }

    /**
     * Check if a service/alias exists
     *
     * @param {string} identifier
     * @param {boolean} [checkAliasses]
     * @returns {boolean}
     */
    has(identifier, checkAliasses = true) {
        let service = (undefined !== this.services[identifier]),
            alias = (true === checkAliasses && undefined !== this.aliases[identifier]);

        return service || alias;
    }

    /**
     * Get a service
     *
     * @param {string} identifier
     * @returns {*}
     * @throws {string}
     */
    get(identifier) {
        /** @type {Service} service */
        let service = this.services[this.resolve(identifier)];

        service.getArgumentNames().forEach((name) => {
            if (this.has(name)) {
                service.setParameter(name, this.get(name));
            }
        });

        return service.call();
    }

    /**
     * Create an alias for a service or alias
     *
     * @param {string} alias
     * @param {string} identifier
     * @returns {Container}
     * @throws {Exception}
     */
    alias(alias, identifier) {
        if (false === this.has(identifier)) {
            throw new Exception('Service/alias "' + identifier + '" not found');
        }

        if (this.has(alias)) {
            throw new Exception('Service/alias "' + alias + '" already exists');
        }

        this.aliases[alias] = identifier;

        return this;
    }

    /**
     * @param {string} identifier
     * @returns {string}
     * @throws {Exception}
     */
    resolve(identifier) {
        var serviceName;

        if (undefined !== this.services[identifier]) {
            serviceName = identifier;
        } else if (undefined !== this.aliases[identifier]) {
            serviceName = this.resolve(this.aliases[identifier]);
        } else {
            throw new Exception('Cannot resolve service "' + identifier + '"');
        }

        return serviceName;
    }

    /**
     * @param {string} identifier
     * @returns {Service}
     */
    findDefinition(identifier) {
        return this.services[this.resolve(identifier)];
    }

    /**
     * @param {string} tag
     * @returns {Array}
     */
    findTaggedServiceIds(tag) {
        return this.tags.get(tag);
    }
}