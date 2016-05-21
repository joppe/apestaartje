import {Func} from './../lang/Func';

/**
 * @class Service
 */
export class Service {
    /**
     * The unique identifier of this servive
     *
     * @type {string}
     */
    private identifier:string;

    /**
     * The Func instance
     *
     * @type {Func}
     */
    private func:Func;

    /**
     * The parameters that will be used to execute the function.
     *
     * @type {object}
     */
    private parameters:{[id:string]:any} = {};

    /**
     * @param {string} identifier
     * @param {Function} func
     * @param {boolean} [singleton]
     */
    constructor(identifier:string, func:Function, singleton:boolean = true) {
        this.identifier = identifier;
        this.func = new Func(func, singleton ? 1 : -1);

        this.func.argumentNames.forEach((name) => {
            this.setParameter(name, undefined);
        });
    }

    /**
     * Set the value of a parameter
     *
     * @param {string} name
     * @param {any} value
     * @returns {Service}
     * @throws Error
     */
    setParameter(name:string, value:any):Service {
        if (false === this.hasParameter(name)) {
            throw new Error(`Parameter "${name}" does not exist for service "${this.identifier}"`);
        }
        
        this.parameters[name] = value;

        return this;
    }

    /**
     * Get a parameter by it's name
     *
     * @param {string} name
     * @returns {any}
     * @throws Error
     */
    getParameter(name:string):any {
        if (false === this.hasParameter(name)) {
            throw new Error(`Parameter "${name}" does not exist for service "${this.identifier}"`);
        }

        return this.parameters[name];
    }

    /**
     * Check if the service has a parameter
     *
     * @param {string} name
     * @returns {boolean}
     */
    hasParameter(name:string):boolean {
        return this.func.argumentNames.includes(name);
    }

    /**
     * @returns {string}
     */
    getIdentifier():string {
        return this.identifier;
    }
}
