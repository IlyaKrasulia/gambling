import { Level } from './interface';

export type StackParamList = {
  Start: undefined;
  WebView: undefined;
  Levels: undefined;
  Game: { level: Level };
  Rules: undefined;
}

export enum ScreenEnum {
  Start = 'Start',
  WebView = 'WebView',
  Levels = 'Levels',
  Game = 'Game',
  Rules = 'Rules',
}
