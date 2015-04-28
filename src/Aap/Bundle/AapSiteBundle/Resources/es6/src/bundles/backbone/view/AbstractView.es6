/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import _ from 'underscore';
import Backbone from 'backbone';

/**
 * @class AbstractView
 */
export class AbstractView extends Backbone.View {
    /**
     * Constructor
     *
     * @param {Object} options
     */
    constructor(options) {
        super(options);

        this.children = {};
    }

    /**
     * @returns {string}
     */
    getIdentifier() {
        return this.model.cid;
    }

    /**
     * @param {AbstractView} child
     * @returns {AbstractView}
     */
    addChild(child) {
        this.children[child.getIdentifier()] = child;

        return this;
    }

    /**
     * @param {AbstractView} child
     * @returns {AbstractView}
     */
    removeChild(child) {
        child.remove();

        delete this.children[child.getIdentifier()];

        return this;
    }

    /**
     * @returns {AbstractView}
     */
    render() {
        _.each(this.children, function (child) {
            this.$el.append(child.render().$el);
        }, this);

        return this;
    }

    /**
     * @returns {AbstractView}
     */
    remove() {
        _.each(this.children, function (child) {
            this.removeChild(child);
        }, this);

        this.stopListening();
        this.$el.remove();
    }
}