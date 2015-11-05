/*global window*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import Backbone from 'backbone';
import _ from 'underscore';

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
        this.registeredRoutes = {};

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
     * @param {string} bundle
     * @param {Controller} controller
     */
    registerController(bundle, controller) {
        if (undefined !== controller.routes) {
            controller.routes.forEach((route) => {
                let name = bundle + ':' + route.name;

                // somehow this cannot be a fat arrow function, the arguments array will be that of the outer most
                // function
                this.registerRoute(route.route, name, function () {
                    let controller = this.getController(route.className);

                    controller[route.method].apply(controller, arguments);
                }.bind(this));
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
        this.registeredRoutes[name] = {
            route: route,
            callback: callback
        };

        return this;
    }

    /**
     * @param {Function} callback
     * @param {Array} args
     */
    execute(callback, args) {
        if (callback) {
            let name = callback.apply(null),
                route = this.registeredRoutes[name];

            this.request.setUri(window.location.hash.replace(/^#/, ''));

            args.unshift(this.request);

            route.callback.apply(this, args);
        }
    }

    /**
     * @returns {void}
     */
    startListening() {
        _.each(this.registeredRoutes, (registeredRoute, routeName) => {
            this.route(registeredRoute.route, routeName, function () {
                return routeName;
            });
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
        return _.map(this.registeredRoutes, (registeredRoute, routeName) => {
            return {
                name: routeName,
                route: registeredRoute.route
            };
        });
    }
}