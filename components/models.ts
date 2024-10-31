export interface User {
  uid?: string;
  username?: string;
  email: string;
  password: string;
}

export interface Translation {
  id?: string;
  sourceLanguage: string;
  targetLanguage: string;
  sourceText: string;
  targetText: string;
  context: string;
  date: string;
}

export type RouteParams = {
  Translate: undefined;
  SavedTranslation: undefined;
  DetailedTranslation: { translation: Translation }; // Add your actual Translation type here
};
