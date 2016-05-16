/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {Service} from './Service';

export class Container {
    private services: {[id: string]: Service;} = {};
    // private aliases: {[id: string]: string;} = {};
    // private tags: Map<string, string> = new Map<string, string>();

    register(identifier: string, func: Function, singleton: boolean = true) {
        if (true || this.has(identifier)) {
            throw new Error(`Service "${identifier}" already defined`);
        }
    }

    /**
     * Check if a service with a given identifier is registered
     *
     * @param {string} identifier
     * @returns {boolean}
     */
    has(identifier: string): boolean {
        return undefined !== this.services[identifier];
    }
}

