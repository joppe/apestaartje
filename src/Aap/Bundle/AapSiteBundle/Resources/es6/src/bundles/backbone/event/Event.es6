/*global jqXHR*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import Backbone from 'backbone';
import _ from 'underscore';

/**
 * This is some syntactic sugar to make it easier to extend Backbone.Events which is an Object instead of a constructor
 * function/
 *
 * @class Event
 */
export class Event {
}

_.extend(Event.prototype, Backbone.Events);