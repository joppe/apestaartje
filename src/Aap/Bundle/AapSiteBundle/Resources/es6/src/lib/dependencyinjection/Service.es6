/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {Func} from 'lib/lang/Func';
import _ from 'underscore';

/**
 * @class Service
 */
export class Service {
    /**
     * @param {Function} func
     * @param {boolean} [singleton]
     */
    constructor(func, singleton = true) {
        this.argumentNames = Func.argumentNames(func);

        if (true === singleton) {
            this.func = _.once(func);
        } else {
            this.func = func;
        }
    }

    /**
     * Returns an array with the names of the arguments that need to be passed to the service function
     *
     * @returns {Array}
     */
    getArgumentNames() {
        return this.argumentNames;
    }

    /**
     * Get the result of the service function
     *
     * @returns {*}
     */
    call() {
        return this.func.apply(this.func, arguments);
    }
}