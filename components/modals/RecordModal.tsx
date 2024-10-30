import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { colors } from "../styles";
import { SpeechToText } from "../../services/ttsService";



type RecordModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onTranscriptionComplete: (transcript: string) => void;
  languageCode: string;
};

export const RecordModal = ({
  isVisible,
  onClose,
  onTranscriptionComplete,
  languageCode,
}: RecordModalProps) => {
  const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [isRecordingActive, setIsRecordingActive] = useState(false);
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  useEffect(() => {
    if (isVisible) {
      startRecording();
    } else if (isRecordingActive) {
      stopRecording();
    }
  }, [isVisible]);

  async function startRecording() {
    try {
      if (permissionResponse && permissionResponse.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync({
        isMeteringEnabled: true,
        android: {
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY.android,
          extension: '.wav',
          sampleRate: 44100,
          outputFormat: Audio.AndroidOutputFormat.DEFAULT,
          audioEncoder: Audio.AndroidAudioEncoder.DEFAULT,
        },
        ios: {
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY.ios,
          extension: '.wav',
          sampleRate: 44100,
          outputFormat: Audio.IOSOutputFormat.LINEARPCM,
        },
        web: {
          mimeType: 'audio/wav',
          bitsPerSecond: 128000,
        },
      });
      setRecording(recording);
      setIsRecordingActive(true);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    if (recording && isRecordingActive) {
      try {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log("Recording stopped and stored at", uri);

        if (uri) {
          const transcript = await SpeechToText(uri, languageCode);
          console.log(transcript);
          onTranscriptionComplete(transcript);
        }
        
      } catch (err) {
        console.error("Failed to stop recording", err);
      }
      setIsRecordingActive(false);
      setRecording(undefined);
      onClose();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
    }
  }

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.text}>Recording</Text>

              <TouchableOpacity onPress={stopRecording} style={styles.button}>
                <Ionicons name="stop" size={50} color={colors.red} />
              </TouchableOpacity>

              <View style={styles.micContainer}>
                <Ionicons name="mic" size={26} color={colors.white} />
                <Text style={styles.mictext}>Iphone Microphone</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    height: "30%",
    backgroundColor: colors.darkGray,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderColor: colors.tintGray,
    borderWidth: 5,
    borderRadius: 100,
    padding: 10,
    marginTop: 20,
  },
  text: {
    color: colors.white,
    fontSize: 20,
  },
  mictext: {
    color: colors.white,
    fontSize: 12,
  },
  micContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
    gap: 5,
  },
});
