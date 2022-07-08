export interface HTMLCustomElement extends HTMLElement {
  attributeChangedCallback?(
    attributeName: string,
    oldValue: string | null,
    newValue: string | null,
  ): void;
  connectedCallback?(): void;
  disconnectedCallback?(): void;
}
