/// <reference path="ServiceDictionaryInterface.ts" />
/// <reference path="ServiceAliasDictionaryInterface.ts" />

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {Service} from './Service';

/**
 * This class represents the dependency injection container. A service can be registered of fetched from this container.
 */
export class Container {
    /**
     * A hash of all the services.
     * 
     * @type {ServiceDictionaryInterface}
     */
    private services:ServiceDictionaryInterface = {};

    /**
     * A hash of all aliases.
     *
     * @type {ServiceAliasDictionaryInterface}
     */
    private aliases:ServiceAliasDictionaryInterface = {};

    /**
     * A map of all tags.
     *
     * @type {Map<string, string[]>}
     */
    private tags:Map<string, string[]> = new Map<string, string[]>();

    /**
     * Add a tag for a service.
     *
     * @param {string} tag
     * @param {string} identifier
     */
    private addTag(tag:string, identifier:string):void {
        let tags:string[] = [];

        if (this.tags.has(tag)) {
            tags = this.tags.get(tag);
        }

        tags.push(identifier);

        this.tags.set(tag, tags);
    }

    /**
     * Register a service. The given function will act as the service when it is called.
     *
     * @param {string} identifier
     * @param {Function} func
     * @param {boolean} isSingleton
     * @param {string} [tag]
     * @returns {Container}
     */
    register(identifier:string, func:Function, isSingleton:boolean = true, tag:string = ''):Container {
        if (this.has(identifier)) {
            throw new Error(`Service "${identifier}" already defined`);
        }

        if ('' !== tag) {
            this.addTag(tag, identifier);
        }

        this.services[identifier] = new Service(identifier, func, isSingleton);

        return this;
    }

    /**
     * Create an alias for a service or alias
     *
     * @param {string} alias
     * @param {string} identifier
     * @returns {Container}
     * @throws {Error}
     */
    alias(alias:string, identifier:string):Container {
        if (false === this.has(identifier)) {
            throw new Error(`Service/alias "${identifier}" not found`);
        }

        if (this.has(alias)) {
            throw new Error(`Service/alias "${alias}" already exists`);
        }

        this.aliases[alias] = identifier;

        return this;
    }

    /**
     * Get the identifier of the service by a given alias or identifier.
     *
     * @param {string} identifier
     * @returns {string}
     */
    resolve(identifier:string):string {
        let serviceName;

        if (undefined !== this.services[identifier]) {
            serviceName = identifier;
        } else if (undefined !== this.aliases[identifier]) {
            serviceName = this.resolve(this.aliases[identifier]);
        } else {
            throw new Error(`Cannot resolve service "${identifier}"`);
        }

        return serviceName;
    }

    /**
     * Check if a service with a given identifier is registered.
     *
     * @param {string} identifier
     * @returns {boolean}
     */
    has(identifier:string):boolean {
        return undefined !== this.services[identifier] || undefined !== this.aliases[identifier];
    }

    /**
     * Get a service by executing the service function.
     *
     * @param {string} identifier
     * @returns {any}
     */
    get(identifier:string):any {
        let service = this.getServiceDefinition(identifier),
            parameters = service.getParameters();
        
        for (let parameter in parameters) {
            // Only set the parameter if it is not already set.
            if (parameters.hasOwnProperty(parameter) && undefined === service.getParameter(parameter)) {
                service.setParameter(parameter, this.get(parameter));
            }
        }
        
        return service.call();
    }

    /**
     * Get all service identifiers for a given tag.
     *
     * @param {string} tag
     * @returns {Array}
     */
    getServiceIdentifiersByTag(tag:string):string[] {
        if (this.tags.has(tag)) {
            return this.tags.get(tag);
        }

        return [];
    }

    /**
     * Get the service definition.
     *
     * @param {string} identifier
     * @returns {ServiceInterface}
     */
    getServiceDefinition(identifier:string):ServiceInterface {
        if (false === this.has(identifier)) {
            throw new Error(`Service with identifier "${identifier}" does not exist.`);
        }

        return this.services[this.resolve(identifier)];
    }
}
