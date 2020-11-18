```html {5,8,14-15}
<vm-player icons="material">
  <!-- ... -->
  <vm-ui>
    <!-- Register a predefined icon library (vime, material, remix, boxicons). -->
    <vm-icon-library name="material"></vm-icon-library>
    
    <!-- Register a custom icon library. -->
    <vm-icon-library name="my-library"></vm-icon-library>
  </vm-ui>
</vm-player>
```

<script>
  const library = document.querySelector('vm-icon-library[name="my-library"]');
  library.resolver = (iconName) => `/icons/${iconName}.svg`;
</script>
