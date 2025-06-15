import { Injectable } from '@apestaartje/dependency-injection/decorator/Injectable';

import type { Storage } from './Storage';

@Injectable('storage')
export class Local implements Storage {
  public get<T>(key: string): T {
    const raw: string | null = window.localStorage.getItem(key);

    if (raw === null) {
      throw new Error(`Could not find "${key}" in local storage.`);
    }

    return <T>JSON.parse(raw);
  }

  public set<T>(key: string, data: T): void {
    window.localStorage.setItem(key, JSON.stringify(data));
  }

  public has(key: string): boolean {
    return window.localStorage.getItem(key) !== null;
  }

  public clear(key?: string): void {
    if (key === undefined) {
      window.localStorage.clear();
    } else {
      window.localStorage.removeItem(key);
    }
  }
}
