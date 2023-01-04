import React from "react";
import { Image, StyleSheet } from "react-native";

function CircularImage({ size, source, style }) {
  const styles = StyleSheet.create({
    container: {
      borderRadius: 1000,
      height: size,
      width: size,
    },
  });

  return <Image source={source} style={[styles.container, style]} />;
}

export default CircularImage;
