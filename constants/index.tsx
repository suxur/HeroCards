import React, { ReactNode } from 'react';
import { mapValues } from 'lodash';

import { DeckMeta } from '../actions/types';
import MarvelIcon from '../assets/MarvelIcon';

export type TypeCodeType =
  'hero' |
  'alter_ego' |
  'ally' |
  'event' |
  'resource' |
  'support' |
  'upgrade' |
  'obligation' |
  'villain' |
  'main_scheme' |
  'side_scheme' |
  'minion' |
  'treachery' |
  'attachment';

export type FactionCodeType =
  'hero' |
  'aggression' |
  'justice' |
  'leadership' |
  'protection' |
  'basic' |
  'encounter';

export const CORE_FACTION_CODES: FactionCodeType[] = [
  'aggression',
  'justice',
  'leadership',
  'protection',
];

export const PLAYER_FACTION_CODES: FactionCodeType[] = [
  'hero',
  ...CORE_FACTION_CODES,
  'basic',
];

export const FACTION_CODES: string[] = [
  ...CORE_FACTION_CODES,
  'basic',
  'dual',
];

export type ResourceCodeType = 'energy' |
  'physical' |
  'mental' |
  'wild';

export const BASIC_RESOURCES: ResourceCodeType[] = [
  'physical',
  'mental',
  'energy',
];

export const RESOURCES: ResourceCodeType[] = [
  ...BASIC_RESOURCES,
  'wild',
];

export const RESOURCE_COLORS: { [resource: string]: string } = {
  mental: '#003961',
  energy: '#ff8f3f',
  physical: '#661e09',
  wild: '#00543a',
};

export const FACTION_COLORS: { [faction_code: string]: string } = {
  leadership: '#2b80c5',
  aggression: '#cc3038',
  protection: '#107116',
  justice: '#e5a109',
  basic: '#808080',
  hero: '#808080',
};

export function deckColor(meta?: DeckMeta): string {
  const aspect = (meta || {}).aspect || 'basic';
  return FACTION_COLORS[aspect];
}

export const FACTION_LIGHT_GRADIENTS: { [faction_code: string]: string[] } = {
  mystic: ['#d9d6f1', '#a198dc'],
  seeker: ['#fbe6d4', '#f7cea8'],
  guardian: ['#d5e6f3', '#aacce8'],
  rogue: ['#cfe3d0', '#9fc6a2'],
  survivor: ['#f5d6d7', '#ebacaf'],
  neutral: ['#e6e6e6', '#cccccc'],
  dual: ['#f2f2cc', '#e6e699'],
};

export const FACTION_DARK_GRADIENTS: { [faction_code: string]: string[] } = {
  hero: ['#4331b9', '#2f2282'],
  mystic: ['#4331b9', '#2f2282'],
  seeker: ['#ec8426', '#bd6a1e'],
  guardian: ['#2b80c5', '#22669e'],
  rogue: ['#107116', '#0b4f0f'],
  survivor: ['#cc3038', '#a3262d'],
  neutral: ['#444444', '#222222'],
  dual: ['#c0c000', '#868600'],
};

export const FACTION_BACKGROUND_COLORS: { [faction_code: string]: string } = Object.assign(
  {},
  FACTION_COLORS,
  {
    neutral: '#444444',
    dual: '#9a9a00',
  },
);


export function createFactionIcons(
  defaultColor?: string
): { [faction in FactionCodeType | 'dual']?: (size: number) => ReactNode } {
  return mapValues(FACTION_COLORS, (color, faction) => {
    return function factionIcon(size: number) {
      return (
        <MarvelIcon
          name={(faction === 'neutral' || faction === 'dual') ? 'elder_sign' : faction}
          size={size}
          color={defaultColor || color}
        />
      );
    };
  });
}
