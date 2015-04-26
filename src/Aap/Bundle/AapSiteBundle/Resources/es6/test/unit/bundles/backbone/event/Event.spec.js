/*global describe, it, expect*/

import {Event} from 'bundles/backbone/event/Event';

describe('Event', function () {
    'use strict';

    it('Listen to events', function () {
        let e = new Event(),
            fired = false;

        e.on('test', function () {
            fired = true;
        });

        e.trigger('test');
        expect(fired).toBe(true);
    });
});