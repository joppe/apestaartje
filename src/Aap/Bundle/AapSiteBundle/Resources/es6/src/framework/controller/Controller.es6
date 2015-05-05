/**
 * @author Joppe Aarts <joppe@zicht.nl>
 * @copyright Zicht Online <http://zicht.nl>
 */

import {ContainerAware} from 'lib/dependencyinjection/ContainerAware';

/**
 * @class
 */
export class Controller extends ContainerAware {
    /**
     * @returns {Object}
     */
    get actions() {
        return {};
    }

    /**
     * @param {string} route
     * @param {string} name
     * @param {string} method
     * @returns {Controller}
     */
    registerAction(route, name, method) {
        let router = this.container.get('router');

        router.registerRoute(route, name, _.bind(this[method], this));

        return this;
    }

    /**
     * @returns {void}
     */
    registerActions() {
        let actions = this.actions;

        for (let name in actions) {
            if (actions.hasOwnProperty(name) ) {
                this.registerAction(actions[name], name, name + 'Action');
            }
        }
    }
}