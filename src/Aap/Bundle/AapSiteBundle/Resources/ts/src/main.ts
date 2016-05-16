import {Container} from './lib/dependencyinjection/Container';

let c = new Container();

c.register('foo', function () {
    console.log('foo');
}, true);

console.log(c.has('foo'));