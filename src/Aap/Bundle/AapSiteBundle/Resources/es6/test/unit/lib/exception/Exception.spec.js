/*global describe, it, expect*/

import {Exception} from 'lib/exception/Exception';

describe('Exception', function () {
    'use strict';

    it('Only excepts a message as argument', function () {
        let e = new Exception('foo');

        expect(e.message).toBe('foo');
    });
});