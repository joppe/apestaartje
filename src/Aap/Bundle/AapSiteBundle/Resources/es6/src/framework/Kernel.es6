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
        // Make sure bundles is an array
        if (undefined === this.bundles) {
            this.bundles = [];
        }

        this.container = new Container();

        this.registerBundles();
    }

    /**
     * @returns {Container}
     */
    getContainer() {
        return this.container;
    }

    registerBundles() {
        this.bundles.forEach(Bundle => {
            new Bundle(this.container);
        });
    }
}