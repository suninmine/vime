```html {5,8,15} title="example.html"
<vm-player icons="boxicons">
  <!-- ... -->
  <vm-ui>
    <!-- Register a predefined icon library (vime, material, remix, boxicons). -->
    <vm-icon-library name="boxicons"></vm-icon-library>

    <!-- Register a custom icon library. -->
    <vm-icon-library name="my-library" [resolver]="customResolver"></vm-icon-library>
  </vm-ui>
</vm-player>
```

```ts title="example.ts"
class Example {
  customResolver = (iconName: string) => `/icons/${iconName}.svg`;
}
```
