import { Component } from './Component';

@Component({
  selector: 'test-component',
  template: `<p>This is the test root</p>`,
  style: `
        p {
            color: rgb(255, 0, 0);
        }
    `,
})
class Test extends HTMLElement {}

describe('Component', (): void => {
  it('The type of the element matches the class name', (): void => {
    window.document.body.appendChild(document.createElement('test-component'));

    const el = window.document.querySelector('test-component');

    expect(el instanceof Test).toBe(true);
  });

  it('The template is used as the innerHTML', (): void => {
    window.document.body.appendChild(document.createElement('test-component'));

    const el = window.document.querySelector('test-component');

    expect(el?.querySelector('p')?.textContent).toBe('This is the test root');
  });

  it('The styles are applied to the child elements', (): void => {
    window.document.body.appendChild(document.createElement('test-component'));

    const el = window.document.querySelector('test-component');
    const p = el?.querySelector('p');

    expect(window.getComputedStyle(<Element>p).getPropertyValue('color')).toBe(
      'rgb(255, 0, 0)',
    );
  });
});
