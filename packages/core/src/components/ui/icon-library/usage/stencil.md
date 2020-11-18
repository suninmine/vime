```tsx {8,11}
class Example {
  render() {
    return (
      <vm-player icons="boxicons">
        {/* ... */}
        <vm-ui>
          {/* Register a predefined icon library (vime, material, remix, boxicons). */}
          <vm-icon-library name="boxicons" />
          
          {/* Register a custom icon library. */}
          <vm-icon-library name="my-library" resolver={(iconName) => `/icons/${iconName}.svg`} />
        </vm-ui>
      </vm-player>
    );
  }
}
```