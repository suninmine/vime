---
title: vm-youtube
sidebar_label: Youtube
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

Enables loading, playing and controlling videos from [YouTube](https://www.youtube.com).

> You don't interact with this component for passing player properties, controlling playback, listening to player events and so on, that is all done through the `vime-player` component.

## Quirks

- When the player is `paused`, `seeking` and `seeked` are fired at the same time (in order), because
  there are no updates between the events from the embed.

- Changing the `controls` prop forces the player to reload.

- You cannot change `playbackQuality` programmatically, YouTube automatically determines the best
  quality to play.

- Fullscreen changes that come from clicking the YouTube fullscreen control are not tracked on iOS,
  because the embed doesn't provide an API for it.

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

```html {2}
<vm-player controls>
  <vm-youtube video-id="DyTCOwB0DVw"></vm-youtube>
  <!-- ... -->
</vm-player>
```

</TabItem>


<TabItem value="react">

```tsx {2,7}
import React from 'react';
import { Player, Youtube } from '@vime/react';

function Example() {
  return (
    <Player controls>
      <Youtube videoId="DyTCOwB0DVw" />
      {/* ... */}
    </Player>
  );
}
```

</TabItem>


<TabItem value="vue">

```html {3,9,14} title="example.vue"
<template>
  <Player controls>
    <Youtube videoId="DyTCOwB0DVw" />
    <!-- ... -->
  </Player>
</template>

<script>
  import { Player, Youtube } from '@vime/vue';

  export default {
    components: {
      Player,
      Youtube,
    },
  };
</script>
```

</TabItem>


<TabItem value="svelte">

```html {2,7} title="example.svelte"
<Player controls>
  <Youtube videoId="DyTCOwB0DVw" />
  <!-- ... -->
</Player>

<script lang="ts">
  import { Player, Youtube } from '@vime/svelte';
</script>
```

</TabItem>


<TabItem value="stencil">

```tsx {5}
class Example {
  render() {
    return (
      <vm-player controls>
        <vm-youtube videoId="DyTCOwB0DVw" />
        {/* ... */}
      </vm-player>
    );
  }
}
```

</TabItem>


<TabItem value="angular">

```html {2} title="example.html"
<vm-player controls>
  <vm-youtube cookies="true" video-id="DyTCOwB0DVw"></vm-youtube>
  <!-- ... -->
</vm-player>
```

</TabItem>
    
</Tabs>


## Properties

| Property                | Attribute                 | Description                                                           | Type                 | Default     |
| ----------------------- | ------------------------- | --------------------------------------------------------------------- | -------------------- | ----------- |
| `cookies`               | `cookies`                 | Whether cookies should be enabled on the embed.                       | `boolean`            | `false`     |
| `poster`                | `poster`                  | The absolute URL of a custom poster to be used for the current video. | `string ∣ undefined` | `undefined` |
| `showFullscreenControl` | `show-fullscreen-control` | Whether the fullscreen control should be shown.                       | `boolean`            | `true`      |
| `videoId` _(required)_  | `video-id`                | The YouTube resource ID of the video to load.                         | `string`             | `undefined` |

## Dependencies

### Used by

- [vm-playground](../core/playground.md)

### Depends on

- [vm-embed](../core/embed.md)

### Graph

```mermaid
graph TD;
  vm-youtube --> vm-embed
  vm-playground --> vm-youtube
  style vm-youtube fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
