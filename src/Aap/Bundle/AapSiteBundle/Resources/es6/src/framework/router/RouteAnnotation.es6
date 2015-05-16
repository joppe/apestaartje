/**
 * @author Joppe Aarts <joppe@zicht.nl>
 * @copyright Zicht Online <http://zicht.nl>
 */

let RouteAnnotation = {
    routes: [],

    /**
     * @param {string} route
     * @returns {Function}
     */
    addRoute(route) {
        'use strict';

        let self = this;

        return function (target, name, descriptor) {
            self.routes.push({
                name: target.constructor.name + ':' + name,
                className: target,
                method: name,
                route
            });

            return descriptor;
        };
    },

    /**
     * @returns {Array}
     */
    getRoutes() {
        'use strict';

        return this.routes;
    }
};

/**
 * @param {string} route
 * @returns {Function}
 */
function route(route) {
    'use strict';

    return RouteAnnotation.addRoute(route);
}

export {route, RouteAnnotation}