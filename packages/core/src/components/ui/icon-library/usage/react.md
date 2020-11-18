```tsx {2,10,13}
import React from "react";
import { Player, Ui, IconLibrary } from "@vime/react";

function Example() {
  return (
    <Player icons="boxicons">
      {/* ... */}
      <Ui>
        {/* Register a predefined icon library (vime, material, remix, boxicons). */}
        <IconLibrary name="boxicons" />
    
        {/* Register a custom icon library. */}
        <IconLibrary name="my-library" resolver={(iconName) => `/icons/${iconName}.svg`}  />
      </Ui>
    </Player>
  );
}
```
