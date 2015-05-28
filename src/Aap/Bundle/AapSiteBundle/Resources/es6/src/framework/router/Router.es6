/*global window*/

/**
 * @author Joppe Aarts <joppe@zicht.nl>
 * @copyright Zicht Online <http://zicht.nl>
 */

import Backbone from 'backbone';

/**
 * @class Router
 */
export class Router extends Backbone.Router {
    /**
     * @param {Object} options
     * @param {Request} request
     * @param {ControllerFactory} controllerFactory
     */
    constructor(options, request, controllerFactory) {
        super(options);

        this.request = request;
        this.controllerFactory = controllerFactory;
        this.registeredRoutes = [];

        this.registerRoute('*notfound', 'not-found', this.notFound.bind(this));
    }

    /**
     * @param {string} className
     * @returns {Controller}
     */
    getController(className) {
        return this.controllerFactory.getController(className);
    }

    /**
     * @param {Controller} controller
     */
    registerController(controller) {
        if (undefined !== controller.routes) {
            controller.routes.forEach((route) => {
                this.registerRoute(route.route, route.name, () => {
                    let controller = this.getController(route.className);

                    controller[route.method].apply(controller, arguments);
                });
            });
        }
    }

    /**
     * @param {string} route
     * @param {string} name
     * @param {Function} callback
     * @returns {Router}
     */
    registerRoute(route, name, callback) {
        this.registeredRoutes.push({
            route: route,
            name: name,
            callback: callback
        });

        return this;
    }

    /**
     * @param {Function} callback
     * @param {Array} args
     */
    execute(callback, args) {
        if (callback) {
            this.request.setUri(window.location.hash.replace(/^#/, ''));

            args.unshift(this.request);

            callback.apply(this, args);
        }
    }

    /**
     * @returns {void}
     */
    startListening() {
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
        return this.registeredRoutes.map((registeredRoute) => {
            return registeredRoute.route;
        });
    }
}