/**
 * @author Joppe Aarts <joppe@zicht.nl>
 * @copyright Zicht Online <http://zicht.nl>
 */

import {RouteAnnotation} from 'framework/router/RouteAnnotation';
import Backbone from 'backbone';
import _ from 'underscore';

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

        this.registerRoute('*notfound', 'not-found', _.bind(this.notFound, this));
/*
        _.each(RouteAnnotation.getRoutes(), (route) => {
            this.registerRoute(route.route, route.name, function () {
                let controller = this.getController(route.className);

                controller[route.method].apply(controller, arguments);
            });
        });
        /**/
    }

    /**
     * @param {string} className
     * @returns {Controller}
     */
    getController(className) {
        return this.controllerFactory.getController(className);
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
        return this.registeredRoutes.map(function (registeredRoute) {
            return registeredRoute.route;
        });
    }
}