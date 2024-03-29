import React from 'react';

import NextImage from 'next/image';
import twemoji from 'twemoji';


const U200D = String.fromCharCode(0x200d);
const UFE0Fg = /\uFE0F/g;

type Props = {
  emoji: string,
  ext?: 'svg' | 'png',
};

export const Twemoji = React.memo(({
  emoji,
  ext = 'svg',
}: Props) => {
  const HEXCodePoint = twemoji.convert.toCodePoint(
    emoji.indexOf(U200D) < 0 ? emoji.replace(UFE0Fg, '') : emoji,
  );

  return (
    <NextImage
      src={`https://twemoji.maxcdn.com/v/latest/${ext === 'png' ? '72x72' : 'svg'}/${HEXCodePoint}.${ext}`}
      fill
      alt={emoji}
      draggable={false}
    />
  );
});

Twemoji.displayName = 'Twemoji';
