import { Component } from '../component/Component';
import type { EventEmitter } from './EventEmitter';
import { Output } from './Output';

@Component({
  selector: 'test-output',
  template: ` <h1>Testing</h1> `,
})
class Test extends HTMLElement {
  @Output('counter')
  public declare counter: EventEmitter<number>;

  private _count = 0;

  public trigger(): void {
    this._count += 1;

    this.counter.emit(this._count);
  }
}

describe('Output', (): void => {
  it('fire a CustomEvent', (): void => {
    window.document.body.appendChild(document.createElement('test-output'));

    const el: Test = <Test>window.document.querySelector('test-output');
    let catchCount = 0;
    let lastValue: number | undefined;

    window.document.body.addEventListener('counter', (event: Event): void => {
      catchCount += 1;
      lastValue = (event as CustomEvent<number>).detail;
    });

    el.trigger();

    expect(catchCount).toBe(1);
    expect(lastValue).toBe(1);
  });
});
