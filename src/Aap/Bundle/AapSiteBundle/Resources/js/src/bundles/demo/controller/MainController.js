/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

import {Controller} from 'framework/controller/Controller';
import {route} from 'framework/router/RouteAnnotation';
import Backbone from 'backbone';
import $ from 'jquery';

/**
 * @class MainController
 */
export class MainController extends Controller {
    constructor() {
        super();

        console.log('new maincontroller');
    }

    /**
     * @param {Request} request
     * @returns {void}
     */
    @route('')
    indexAction(request) {
        console.log('index action', request);
    }

    /**
     * @returns {void}
     */
    @route('form')
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
    @route('recipe/:id')
    recipeAction(id) {
        console.log('recipe action');
    }

    /**
     * @returns {void}
     */
    @route('red')
    redAction() {
        $('body').css('background-color', 'red');
        console.log('red action');
    }

    /**
     * @returns {void}
     */
    @route('blue')
    blueAction() {
        $('body').css('background-color', 'blue');
        console.log('blue action');
    }
}