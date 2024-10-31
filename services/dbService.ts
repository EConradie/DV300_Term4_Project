import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";
import { Translation } from "../components/models";

// Save a translation for a specific user
export const saveTranslation = async (userId: string, translation: Translation) => {
    try {
      const userTranslationsRef = collection(db, "users", userId, "translations");
  
      await addDoc(userTranslationsRef, {
        ...translation,
        date: new Date().toISOString(),
      });
      console.log("Translation saved successfully");
    } catch (error) {
      console.error("Error saving translation:", error);
      throw error;
    }
  };
  
  // Retrieve all translations for a specific user
  export const getTranslationsByUser = async (userId: string) => {
    try {
      const userTranslationsRef = collection(db, "users", userId, "translations");
      const querySnapshot = await getDocs(userTranslationsRef);
  
      const translations: Translation[] = [];
  
      querySnapshot.forEach((doc) => {
        const translation = doc.data() as Translation;
        translation.id = doc.id;
        translations.push(translation);
      });
  
      return translations;
    } catch (error) {
      console.error("Error retrieving translations:", error);
      throw error;
    }
  };

