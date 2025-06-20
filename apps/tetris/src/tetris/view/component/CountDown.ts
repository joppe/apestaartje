import { ChildElements } from '@apestaartje/dom/custom-element/child-element/ChildElements';
import { Component } from '@apestaartje/dom/custom-element/component/Component';
import { Input } from '@apestaartje/dom/custom-element/input/Input';
import { InputType } from '@apestaartje/dom/custom-element/input/InputType';
import type { EventEmitter } from '@apestaartje/dom/custom-element/output/EventEmitter';
import { Output } from '@apestaartje/dom/custom-element/output/Output';

const ANIMATE_CLASS: string = 'animate';
const ACTIVE_CLASS: string = 'active';

@Component({
  selector: 'tetris-count-down',
  template: `
    <div class="c-countdown-counter">3</div>
    <div class="c-countdown-counter">2</div>
    <div class="c-countdown-counter">1</div>
  `,
})
export class CountDown extends HTMLElement {
  @ChildElements('.c-countdown-counter')
  declare public steps: HTMLElement[];

  @Input({
    attribute: 'active',
    watch: true,
    type: InputType.Bool,
  })
  declare public active: boolean;

  @Output('count-down-finished')
  declare public finished: EventEmitter<boolean>;

  declare private _interval: number;

  public attributeChangedCallback(name: string): void {
    if (name === 'active') {
      this.toggle();
    }
  }

  private toggle(): void {
    if (this.active === true) {
      this.classList.add(ACTIVE_CLASS);
      this.start();
    } else {
      this.classList.remove(ACTIVE_CLASS);
      this.stop();
    }
  }

  private stop(): void {
    window.clearTimeout(this._interval);
  }

  private start(): void {
    let currentStep: number = this.steps.length;

    this.reset();

    this._interval = window.setInterval((): void => {
      if (currentStep > 0) {
        this.animateStep(currentStep);
      }

      currentStep -= 1;

      if (currentStep < 0) {
        this.finished.emit(true);
        this.stop();
      }
    }, 1000);
  }

  private animateStep(value: number): void {
    const el: HTMLElement | undefined = this.steps.find(
      (step: HTMLElement): boolean => {
        return step.textContent === String(value);
      },
    );

    if (el === undefined) {
      throw new Error(`Could not find counter element with value "${value}"`);
    }

    el.classList.add(ANIMATE_CLASS);
  }

  private reset(): void {
    this.steps.forEach((step: HTMLElement): void => {
      step.classList.remove(ANIMATE_CLASS);
    });
  }
}
