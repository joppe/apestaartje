/// <reference path="ServiceParameterArrayInterface.ts" />
/// <reference path="ServiceMethodCallInterface.ts" />
/// <reference path="ServiceInterface.ts" />

import {Func} from './../lang/Func';
import {ServiceResult} from './ServiceResult';

/**
 * A service holds a function that is lazy loaded. All the dependencies of the function are defined as arguments of the
 * function. An argument is called a parameter and is resolved when the service is called.
 * The parameter name must correspond with an identifier of an other service. It can also be set with the `setParameter`
 * method.
 *
 * @class Service
 */
export class Service implements ServiceInterface {
    /**
     * The unique identifier of this service.
     *
     * @type {string}
     */
    private identifier:string;

    /**
     * The Func instance that wraps the service function.
     *
     * @type {Func}
     */
    private func:Func;

    /**
     * Tells if the function can only be executed once.
     *
     * @type {boolean}
     */
    private isSingleton:boolean;

    /**
     * The parameters that will be used as arguments when calling the service function.
     *
     * @type {ServiceParameterArrayInterface}
     */
    private parameters:ServiceParameterArrayInterface = {};

    /**
     * The methods that need to be called after executing the service function.
     * 
     * @type {Array}
     */
    private methodCalls:ServiceMethodCallInterface[] = [];

    /**
     * The cached result of the executed service function.
     *
     * @type {ServiceResult}
     */
    private result:ServiceResult;
    
    /**
     * @param {string} identifier
     * @param {Function} func the service function
     * @param {boolean} [isSingleton]
     */
    constructor(identifier:string, func:Function, isSingleton:boolean = true) {
        this.identifier = identifier;
        this.func = new Func(func, isSingleton ? 1 : -1);
        this.isSingleton = isSingleton;

        this.func.argumentNames.forEach((name:string) => {
            this.setParameter(name, undefined);
        });
    }

    /**
     * @param {string} name
     * @param {any} value
     * @returns {ServiceInterface}
     * @throws Error
     */
    setParameter(name:string, value:any):ServiceInterface {
        if (false === this.hasParameter(name)) {
            throw new Error(`Parameter "${name}" does not exist for service "${this.identifier}"`);
        }
        
        this.parameters[name] = value;

        return this;
    }

    /**
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
     * @returns {ServiceParameterArrayInterface}
     */
    getParameters():ServiceParameterArrayInterface {
        return this.parameters;
    }

    /**
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

    /**
     * @param {string} name
     * @param {Array} args
     * @returns {ServiceInterface}
     */
    addMethodCall(name:string, args:any[] = []):ServiceInterface {
        this.methodCalls.push(<ServiceMethodCallInterface>{
            name,
            args
        });

        return this;
    }

    /**
     * Get the arguments for the function.
     *
     * @returns {Array}
     */
    getArguments():any[] {
        let args = [];

        for (let parameter in this.parameters) {
            if (this.parameters.hasOwnProperty(parameter)) {
                args.push(this.parameters[parameter]);
            }
        }

        return args;
    }

    /**
     * @returns {any}
     */
    call():any {
        if (0 === this.func.getExecutionCount() || false === this.isSingleton) {
            this.result = new ServiceResult(this.func.invoke(this.getArguments()));

            this.methodCalls.forEach((methodCall:ServiceMethodCallInterface) => {
                this.result.callMethod(methodCall.name, methodCall.args);
            });
        }

        return this.result.getValue();
    }
}
