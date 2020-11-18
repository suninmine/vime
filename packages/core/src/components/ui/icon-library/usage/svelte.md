```svelte {5,8,13} title="example.svelte"
<Player icons="boxicons">
  <!-- ... -->
  <Ui>
    <!-- Register a predefined icon library (vime, material, remix, boxicons). -->
    <IconLibrary name="boxicons" />

    <!-- Register a custom icon library. -->
    <IconLibrary name="my-library" resolver={(iconName) => `/icons/${iconName}.svg`}  />
  </Ui>
</Player>

<script lang="ts">
  import { Player, Ui, IconLibrary } from '@vime/svelte';
</script>
```
