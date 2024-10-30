import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import { Buffer } from "buffer";

const setAudio = async () => {
  await Audio.requestPermissionsAsync();
  await Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
  });
};

const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
const GOOGLE_URL = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`;

export const playAudio = async (text: string, languageCode: string) => {
  try {
    await setAudio();

    const response = await axios.post(GOOGLE_URL, {
      input: {
        text: text,
      },
      voice: {
        languageCode: languageCode,
        ssmlGender: "FEMALE",
      },
      audioConfig: {
        audioEncoding: "MP3",
      },
    });

    const audioContent = response.data.audioContent as string;

    const audioBuffer = Buffer.from(audioContent, "base64");

    const filePath = FileSystem.documentDirectory + "tts-output.mp3";

    await FileSystem.writeAsStringAsync(
      filePath,
      audioBuffer.toString("base64"),
      {
        encoding: FileSystem.EncodingType.Base64,
      }
    );

    const { sound } = await Audio.Sound.createAsync({ uri: filePath });

    await sound.playAsync();
  } catch (error) {
    console.log("Error in TTS: " + error);
  }
};

export const SpeechToText = async (audioUri: string) => {
  const audioFile = await FileSystem.readAsStringAsync(audioUri, { encoding: FileSystem.EncodingType.Base64 });

  // Configuration for the Google Speech-to-Text API
  const response = await axios.post(
      `https://speech.googleapis.com/v1/speech:recognize?key=${API_KEY}`,
      {
          audio: {
              content: audioFile,
          },
          config: {
              encoding: 'LINEAR16',
              sampleRateHertz: 16000,
              languageCode: 'en-US',
          },
      }
  );

  // Handle the response
  const transcript = response.data.results
    .map((result: any) => result.alternatives[0].transcript)
    .join('\n');

  console.log(transcript);
  return transcript;
};
