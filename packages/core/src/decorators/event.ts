export class EventEmitter<T> {
  constructor(
    private target: HTMLElement,
    private eventName: string,
    private options: EventInit = {},
  ) {}

  emit(value: T) {
    this.target.dispatchEvent(
      new CustomEvent<T>(this.eventName, { detail: value, ...this.options }),
    );
  }
}

export function event(options: EventInit = {}) {
  return (component: HTMLElement, name: string) => {
    const descriptor = {
      get(this: HTMLElement) {
        return new EventEmitter(this, name, options);
      },
      enumerable: true,
      configurable: true,
    };

    return Object.defineProperty(component, name, descriptor);
  };
}
