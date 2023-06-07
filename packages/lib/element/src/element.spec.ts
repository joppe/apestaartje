import { element } from './element';

describe('element', () => {
  it('should generate DOM elements', () => {
    const el = element(['div', { class: 'foo' }, 'bar']);

    expect(el.tagName.toUpperCase()).toEqual('DIV');
    expect(el.className).toEqual('foo');
    expect(el.innerText).toEqual('bar');
  });
});
