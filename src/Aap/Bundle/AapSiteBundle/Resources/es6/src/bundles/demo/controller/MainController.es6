/**
 * @author Joppe Aarts <joppe@zicht.nl>
 * @copyright Zicht Online <http://zicht.nl>
 */

import {Controller} from 'framework/controller/Controller';
import $ from 'jquery';

/**
 * @class MainController
 */
export class MainController extends Controller {
    get actions() {
        return {
            'index': '',
            'recipe': 'recipe/:id',
            'red': 'red',
            'blue': 'blue'
        }
    }

    indexAction() {
        console.log('index action');
    }

    recipeAction(id) {
        console.log('recipe action');
    }

    redAction() {
        $('body').css('background-color', 'red');
        console.log('red action');
    }

    blueAction() {
        $('body').css('background-color', 'blue');
        console.log('blue action');
    }
}