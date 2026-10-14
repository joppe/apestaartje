export type TagName = keyof HTMLElementTagNameMap;

export type ElementConfig<K extends TagName = TagName> = [
  tagName: K,
  attributes?: Record<string, string>,
  children?: string | (ElementConfig | Element)[],
];
