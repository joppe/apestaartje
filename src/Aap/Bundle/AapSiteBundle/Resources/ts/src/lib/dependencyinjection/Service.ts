import {Func} from './../lang/Func';
import {MethodCall} from './MethodCall';
import {Result} from './Result';

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
     * If the function can only be executed once.
     *
     * @type {boolean}s
     */
    private singleton:boolean;

    /**
     * The parameters that will be used to execute the function.
     *
     * @type {object}
     */
    private parameters:{[id:string]:any} = {};

    /**
     * The methods that need to be called after executing the function.
     * 
     * @type {Array}
     */
    private methodCalls:MethodCall[] = [];

    /**
     * The cached result of the executed function.
     *
     * @type {Result}
     */
    private result:Result;
    
    /**
     * @param {string} identifier
     * @param {Function} func
     * @param {boolean} [singleton]
     */
    constructor(identifier:string, func:Function, singleton:boolean = true) {
        this.identifier = identifier;
        this.func = new Func(func, singleton ? 1 : -1);
        this.singleton = singleton;

        this.func.argumentNames.forEach((name:string) => {
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
     * @returns {string[]}
     */
    getParameters():string[] {
        return this.func.argumentNames;
    }

    /**
     * Check if the service has a parameter
     *
     * @param {string} name
     * @returns {boolean}
     */
    hasParameter(name:string):boolean {
        let parameters = this.getParameters();

        return parameters.includes(name);
    }

    /**
     * @returns {string}
     */
    getIdentifier():string {
        return this.identifier;
    }

    /**
     * Add a method call
     *
     * @param {string} name
     * @param {Array} args
     * @returns {Service}
     */
    addMethodCall(name:string, args:any[] = []):Service {
        this.methodCalls.push(new MethodCall(name, args));

        return this;
    }

    /**
     * Get the arguments for the function
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
     * Call the service
     *
     * @returns {any}
     */
    call():any {
        if (0 === this.func.getExecutionCount() || false === this.singleton) {
            this.result = new Result(this.func.invoke(this.getArguments()));

            this.methodCalls.forEach((methodCall:MethodCall) => {
                this.result.applyMethod(methodCall.getName(), methodCall.getArgs());
            });
        }

        return this.result.getValue();
    }
}
