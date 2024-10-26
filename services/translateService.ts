import axios from 'axios';

const API_KEY = 'AIzaSyDNmkPdi1qslqfoXJy6rhJ0i2FinN6957U';

const GOOGLE_TRANSLATE_URL = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

export const translateText = async (text: string, sourceLang: string, targetLang: string): Promise<string> => {
  try {
    const response = await axios.post(GOOGLE_TRANSLATE_URL, {
      q: text,
      source: sourceLang,
      target: targetLang,
      format: 'text',
    });
    const translatedText = response.data.data.translations[0].translatedText;
    return translatedText;
  } catch (error) {
    console.error('Error during translation:', error);
    throw new Error('Translation failed. Please try again.');
  }
};
