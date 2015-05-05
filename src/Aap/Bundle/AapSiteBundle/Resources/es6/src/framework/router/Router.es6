/**
 * @author Joppe Aarts <joppe@zicht.nl>
 * @copyright Zicht Online <http://zicht.nl>
 */

import Backbone from 'backbone';
import _ from 'underscore';

/**
 * @class Router
 */
export class Router extends Backbone.Router {
    /**
     * @param {Object} options
     */
    constructor(options) {
        super(options);

        this.registeredRoutes = [];
    }

    /**
     * @param {string} route
     * @param {string} name
     * @param {Function} callback
     * @param {boolean} prepend
     * @returns {Router}
     */
    registerRoute(route, name, callback, prepend = false) {
        let registeredRoute = {
                route: route,
                name: name,
                callback: callback
            };

        if (prepend) {
            this.registeredRoutes.unshift(registeredRoute);
        } else {
            this.registeredRoutes.push(registeredRoute);
        }

        return this;
    }

    /**
     * @param {Function} callback
     * @param {Array} args
     */
    execute(callback, args) {
        if (callback) {
            callback.apply(this, args);
        }
    }

    /**
     * @returns {void}
     */
    startListening() {
        let hasNotFound = undefined !== _.find(this.registeredRoutes, function (route) {
                return '*' === route.route.charAt(0);
            });

        if (false === hasNotFound) {
            this.registerRoute('*notfound', 'not-found', _.bind(this.notFound, this), true);
        }

        this.registeredRoutes.forEach((registeredRoute) => {
            this.route(registeredRoute.route, registeredRoute.name, registeredRoute.callback);
        });

        Backbone.history.start();
    }

    /**
     * @param {string} route
     * @returns {void}
     */
    notFound(route) {
        this.trigger('404', route);
    }

    /**
     * @returns {Array}
     */
    getRoutes() {
        return this.registeredRoutes.map(function (registeredRoute) {
            return registeredRoute.route;
        });
    }
}