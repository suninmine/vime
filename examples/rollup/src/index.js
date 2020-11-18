// Default theme. ~960B
import '@vime/core/themes/default.css';

// Optional light theme (extends default). ~400B
import '@vime/core/themes/light.css';

import { Player, Video, File } from '@vime/core';

customElements.define('vm-player', Player);
customElements.define('vm-video', Video);
customElements.define('vm-file', File);
