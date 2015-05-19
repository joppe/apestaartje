/**
 * @author Joppe Aarts <joppe@zicht.nl>
 * @copyright Zicht Online <http://zicht.nl>
 */

import {RouteAnnotation} from 'framework/router/RouteAnnotation';
import Backbone from 'backbone';

/**
 * @class Router
 */
export class Router extends Backbone.Router {
    /**
     * @param {Object} options
     * @param {ControllerFactory} controllerFactory
     */
    constructor(options, controllerFactory) {
        super(options);

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
        if (undefined !== controller.annotatedRoutes) {
            controller.annotatedRoutes.forEach((route) => {
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