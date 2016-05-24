/**
 * @interface ContainerAwareInterface
 */
interface ContainerAwareInterface {
    /**
     * Set the dependency injection container.
     * 
     * @param {Container} container
     * @returns {ContainerAwareInterface}
     */
    setContainer(container:Container):ContainerAwareInterface;
}
