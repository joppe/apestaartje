/**
 * @author Joppe Aarts <joppe@zicht.nl>
 * @copyright Zicht Online <http://zicht.nl>
 */

/**
 * @param {string} route
 * @returns {Function}
 */
function route(route) {
    'use strict';

    /**
     * @param {Object} target
     * @param {string} name
     * @param {Object} descriptor
     * @param {Object}
     */
    return function (target, name, descriptor) {
        if (undefined === target.constructor.routes) {
            target.constructor.routes = [];
        }

        target.constructor.routes.push({
            name: target.constructor.name + ':' + name,
            className: target,
            method: name,
            route
        });

        return descriptor;
    };
}

export {route}