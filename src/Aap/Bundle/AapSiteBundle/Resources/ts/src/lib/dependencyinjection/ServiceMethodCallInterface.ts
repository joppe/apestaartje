/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

/**
 * An object that holds the name of a method that needs to be called on a service. The args are the arguments
 * passed to that method.
 *
 * @interface ServiceMethodCallInterface
 */
interface ServiceMethodCallInterface {
    /**
     * The name of the method.
     */
    name:string;

    /**
     * The arguments for the method.
     */
    args:any[];
}
