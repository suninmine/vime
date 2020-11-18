---
title: vm-current-time
sidebar_label: CurrentTime
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

Formats and displays the current time of playback.

## Visual

<img
  src="https://raw.githubusercontent.com/vime-js/vime/master/packages/core/src/components/ui/time/current-time/current-time.png"
  alt="Vime current time component"
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

```html
<vm-current-time />
```

</TabItem>


<TabItem value="react">

```tsx {2,5}
import React from 'react';
import { CurrentTime } from '@vime/react';

function Example() {
  return <CurrentTime />;
}
```

</TabItem>


<TabItem value="vue">

```html {2,6,10} title="example.vue"
<template>
  <CurrentTime />
</template>

<script>
  import { CurrentTime } from '@vime/vue';

  export default {
    components: {
      CurrentTime,
    },
  };
</script>
```

</TabItem>


<TabItem value="svelte">

```html {1,4} title="example.svelte"
<CurrentTime />

<script lang="ts">
  import { CurrentTime } from '@vime/svelte';
</script>
```

</TabItem>


<TabItem value="stencil">

```tsx {3}
class Example {
  render() {
    return <vm-current-time />;
  }
}
```

</TabItem>


<TabItem value="angular">

```html title="example.html"
<vm-current-time />
```

</TabItem>
    
</Tabs>


## Properties

| Property          | Attribute           | Description                                                                                                           | Type      | Default |
| ----------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `alwaysShowHours` | `always-show-hours` | Whether the time should always show the hours unit, even if the time is less than 1 hour (eg: `20:35` -> `00:20:35`). | `boolean` | `false` |

## Dependencies

### Used by

- [vm-default-controls](../controls/default-controls.md)
- [vm-time-progress](time-progress.md)

### Depends on

- [vm-time](time.md)

### Graph

```mermaid
graph TD;
  vm-current-time --> vm-time
  vm-default-controls --> vm-current-time
  vm-time-progress --> vm-current-time
  style vm-current-time fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
