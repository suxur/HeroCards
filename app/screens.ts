import { Navigation } from 'react-native-navigation';

import SearchMultiSelectView from '../components/SearchMultiSelectView';
import DeckDetailView from '../components/DeckDetailView';
import DeckEditView from '../components/DeckEditView';
import CardSearchView from '../components/CardSearchView';
import MythosButton from '../components/CardSearchComponent/MythosButton';
import TuneButton from '../components/CardSearchComponent/TuneButton';
import SortButton from '../components/CardSearchComponent/SortButton';
import CardDetailView from '../components/CardDetailView';
import CardDetailSwipeView from '../components/CardDetailSwipeView';
import CardFaqView from '../components/CardFaqView';
import CardImageView from '../components/CardImageView';
import InvestigatorCardsView from '../components/InvestigatorCardsView';
import MyDecksView from '../components/MyDecksView';
import NewDeckView from '../components/NewDeckView';
import DrawSimulatorView from '../components/DrawSimulatorView';
import DeckChartsView from '../components/DeckChartsView';
import CardFilterView from '../components/filter/CardFilterView';
import CardMinionFilterView from '../components/filter/CardMinionFilterView';
import PackFilterView from '../components/filter/PackFilterView';
import WebViewWrapper from '../components/WebViewWrapper';
import SettingsView from '../components/settings/SettingsView';
import DiagnosticsView from '../components/settings/DiagnosticsView';
import PackCardsView from '../components/PackCardsView';
import SpoilersView from '../components/SpoilersView';
import CollectionEditView from '../components/CollectionEditView';
import CardSortDialog from '../components/CardSortDialog';
import InvestigatorSortDialog from '../components/InvestigatorSortDialog';
import ScenarioDialog from '../components/ScenarioDialog';
import AboutView from '../components/AboutView';

// register all screens of the app (including internal ones)
export function registerScreens(Provider: any, store: any) {
  Navigation.registerComponentWithRedux('About', () => AboutView, Provider, store);
  Navigation.registerComponentWithRedux('Browse.Cards', () => CardSearchView, Provider, store);
  Navigation.registerComponentWithRedux('Browse.InvestigatorCards', () => InvestigatorCardsView, Provider, store);
  Navigation.registerComponentWithRedux('Deck', () => DeckDetailView, Provider, store);
  Navigation.registerComponentWithRedux('Deck.Charts', () => DeckChartsView, Provider, store);
  Navigation.registerComponentWithRedux('Deck.DrawSimulator', () => DrawSimulatorView, Provider, store);
  Navigation.registerComponentWithRedux('Deck.Edit', () => DeckEditView, Provider, store);
  Navigation.registerComponentWithRedux('Deck.New', () => NewDeckView, Provider, store);
  Navigation.registerComponentWithRedux('Card', () => CardDetailView, Provider, store);
  Navigation.registerComponentWithRedux('Card.Swipe', () => CardDetailSwipeView, Provider, store);
  Navigation.registerComponentWithRedux('Card.Faq', () => CardFaqView, Provider, store);
  Navigation.registerComponentWithRedux('Card.Image', () => CardImageView, Provider, store);
  Navigation.registerComponentWithRedux('My.Decks', () => MyDecksView, Provider, store);
  Navigation.registerComponentWithRedux('Settings', () => SettingsView, Provider, store);
  Navigation.registerComponentWithRedux('Settings.Diagnostics', () => DiagnosticsView, Provider, store);
  Navigation.registerComponentWithRedux('SearchFilters', () => CardFilterView, Provider, store);
  Navigation.registerComponentWithRedux('SearchFilters.Enemy', () => CardMinionFilterView, Provider, store);
  Navigation.registerComponentWithRedux('SearchFilters.Packs', () => PackFilterView, Provider, store);
  Navigation.registerComponentWithRedux('SearchFilters.Chooser', () => SearchMultiSelectView, Provider, store);
  Navigation.registerComponentWithRedux('My.Collection', () => CollectionEditView, Provider, store);
  Navigation.registerComponentWithRedux('Pack', () => PackCardsView, Provider, store);
  Navigation.registerComponentWithRedux('My.Spoilers', () => SpoilersView, Provider, store);
  Navigation.registerComponentWithRedux('WebView', () => WebViewWrapper, Provider, store);
  Navigation.registerComponentWithRedux('Dialog.Sort', () => CardSortDialog, Provider, store);
  Navigation.registerComponentWithRedux('Dialog.InvestigatorSort', () => InvestigatorSortDialog, Provider, store);
  Navigation.registerComponentWithRedux('Dialog.Scenario', () => ScenarioDialog, Provider, store);
  Navigation.registerComponentWithRedux('SortButton', () => SortButton, Provider, store);
  Navigation.registerComponentWithRedux('TuneButton', () => TuneButton, Provider, store);
  Navigation.registerComponentWithRedux('MythosButton', () => MythosButton, Provider, store);
}
