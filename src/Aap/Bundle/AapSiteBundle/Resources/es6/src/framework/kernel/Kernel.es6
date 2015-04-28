/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {Container} from 'lib/dependencyinjection/Container';

/**
 * @class Kernel
 */
export class Kernel {
    constructor() {
        this.container = new Container();
        this.bundles = this.registerBundles();
    }

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

    initializeBundles() {
        this.bundles.forEach(bundle => {
            bundle.setContainer(this.container);
        });
    }
}