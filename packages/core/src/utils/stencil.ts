export type StencilHook = 'connectedCallback'
| 'disconnectedCallback'
| 'componentWillRender'
| 'componentDidRender'
| 'componentWillLoad'
| 'componentDidLoad'
| 'componentShouldUpdate'
| 'componentWillUpdate'
| 'componentDidUpdate';

export function wrapStencilHook(component: any, lifecycle: StencilHook, hook: Function) {
  const prevHook = component[lifecycle];
  // eslint-disable-next-line func-names
  component[lifecycle] = function () {
    hook();
    return prevHook ? prevHook.call(component) : undefined;
  };
}

export function createStencilHook(
  component: any,
  onConnect: () => void,
  onDisconnect: () => void,
) {
  let connected = false;

  wrapStencilHook(component, 'componentWillLoad', () => {
    if (!connected) onConnect();
    connected = true;
  });

  wrapStencilHook(component, 'connectedCallback', () => {
    if (!connected) onConnect();
    connected = true;
  });

  wrapStencilHook(component, 'disconnectedCallback', () => {
    onDisconnect();
    connected = false;
  });
}
