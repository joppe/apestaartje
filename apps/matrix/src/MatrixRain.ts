import { Animator } from '@apestaartje/animation/animator/Animator';
import type { Chronometer } from '@apestaartje/animation/animator/Chronometer';
import { Stage } from '@apestaartje/animation/stage/Stage';
import { Component } from '@apestaartje/dom/custom-element/component/Component';
import { Input } from '@apestaartje/dom/custom-element/input/Input';
import { InputType } from '@apestaartje/dom/custom-element/input/InputType';

import '../style/main.css';

import { BACKGROUND } from './colors';
import { Factory } from './column/factory/Factory';

@Component({
  selector: 'matrix-rain',
  template: '',
})
export class MatrixRain extends HTMLElement {
  @Input({
    type: InputType.Int,
    watch: true,
  })
  declare public width: number;

  @Input({
    type: InputType.Int,
    watch: true,
  })
  declare public height: number;

  @Input({
    type: InputType.Int,
    attribute: 'blur-factor',
    watch: true,
  })
  declare public blurFactor: number;

  constructor() {
    super();
  }

  public connectedCallback(): void {
    const fontSize = 24;
    const size = { width: this.width, height: this.height };
    const stage = new Stage(size);
    const factory = new Factory(size, { fontSize });

    stage.element.style.backgroundColor = BACKGROUND;
    stage.element.style.filter = `blur(${this.blurFactor}px)`;

    const animator = new Animator((time: Chronometer) => {
      stage.tick(time);
      stage.render();

      const column = factory.tick();

      if (column !== undefined) {
        stage.getLayer().addAsset(column, `column-${column.id}`, 10);
      }

      return true;
    });

    this.appendChild(stage.element);

    animator.start();
  }
}
