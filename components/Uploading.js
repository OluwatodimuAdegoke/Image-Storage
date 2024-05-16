import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import React from "react";
import ProgressBar from "./ProgressBar";
import { Video } from "expo-av";

const Uploading = ({ image, video, progress }) => {
  return (
    <View
      style={StyleSheet.absoluteFill}
      className="items-center justify-center z-10"
    >
      <View style={StyleSheet.absoluteFill}></View>
      <View className="w-3/4  bg-blue-100 items-center justify-center px-2 rounded-xl">
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain",
              borderRadius: 6,
            }}
          />
        )}
        {video && (
          <Video
            source={{ uri: video }}
            videoStyle={{}}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            style={{
              width: 200,
              height: 200,
            }}
          />
        )}
        <Text className="text-lg">Uploading...</Text>
        <ProgressBar progress={progress} />
        <View className="h-0.5 bg-gray-300 w-full"></View>
        <TouchableOpacity>
          <Text className="font-semibold text-blue-500 text-xl">Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Uploading;
