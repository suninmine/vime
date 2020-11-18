---
title: vm-submenu
sidebar_label: Submenu
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

A menu that is to be nested inside another menu. A submenu is closed by default and it provides a
menu item that will open/close it. It's main purpose is to organize a menu by grouping related
sections/options together that can be navigated to by the user.

## Visual

<img
  src="https://raw.githubusercontent.com/vime-js/vime/master/packages/core/src/components/ui/settings/submenu/submenu.png"
  alt="Vime submenu component"
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

```html {6-8}
<vm-player>
  <!-- ... -->
  <vm-ui>
    <!-- ... -->
    <vm-settings>
      <vm-submenu label="Title">
        <!-- ... -->
      </vm-submenu>
    </vm-settings>
  </vm-ui>
</vm-player>
```

</TabItem>


<TabItem value="react">

```tsx {2,11}
import React from 'react';
import { Player, Ui, Settings, Submenu } from '@vime/react';

function Example() {
  return (
    <Player>
      {/* ... */}
      <Ui>
        {/* ... */}
        <Settings>
          <Submenu label="Title">{/* ... */}</Submenu>
        </Settings>
      </Ui>
    </Player>
  );
}
```

</TabItem>


<TabItem value="vue">

```html {7-9,16,23} title="example.vue"
<template>
  <Player>
    <!-- ... -->
    <Ui>
      <!-- ... -->
      <Settings>
        <Submenu label="Title">
          <!-- ... -->
        </Submenu>
      </Settings>
    </Ui>
  </Player>
</template>

<script>
  import { Player, Ui, Settings, Submenu } from '@vime/vue';

  export default {
    components: {
      Player,
      Ui,
      Settings,
      Submenu,
    },
  };
</script>
```

</TabItem>


<TabItem value="svelte">

```html {6-8,18} title="example.svelte"
<Player>
  <!-- ... -->
  <Ui>
    <!-- ... -->
    <Settings>
      <Submenu label="Title">
        <!-- ... -->
      </Submenu>
    </Settings>
  </Ui>
</Player>

<script lang="ts">
  import { Player, Ui, Settings, Submenu } from '@vime/svelte';
</script>
```

</TabItem>


<TabItem value="stencil">

```tsx {8-10}
class Example {
  render() {
    return (
      <vm-player>
        {/* ... */}
        <vm-ui>
          {/* ... */}
          <vm-settings>
            <vm-submenu label="Title">{/* ... */}</vm-submenu>
          </vm-settings>
        </vm-ui>
      </vm-player>
    );
  }
}
```

</TabItem>


<TabItem value="angular">

```html {6-8} title="example.html"
<vm-player>
  <!-- ... -->
  <vm-ui>
    <!-- ... -->
    <vm-settings>
      <vm-submenu label="Title">
        <!-- ... -->
      </vm-submenu>
    </vm-settings>
  </vm-ui>
</vm-player>
```

</TabItem>
    
</Tabs>


## Properties

| Property             | Attribute | Description                                                                                                                                                                     | Type                 | Default     |
| -------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `active`             | `active`  | Whether the submenu is open/closed.                                                                                                                                             | `boolean`            | `false`     |
| `hidden`             | `hidden`  | Whether the submenu should be displayed or not.                                                                                                                                 | `boolean`            | `false`     |
| `hint`               | `hint`    | This can provide additional context about the current state of the submenu. For example, the hint could be the currently selected option if the submenu contains a radio group. | `string ∣ undefined` | `undefined` |
| `label` _(required)_ | `label`   | The title of the submenu.                                                                                                                                                       | `string`             | `undefined` |

## Slots

| Slot | Description                                                                                                                       |
| ---- | --------------------------------------------------------------------------------------------------------------------------------- |
|      | Used to pass in the body of the submenu which is usually a set of choices in the form of a radio group (`vime-menu-radio-group`). |

## Dependencies

### Used by

- [vm-default-settings](default-settings.md)

### Depends on

- [vm-menu-item](menu-item.md)
- [vm-menu](menu.md)

### Graph

```mermaid
graph TD;
  vm-submenu --> vm-menu-item
  vm-submenu --> vm-menu
  vm-menu-item --> vm-icon
  vm-default-settings --> vm-submenu
  style vm-submenu fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
