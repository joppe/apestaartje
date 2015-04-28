/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {Container} from 'lib/dependencyinjection/Container';

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

        this.container = new Container();
        this.bundles = this.registerBundles();
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