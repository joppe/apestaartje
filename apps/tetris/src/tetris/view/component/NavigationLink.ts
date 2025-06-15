import { ChildElement } from '@apestaartje/dom/custom-element/child-element/ChildElement';
import { Component } from '@apestaartje/dom/custom-element/component/Component';
import { Input } from '@apestaartje/dom/custom-element/input/Input';
import type { EventEmitter } from '@apestaartje/dom/custom-element/output/EventEmitter';
import { Output } from '@apestaartje/dom/custom-element/output/Output';

@Component({
  selector: 'tetris-navigation-link',
  template: ` <button type="button"></button> `,
})
export class NavigationLink extends HTMLElement {
  @Input({
    attribute: 'event-name',
  })
  declare public eventName: string;

  @Input()
  declare public title: string;

  @Output('state-change')
  declare public stateChange: EventEmitter<string>;

  @ChildElement('button')
  declare public button: HTMLElement | null;

  public connectedCallback(): void {
    if (this.button === null) {
      return;
    }

    this.button.setAttribute('data-event', this.eventName);
    this.button.innerText = this.title;
    this.button.addEventListener('click', (): void => {
      this.stateChange.emit(this.eventName);
    });
  }
}
