import type { ElementConfig, TagName } from './ElementConfig';

export function element<K extends TagName>(
  config: ElementConfig<K>,
): HTMLElementTagNameMap[K] {
  const [tagName, attributes = {}, children] = config;
  const el = document.createElement(tagName);

  Object.keys(attributes).forEach((key) => {
    el.setAttribute(key, attributes[key]);
  });

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (Array.isArray(child)) {
        el.appendChild(element(child));
      } else {
        el.appendChild(child);
      }
    });
  } else if (children !== undefined) {
    el.innerText = children;
  }

  return el;
}
