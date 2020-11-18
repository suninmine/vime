```html {6,9,15,20,26} title="example.vue"
<template>
  <Player icons="boxicons">
    <!-- ... -->
    <Ui>
      <!-- Register a predefined icon library (vime, material, remix, boxicons). -->
      <IconLibrary name="boxicons" />
    
      <!-- Register a custom icon library. -->
      <IconLibrary name="boxicons" :resolver="customResolver" />
    </Ui>
  </Player>
</template>

<script>
  import { Player, Ui, IconLibrary } from "@vime/vue";

  export default {
    data() {
      return {
        customResolver: (iconName) => `/icons/${iconName}.svg`,
      };
    },
    components: {
      Player,
      Ui,
      IconLibrary,
    },
  };
</script>
```
