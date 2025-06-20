import { Component } from '../component/Component';

import { ChildElements } from './ChildElements';

@Component({
  selector: 'test-childelements',
  template: `
    <div>
      <h1>Testing</h1>
      <p><b>Lorem</b> ipsum</p>
      <p>dolor sit amet</p>
    </div>
  `,
})
class Test extends HTMLElement {
  @ChildElements('p')
  declare public p: HTMLElement[];

  @ChildElements('h2')
  declare public h2: HTMLElement[];
}

describe('ChildElements', (): void => {
  it('The decorator will fetch the elements from the shadow DOM', (): void => {
    window.document.body.appendChild(
      document.createElement('test-childelements'),
    );

    const el: Test = <Test>window.document.querySelector('test-childelements');

    expect(el.p.length).toBe(2);
    expect(el.p[1].textContent).toBe('dolor sit amet');
  });

  it('The value will be `null` if the element is not found', (): void => {
    window.document.body.appendChild(
      document.createElement('test-childelements'),
    );

    const el: Test = <Test>window.document.querySelector('test-childelements');

    expect(el.h2).toEqual([]);
  });
});
