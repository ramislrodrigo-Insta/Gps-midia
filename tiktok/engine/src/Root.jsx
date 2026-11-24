import React from 'react';
import {Composition} from 'remotion';
import {Video, totalFrames} from './Video.jsx';
export const Root = () => (
  <Composition
    id="Tiktok"
    component={Video}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={300}
    defaultProps={{scenes: [{type: 'hook', lines: ['Teste *GPS*'], dur: 3}]}}
    calculateMetadata={({props}) => ({durationInFrames: totalFrames(props.scenes)})}
  />
);
