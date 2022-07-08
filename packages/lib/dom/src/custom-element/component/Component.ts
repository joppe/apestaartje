import { Constructor } from '@apestaartje/types/Constructor';

import { isValidSelector } from './isValidSelector';
import type { Options } from './Options';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Component<T extends Constructor<any>>(
  options: Options,
): (target: T) => T {
  if (!isValidSelector(options.selector)) {
    throw new Error(
      `Invalid CustomElement selector "${options.selector}", always use a "-" in the name of the tag.`,
    );
  }

  const template: HTMLTemplateElement = document.createElement('template');
  const style: string =
    options.style === undefined ? '' : `<style>${options.style}</style>`;

  template.innerHTML = `
        ${style}
        ${options.template}
    `;

  return (target: T): T => {
    const customElement: T = class extends target {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      constructor(...args: any[]) {
        super(...args);

        if (options.useShadowRoot) {
          this.attachShadow({ mode: 'open' });
        }
      }

      public connectedCallback(): void {
        if (options.useShadowRoot) {
          (<ShadowRoot>this.shadowRoot).appendChild(
            template.content.cloneNode(true),
          );
        } else {
          this.appendChild(template.content.cloneNode(true));
        }

        if (super.connectedCallback) {
          super.connectedCallback();
        }
      }
    };

    window.customElements.define(options.selector, customElement);

    return customElement;
  };
}
