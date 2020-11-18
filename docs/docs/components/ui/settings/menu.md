---
title: vm-menu
sidebar_label: Menu
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

This component is responsible for containing and managing menu items and submenus. The menu is ARIA
friendly by ensuring the correct ARIA properties are set, and enabling keyboard navigation when it
is focused.

You can use this component if you'd like to build out a custom settings menu. If you're looking
to only customize the content of the settings see [`vime-settings`](settings.md), and if
you want an easier starting point see [`vime-default-settings`](default-settings.md).

## Visual

<img
  src="https://raw.githubusercontent.com/vime-js/vime/master/packages/core/src/components/ui/settings/menu/menu.png"
  alt="Vime settings menu component"
/>

<!-- Auto Generated Below -->

## Usage

<Tabs
groupId="framework"
defaultValue="html"
values={[
{ label: 'HTML', value: 'html' },
{ label: 'React', value: 'react' },
{ label: 'Vue', value: 'vue' },
{ label: 'Svelte', value: 'svelte' },
{ label: 'Stencil', value: 'stencil' },
{ label: 'Angular', value: 'angular' }
]}>

<TabItem value="html">

```html {5-7}
<vm-player>
  <!-- ... -->
  <vm-ui>
    <!-- ... -->
    <vm-menu identifer="menu-id" controller="menu-controller-id" active>
      <!-- ... -->
    </vm-menu>
  </vm-ui>
</vm-player>
```

</TabItem>


<TabItem value="react">

```tsx {2,20-28}
import React, { useState } from "react";
import { Player, Ui, Menu } from "@vime/react";

function Example() {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const onOpen = () => {
    setIsMenuActive(true);
  };

  const onClose = () => {
    setIsMenuActive(false);
  };

  return (
    <Player>
      {/* ... */}
      <Ui>
        {/* ... */}
        <Menu
          identifer="menu-id"
          controller="menu-controller-id"
          active={isMenuActive}
          onVmOpen={onOpen}
          onVmClose={onClose}
        >
          <!-- ... -->
        </Menu>
      </Ui>
    </Player>
  );
}
```

</TabItem>


<TabItem value="vue">

```html {6-14,20,26} title="example.vue"
<template>
  <Player>
    <!-- ... -->
    <Ui>
      <!-- ... -->
      <menu
        identifer="menu-id"
        controller="menu-controller-id"
        :active="isMenuActive"
        @vmOpen="onOpen"
        @vmClose="onClose"
      >
        <!-- ... -->
      </menu>
    </Ui>
  </Player>
</template>

<script>
  import { Player, Ui, Menu } from '@vime/vue';

  export default {
    components: {
      Player,
      Ui,
      Menu,
    },
    data: {
      isMenuActive: false,
    },
    methods: {
      onOpen() {
        this.isMenuActive = true;
      },

      onClose() {
        this.isMenuActive = false;
      },
    },
  };
</script>
```

</TabItem>


<TabItem value="svelte">

```tsx {5-13}
<Player>
  <!-- ... -->
  <Ui>
    <!-- ... -->
    <Menu
      identifer="menu-id"
      controller="menu-controller-id"
      active={isMenuActive}
      on:vmOpen={onOpen}
      on:vmClose={onClose}
    >
      <!-- ... -->
    </Menu>
  </Ui>
</Player>
```

```html {2}
<script lang="ts">
  import { Player, Ui, Menu } from '@vime/svelte';

  let isMenuActive = false;

  const onOpen = () => {
    isMenuActive = true;
  };

  const onClose = () => {
    isMenuActive = false;
  };
</script>
```

</TabItem>


<TabItem value="stencil">

```tsx {18-26}
class Example {
  @State() isMenuActive = false;

  private onOpen() {
    this.isMenuActive = true;
  }

  private onClose() {
    this.isMenuActive = false;
  }

  render() {
    return (
      <vm-player>
        {/* ... */}
        <vm-ui>
          {/* ... */}
          <vm-menu
            identifer="menu-id"
            controller="menu-controller-id"
            active={this.isMenuActive}
            onVmOpen={this.onOpen.bind(this)}
            onVmClose={this.onClose.bind(this)}
          >
            {/* ... */}
          </vm-menu>
        </vm-ui>
      </vm-player>
    );
  }
}
```

</TabItem>


<TabItem value="angular">

```html {5-13} title="example.html"
<vm-player>
  <!-- ... -->
  <vm-ui>
    <!-- ... -->
    <vm-menu
      identifer="menu-id"
      controller="menu-controller-id"
      [active]="isMenuActive"
      (vmOpen)="onOpen()"
      (vmClose)="onClose()"
    >
      <!-- ... -->
    </vm-menu>
  </vm-ui>
</vm-player>
```

```ts title="example.ts"
class Example {
  isMenuActive = false;

  onOpen() {
    this.isMenuActive = true;
  }

  onClose() {
    this.isMenuActive = false;
  }
}
```

</TabItem>
    
</Tabs>


## Properties

| Property                  | Attribute    | Description                                                                        | Type      | Default     |
| ------------------------- | ------------ | ---------------------------------------------------------------------------------- | --------- | ----------- |
| `active`                  | `active`     | Whether the menu is open/visible.                                                  | `boolean` | `false`     |
| `controller` _(required)_ | `controller` | The `id` attribute value of the control responsible for opening/closing this menu. | `string`  | `undefined` |
| `identifier` _(required)_ | `identifier` | The `id` attribute of the menu.                                                    | `string`  | `undefined` |

## Events

| Event                   | Description                                           | Type                                                         |
| ----------------------- | ----------------------------------------------------- | ------------------------------------------------------------ |
| `vmClose`               | Emitted when the menu has closed/is not active.       | `CustomEvent<void>`                                          |
| `vmFocusMenuItemChange` | Emitted when the currently focused menu item changes. | `CustomEvent<HTMLVmMenuItemElement ∣ undefined>`             |
| `vmMenuItemsChange`     | Emitted when the menu items present changes.          | `CustomEvent<NodeListOf<HTMLVmMenuItemElement> ∣ undefined>` |
| `vmOpen`                | Emitted when the menu is open/active.                 | `CustomEvent<void>`                                          |

## Methods

### `focusOnOpen() => Promise<void>`

This should be called directly before opening the menu to set the keyboard focus on it. This
is a one-time operation and needs to be called everytime prior to opening the menu.

#### Returns

Type: `Promise<void>`

### `getController() => Promise<HTMLElement>`

Returns the controller responsible for opening/closing this menu.

#### Returns

Type: `Promise<HTMLElement>`

### `getFocusedMenuItem() => Promise<HTMLVmMenuItemElement>`

Returns the currently focused menu item.

#### Returns

Type: `Promise<HTMLVmMenuItemElement>`

## Slots

| Slot | Description                                                                                           |
| ---- | ----------------------------------------------------------------------------------------------------- |
|      | Used to pass in the body of the menu which usually contains menu items, radio groups and/or submenus. |

## CSS Custom Properties

| Name                    | Description                                            |
| ----------------------- | ------------------------------------------------------ |
| `--vm-menu-bg`          | The background color the menu.                         |
| `--vm-menu-color`       | The text color within the menu.                        |
| `--vm-menu-font-size`   | The font size of text within the menu.                 |
| `--vm-menu-font-weight` | The font weight of text within the menu.               |
| `--vm-menu-z-index`     | The position in the UI z-axis stack inside the player. |

## Dependencies

### Used by

- [vm-settings](settings.md)
- [vm-submenu](submenu.md)

### Graph

```mermaid
graph TD;
  vm-settings --> vm-menu
  vm-submenu --> vm-menu
  style vm-menu fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
