import { PlainCallback } from '../types';

export class Disposal {
  constructor(private dispose: PlainCallback[] = []) {}

  add(callback: PlainCallback) {
    this.dispose.push(callback);
  }

  empty() {
    this.dispose.forEach((fn) => fn());
    this.dispose = [];
  }
}
