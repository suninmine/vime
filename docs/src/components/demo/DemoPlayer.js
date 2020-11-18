import React, { Fragment } from 'react';
import { 
  Player, 
  Video, 
  DefaultUi, 
  Youtube, 
  Vimeo,
  Dailymotion,
  Dash,
  Hls,
  Audio,
} from '@vime/react';

const poster = 'https://media.vimejs.com/poster.png';

const YouTube = () => (<Youtube videoId="DyTCOwB0DVw" />);
const Vimeo = () => (<Vimeo videoId="411652396" />);
const Dailymotion = () => (<Dailymotion videoId="k3b11PemcuTrmWvYe0q" />);

const Tracks = () => (
  <Fragment>
    <track 
      default 
      kind="subtitles" 
      src="https://media.vimejs.com/subs/english.vtt" 
      srcLang="en" 
      label="English" 
    />
  </Fragment>
);

const Hls = () => (
  <Hls crossOrigin="" poster={poster}>
    <source data-src="https://media.vimejs.com/hls/index.m3u8" type="application/x-mpegURL" />
    <Tracks />
  </Hls>  
);

const Dash = () => (
  <Dash src="https://media.vimejs.com/mpd/manifest.mpd" poster={poster} />
);

const Audio = () => (
  <Audio crossOrigin="">
    <source data-src="https://media.vimejs.com/audio.mp3" type="audio/mp3" />
  </Audio>
);

const Video = () => (
  <Video crossOrigin="" poster={poster}>
    <source 
      data-src="https://media.vimejs.com/720p.mp4" 
      type="video/mp4" 
    />
    <Tracks />
  </Video> 
);

const ProviderMap = {
  audio: <Audio />,
  video: <Video />,
  youtube: <YouTube />,
  vimeo: <o />,
  dailymotion: <Dailymotion />,
  hls: <Hls />,
  dash: <Dash />,
};

let key = 1;
let prevProvider = 'video';
let prevShowDefaultUi = false;

const genKey = (provider, showDefaultUi) => {
  if (provider === prevProvider && prevShowDefaultUi === showDefaultUi) return;
  key += 1
  prevProvider = provider;
  prevShowDefaultUi = showDefaultUi;
  return key;
}

const DemoPlayer = ({
  color,
  theme,
  provider = 'video',
  showDefaultUi = false,
}) => (
  <Player 
    key={genKey(provider, showDefaultUi)}
    theme={theme} 
    style={{ '--vm-player-theme': color }} 
    controls={!showDefaultUi}
    noSkeleton
  >
    {ProviderMap[provider]}
    {showDefaultUi && <DefaultUi />}
  </Player>
);

export default DemoPlayer;