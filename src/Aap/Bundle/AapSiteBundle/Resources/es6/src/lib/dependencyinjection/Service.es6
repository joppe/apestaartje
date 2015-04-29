/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {Func} from 'lib/lang/Func';
import {Exception} from 'lib/exception/Exception';
import _ from 'underscore';

/**
 * @class Service
 */
export class Service {
    /**
     * @param {string} identifier
     * @param {Function} func
     * @param {boolean} [singleton]
     */
    constructor(identifier, func, singleton = true) {
        this.identifier = identifier;
        this.argumentNames = Func.argumentNames(func);
        this.parameters = {};
        this.methodCalls = [];

        this.argumentNames.forEach((name) => {
            this.setParameter(name, undefined);
        });

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
     * @throws Exception
     */
    call() {
        let args = [],
            obj;

        this.argumentNames.forEach((name) => {
            args.push(this.getParameter(name));
        });

        obj = this.func.apply(this.func, args);

        this.methodCalls.forEach((methodCall) => {
            if (false === _.isFunction(obj[methodCall.methodName])) {
                throw new Exception('Method "' + methodCall.methodName + '" does not exist');
            }

            obj[methodCall.methodName].apply(methodCall.args);
        });

        return obj;
    }

    /**
     * @param {string} name
     * @param {*} value
     * @returns {Service}
     */
    setParameter(name, value) {
        this.parameters[name] = value;

        return this;
    }

    /**
     * @param {string} name
     * @returns {*}
     * @throws {Exception}
     */
    getParameter(name) {
        if (undefined === this.parameters[name]) {
            throw new Exception('Parameter "' + name + '" does not exist for service "' + this.identifier + '"');
        }

        return this.parameters[name];
    }

    /**
     * @returns {string}
     */
    getIdentifier() {
        return this.identifier;
    }

    /**
     * @param {string} methodName
     * @param {Array} args
     * @returns {Service}
     */
    addMethodCall(methodName, args) {
        this.methodCalls.push({
            methodName: methodName,
            args: args
        });

        return this;
    }
}