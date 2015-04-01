/*global require, console*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

require(
    ['config'],
    function() {
        'use strict';

        require(
            [
                //'backbone',
                //'jquery',
                //'kernel',
                //'lib/lang/class',
                //'recipes/model/recipe',
                'lib/dsl/lexer',
                'lib/dsl/list-lexer',
                'lib/dsl/list-parser'
            ],
            function (
                //Backbone,
                //$,
                //Kernel,
                //Class,
                //Recipe,
                Lexer,
                ListLexer,
                ListParser
            ) {
                //var services = Kernel.getServices(),
                //    form,
                //    model;

                window.lexer = function (input) {
                    var l = new ListLexer(input),
                        t = l.nextToken();

                    while (t.type !== Lexer.EOF) {
                        console.log(t);
                        t = l.nextToken();
                    }

                    console.log(t);
                };

                window.parser = function (input) {
                    var lexer = new ListLexer(input),
                        parser = new ListParser(lexer);

                    parser.list();
                };

/*/
                window.model = model = new Recipe({
                    title: 'Paella',
                    thumbnail: 'http://s.iamafoodblog.com/wp-content/uploads/2012/07/paella-25.jpg',
                    text: 'Rijst op zijn italiaans',
                    kitchen: 'italiaans',
                    vegetarian: false,
                    ingredients: null
                });

                form = services.get('form.builder')({
                    model: model
                });
                form.add('title', 'form.field.string', {});
                form.add('thumbnail', 'form.field.file', {});
                form.add('text', 'form.field.text', {});
                form.add('kitchen', 'form.field.select', {
                    options: [
                        {id: 'nederlands', label: 'Nederlands'},
                        {id: 'frans', label: 'Frans'},
                        {id: 'italiaans', label: 'Italiaans'},
                        {id: 'oosters', label: 'Oosters'}
                    ],
                    defaultValue: 'nederlands'
                });
                form.add('vegetarian', 'form.field.radio', {
                    options: [
                        {id: false, label: 'Nee'},
                        {id: true, label: 'Ja'}
                    ],
                    defaultValue: false
                });
                /**/
                /*/
                form.add('accessoires', 'form.field.checkbox', {
                    options: [
                        {id: 'airco', label: 'Airco'},
                        {id: 'navigation', label: 'Navigation'},
                        {id: 'airbag', label: 'Airbag'},
                        {id: 'parc-assist', label: 'Parc assist'}
                    ]
                });
                /**/
                //form.add('send', 'form.field.submit', {});

                //$('body').append(form.render().el);
            }
        );
    }
);