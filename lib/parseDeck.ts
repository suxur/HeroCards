import { filter, forEach, keys, map, mapValues, range, groupBy, sortBy, sum, uniqBy } from 'lodash';

import {
  CardId,
  CardSplitType,
  Deck,
  FactionCounts,
  ResourceCounts,
  ParsedDeck,
  Slots,
  SplitCards,
} from '../actions/types';
import {
  PLAYER_FACTION_CODES,
  RESOURCES,
  FactionCodeType,
  ResourceCodeType,
} from '../constants';
import Card, { CardKey, CardsMap } from '../data/Card';

function filterBy(
  cardIds: CardId[],
  cards: CardsMap,
  field: CardKey,
  value: any
): CardId[] {
  return cardIds.filter(c => cards[c.id] && cards[c.id][field] === value);
}

export function isSpecialCard(card: Card): boolean {
  return !!(
    card && (
      card.subtype_code === 'weakness' ||
      card.subtype_code === 'basicweakness' ||
      card.spoiler ||
      card.restrictions
    )
  );
}

function splitCards(cardIds: CardId[], cards: CardsMap): SplitCards {
  const result: SplitCards = {};

  const otherTypes: CardSplitType[] = ['Ally', 'Event', 'Resource', 'Support', 'Upgrade'];
  otherTypes.forEach(type_code => {
    const typeCards = filterBy(cardIds, cards, 'type_code', type_code.toLowerCase());
    if (typeCards.length > 0) {
      result[type_code] = typeCards;
    }
  });
  return result;
}

function factionCount(
  cardIds: CardId[],
  cards: CardsMap,
  faction: FactionCodeType
): [number, number] {
  const nonPermanentCards = cardIds.filter(c => (
    cards[c.id] &&
    !cards[c.id].double_sided
  ));
  return [
    sum(nonPermanentCards.filter(c => (
      cards[c.id].faction2_code !== null &&
      (cards[c.id].faction_code === faction ||
      cards[c.id].faction2_code === faction)
    )).map(c => c.quantity)),
    sum(nonPermanentCards.filter(c => (
      cards[c.id].faction2_code === null &&
      cards[c.id].faction_code === faction
    )).map(c => c.quantity)),
  ];
}

function costHistogram(cardIds: CardId[], cards: CardsMap): number[] {
  const costHisto = mapValues(
    groupBy(
      cardIds.filter(c => {
        const card = cards[c.id];
        return card &&
          !card.double_sided && (
          card.type_code === 'ally' ||
          card.type_code === 'event' ||
          card.type_code === 'support' ||
          card.type_code === 'upgrade');
      }),
      c => {
        const card = cards[c.id];
        if (!card) {
          return 0;
        }
        if (card.cost === null) {
          return -2;
        }
        return card.cost;
      }),
    cs => sum(cs.map(c => c.quantity))
  );
  return range(-2, 11).map(cost => costHisto[cost] || 0);
}

function sumResourceIcons(
  cardIds: CardId[],
  cards: CardsMap,
  resource: ResourceCodeType
): number {
  return sum(cardIds.map(c =>
    (cards[c.id] ? cards[c.id].resourceCount(resource) : 0) * c.quantity));
}

export function parseDeck(
  deck: Deck | null,
  slots: Slots,
  ignoreDeckLimitSlots: Slots,
  cards: CardsMap
): ParsedDeck {
  if (!deck) {
    // @ts-ignore
    return {};
  }
  const cardIds = map(
    sortBy(
      filter(keys(slots), id => {
        const card = cards[id];
        if (!card) {
          return false;
        }
        if (card.type_code === 'hero' || card.type_code === 'alter_ego') {
          return false;
        }
        return true;
      }),
      id => cards[id].name
    ),
    id => {
      return {
        id,
        quantity: slots[id],
      };
    });
  const specialCards = cardIds.filter(c =>
    (isSpecialCard(cards[c.id]) && slots[c.id] > 0) || ignoreDeckLimitSlots[c.id] > 0);
  const normalCards = cardIds.filter(c =>
    !isSpecialCard(cards[c.id]) && slots[c.id] > (ignoreDeckLimitSlots[c.id] || 0));

  const factionCounts: FactionCounts = {};
  forEach(PLAYER_FACTION_CODES, faction => {
    factionCounts[faction] = factionCount(cardIds, cards, faction);
  });
  const resourceCounts: ResourceCounts = {};
  forEach(RESOURCES, resource => {
    resourceCounts[resource] = sumResourceIcons(cardIds, cards, resource);
  });
  return {
    investigator: cards[deck.investigator_code],
    deck: deck,
    slots: slots,
    normalCardCount: sum(normalCards.map(c =>
      c.quantity - (ignoreDeckLimitSlots[c.id] || 0))),
    totalCardCount: sum(cardIds.map(c => c.quantity)),
    packs: uniqBy(cardIds, c => cards[c.id].pack_code).length,
    factionCounts: factionCounts,
    costHistogram: costHistogram(cardIds, cards),
    resourceCounts,
    normalCards: splitCards(normalCards, cards),
    specialCards: splitCards(specialCards, cards),
    ignoreDeckLimitSlots,
  };
}
