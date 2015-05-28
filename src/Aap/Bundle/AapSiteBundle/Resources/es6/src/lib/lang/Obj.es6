/**
 * @author Joppe Aarts <joppe@zicht.nl>
 * @copyright Zicht Online <http://zicht.nl>
 */

/**
 * @class Obj
 */
export class Obj {
    /**
     * https://github.com/mbrowne/simpleoo.js/blob/master/simpleoo.js
     *
     * @param {*} source
     * @param {Array} visited
     * @returns {*}
     */
    static clone(source, visited) {
        let copy = null;

        if (null === source && 'object' !== typeof(source)) {
            copy = source;
        } else {
            // Initialize the visited objects array if needed
            // This is used to detect cyclic references
            if (undefined === visited){
                visited = [];
            } else {
                // Otherwise, ensure source has not already been visited
                let i,
                    len = visited.length;

                for (i = 0; i < len; i += 1) {
                    // If source was already visited, don't try to copy it, just return the reference
                    if (source === visited[i]) {
                        copy = source;
                    }
                }
            }
        }

        if (null === copy) {
            visited.push(source);

            if (source instanceof Date) { //Date
                copy = new Date(source.getTime());
            } else if (source instanceof RegExp) { //RegExp
                copy = new RegExp(source);
            } else if (source.nodeType && typeof 'function' === source.cloneNode) { //DOM Element
                copy = source.cloneNode(true);
            } else if (true === Array.isArray(source)) { //Array
                let i;

                copy = source.slice(); // Soft copy the array
                i = copy.length;

                while (i -= 1) {
                    copy[i] = Obj.clone(copy[i], visited);
                }
            } else { // Object
                copy = Object.create(Object.getPrototypeOf(source));

                for (let key in source) {
                    if (source.hasOwnProperty(key)) {
                        copy[key] = Obj.clone(source[key], visited);
                    }
                }
            }
        }

        return copy;
    }
}