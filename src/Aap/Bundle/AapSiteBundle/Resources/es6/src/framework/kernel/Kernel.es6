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
        let bundles = this.registerBundles();

        this.container = new Container();

        bundles.forEach(Bundle => {
            new Bundle(this.container);
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
    registerBundles() {
        return [];
    }
}