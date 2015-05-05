/**
 * @author Joppe Aarts <joppe@zicht.nl>
 * @copyright Zicht Online <http://zicht.nl>
 */

import {Controller} from 'framework/controller/Controller';
import Backbone from 'backbone';
import $ from 'jquery';

/**
 * @class MainController
 */
export class MainController extends Controller {
    /**
     * @returns {Object}
     */
    get actions() {
        return {
            'index': '',
            'form': 'form',
            'recipe': 'recipe/:id',
            'red': 'red',
            'blue': 'blue'
        }
    }

    /**
     * @returns {void}
     */
    indexAction() {
        console.log('index action');
    }

    /**
     * @returns {void}
     */
    formAction() {
        let builder = this.container.get('formBuilder'),
            form;

        window.model = new Backbone.Model({
            title: 'Test it!'
        });

        form = builder({
            model: window.model
        });
        form.add('title', 'formTextField');

        $('body').append(form.render().$el);
    }

    /**
     * @param {number} id
     * @returns {void}
     */
    recipeAction(id) {
        console.log('recipe action');
    }

    /**
     * @returns {void}
     */
    redAction() {
        $('body').css('background-color', 'red');
        console.log('red action');
    }

    /**
     * @returns {void}
     */
    blueAction() {
        $('body').css('background-color', 'blue');
        console.log('blue action');
    }
}