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
     */
    constructor() {
        this.container = new Container();
        this.bundles = this.registerBundles();
    }

    /**
     * @returns {void}
     */
    boot() {
        this.initializeBundles();
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
     * @returns {void}
     */
    initializeBundles() {
        this.bundles.forEach(bundle => {
            bundle.setContainer(this.container);
        });
    }
}