/*global describe, it, expect*/

import {Xhr} from 'bundles/backbone/sync/Xhr';

describe('Xhr', function () {
    'use strict';

    it('Should exist', function () {
        let x = new Xhr();

        expect(x.csrf).toBe(null);
    });
});