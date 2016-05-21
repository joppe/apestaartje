/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {Service} from './Service';

/**
 * This class represents the dependency injection container. Service can be registered of fetched from this container.
 */
export class Container {
    private services:{[id:string]:Service;} = {};
    // private aliases:{[id:string]:string;} = {};
    // private tags:Map<string, string> = new Map<string, string>();

    /**
     * Register a service. The given function will act as the service when it is called.
     *
     * @param identifier
     * @param func
     * @param singleton
     * @returns {Container}
     */
    register(identifier:string, func:Function, singleton:boolean = true):Container {
        if (this.has(identifier)) {
            throw new Error(`Service "${identifier}" already defined`);
        }

        this.services[identifier] = new Service(identifier, func, singleton);

        return this;
    }

    /**
     * Check if a service with a given identifier is registered
     *
     * @param {string} identifier
     * @returns {boolean}
     */
    has(identifier:string):boolean {
        return undefined !== this.services[identifier];
    }

    get(identifier:string):any {
        let service,
            parameters;

        if (false === this.has(identifier)) {
            throw new Error(`Service with identifier "${identifier}" does not exist.`);
        }

        service = this.services[identifier];
        parameters = service.getParameters();
        
        for (let parameter in parameters) {
            if (parameters.hasOwnProperty(parameter) && undefined === service.getParameter(parameter)) {
                service.setParameter(parameter, this.get(parameter));
            }
        }
        
        service = this.services[identifier];

        return service.call();
    }
}

