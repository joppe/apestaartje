/**
 * @interface ServiceInterface
 */
interface ServiceInterface {
    /**
     * Set the value of parameter.
     */
    setParameter(name:string, value:any):ServiceInterface;

    /**
     * Get the value of a parameter.
     */
    getParameter(name:string):any;

    /**
     * Get the parameter hash.
     */
    getParameters():ServiceParameterArrayInterface;

    /**
     * Check if a parameter exists.
     */
    hasParameter(name:string):boolean;

    /**
     * Get the identifier of the service.
     */
    getIdentifier():string

    /**
     * Adding a method call that will be executed after calling the service function.
     */
    addMethodCall(name:string, args:any[] = []):ServiceInterface;

    /**
     * Execute the service function.
     */
    call():any;
}
