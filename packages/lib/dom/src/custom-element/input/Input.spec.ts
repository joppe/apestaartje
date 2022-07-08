import { Component } from '../component/Component';
import { Input } from './Input';
import { InputType } from './InputType';

@Component({
  selector: 'test-input',
  template: ` <h1>Testing</h1> `,
})
class Test extends HTMLElement {
  @Input({
    attribute: 'text',
    type: InputType.Str,
  })
  public declare string: string;

  @Input({
    type: InputType.Float,
    watch: true,
  })
  public declare float: number;

  @Input({
    type: InputType.Bool,
    watch: false,
  })
  public declare declareboolean: boolean;

  public attributeChangedCallbackCalled = 0;

  public attributeChangedCallback(): void {
    this.attributeChangedCallbackCalled += 1;
  }
}

describe('Input', (): void => {
  let container: HTMLDivElement;

  beforeEach((): void => {
    container = document.createElement('div');

    container.innerHTML = `
        <test-input text="Hello World!" float="3.14" boolean="false"></test-input>
    `;

    window.document.body.appendChild(container);
  });

  afterEach((): void => {
    container.remove();
  });

  it('When the attribute is given, the name of the property will be ignored', (): void => {
    const el: Test = <Test>window.document.querySelector('test-input');

    expect(el.string).toBe('Hello World!');
  });

  it('When the type is given, the value will be cased to that type', (): void => {
    const el: Test = <Test>window.document.querySelector('test-input');

    expect(el.float).toBe(3.14);
  });

  it('When the watch is set to true, the attribute is watched', (): void => {
    const el: Test = <Test>window.document.querySelector('test-input');

    expect(el.float).toBe(3.14);

    el.setAttribute('float', '12');

    expect(el.float).toBe(12);

    /**
     * The method `attributeChangedCallback` is also called with the initial value.
     */
    expect(el.attributeChangedCallbackCalled).toBe(2);
  });
});
