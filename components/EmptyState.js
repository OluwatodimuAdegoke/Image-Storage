import { View, Text } from "react-native";
import React from "react";
import SvgComponent from "../assets/svg";
const EmptyState = () => {
  return (
    <View className="flex-1 items-center justify-center align-middle ">
      <SvgComponent />
      <Text className="text-gray-400 text-xl">No photo uploaded yet</Text>
    </View>
  );
};

export default EmptyState;
