/*global jqXHR*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {Event} from 'bundles/backbone/event/Event';

/**
 * @class Xhr
 */
export class Xhr extends Event {
    /**
     * @param {string} [csrf]
     */
    constructor(csrf = null) {
        super();

        this.csrf = csrf;
    }

    /**
     * @param {string} csrf
     * @returns {Xhr}
     */
    setCsrf(csrf) {
        this.csrf = csrf;

        return this;
    }

    /**
     * @param {string} method
     * @param {Backbone,Model} model
     * @param {Object} options
     * @returns {jqXHR}
     */
    sync(method, model, options) {
        let jqXHR,
            success = options.success || function () {},
            error = options.error || function () {},
            url = model.url(),
            data = _.isFunction(model.getData) ? model.getData() : model.attributes;

        if (null !== this.csrf) {
            if (method === 'read') {
                url += '?csrf=' + this.csrf;
            } else {
                data.append('csrf', this.csrf);
            }
        }

        this.trigger('sync', jqXHR);

        jqXHR = $.ajax({
            url: url,
            type: method === 'read' ? 'GET' : 'POST',
            data: method === 'read' ? '' : data,
            processData: false,
            contentType: false
        }).done(_.bind(function (response) {
            if (response.error) {
                this.trigger('error', response);

                error(response);
            } else {
                success(response.data ? response.data : response);
            }
        }, this)).fail(_.bind(function (jqXHR, textStatus) {
            this.trigger('error', textStatus);

            error(textStatus);
        }, this));

        return jqXHR;
    }
}