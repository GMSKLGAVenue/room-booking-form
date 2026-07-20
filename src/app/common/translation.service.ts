import { Injectable } from '@angular/core';
import en from './i18n/en.json';

type TranslationValue = string | TranslationDictionary;

interface TranslationDictionary {
  [key: string]: TranslationValue;
}

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly dictionary: TranslationDictionary = en;

  t(key: string): string {
    const value = key.split('.').reduce<TranslationValue | undefined>((current, segment) => {
      if (current && typeof current === 'object' && segment in current) {
        return current[segment];
      }

      return undefined;
    }, this.dictionary);

    return typeof value === 'string' ? value : key;
  }
}