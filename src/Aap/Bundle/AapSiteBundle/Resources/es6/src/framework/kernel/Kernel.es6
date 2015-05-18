/*global window*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {Container} from 'lib/dependencyinjection/Container';
import {Router} from 'framework/router/Router';
import {ControllerFactory} from 'framework/controller/ControllerFactory';

/**
 * @class Kernel
 */
export class Kernel {
    /**
     * Constructor
     *
     * @param {string} environment
     * @param {boolean} debug
     */
    constructor(environment, debug = false) {
        this.environment = environment;
        this.debug = debug;

        this.init();
        this.boot();
    }

    /**
     * @returns {void}
     */
    init() {
        this.container = new Container();
        this.bundles = this.registerBundles();

        this.container.register('kernel', function () {
            return this;
        });
        this.container.register('controllerfactory', function () {
            let controllerFactory = new ControllerFactory();

            controllerFactory.setContainer(this.container);

            return controllerFactory;
        }.bind(this));
        this.container.register('router', function (controllerfactory) {
            return new Router({}, controllerfactory);
        });

        if (true === this.debug) {
            window.container = this.container;
        }
    }

    /**
     * @returns {void}
     */
    boot() {
        this.bundles.forEach(bundle => {
            bundle.setContainer(this.container);
            bundle.init();
        });

        this.bundles.forEach(bundle => {
            bundle.boot();
        });

        this.container.get('router').startListening();
    }

    /**
     * @returns {Container}
     */
    getContainer() {
        return this.container;
    }

    /**
     * @returns {Array}
     */
    getBundles() {
        return this.bundles;
    }

    /**
     * @returns {Array}
     */
    registerBundles() {
        return [];
    }

    /**
     * @returns {string}
     */
    getEnvironment() {
        return this.environment;
    }

    /**
     * @returns {boolean}
     */
    isDebug() {
        return this.debug;
    }
}