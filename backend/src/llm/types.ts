// types.ts
export interface SearchItem {
  content: string;
}

export interface RankedItem<T> {
  item: T;
  index: number;
  score: number;
  firstPos: number;
}

export interface DocWithMetadata {
  content: string;
  source: string;
  fromLine?: number;
  toLine?: number;
}

export interface DocWithMetadataAndId {
  id: string;
  content: string;
  source: string;
  fromLine?: number;
  toLine?: number;
  distance?: number; // similarity score
}

export type AppConfig = {
  chatProvider: string;
  embeddingsProvider: string;
};

export type ChatConfig = {
  provider: string;
  model: string;
  temperature: number;
  baseUrl: string;
  apiKey: string | undefined;
  chunkSize: number;
};

export type EmbeddingsConfig = {
  provider: string;
  model: string;
  baseUrl: string;
  apiKey: string | undefined;
};
