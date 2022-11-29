import React from "react";
import { Image, SafeAreaView, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  image: {
    height: 33,
    marginVertical: 13,
    resizeMode: "contain",
    width: undefined,
  },
});

function NavigationHeader({ image }) {
  return (
    <SafeAreaView>
      <Image source={image} style={styles.image} />
    </SafeAreaView>
  );
}

export default NavigationHeader;
