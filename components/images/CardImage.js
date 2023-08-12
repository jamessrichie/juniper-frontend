import React from "react";
import { Image, StyleSheet, View } from "react-native";

import colors from "../../config/colors";

function CardImage({ height, shadow, source, style, width }) {
  const styles = StyleSheet.create({
    shadow: {
      shadowColor: colors.black,
      shadowOffset: {
        height: 5,
        width: 0,
      },
      shadowOpacity: 0.1,
      shadowRadius: 5,
    },
    image: {
      borderRadius: 10,
      height,
      width,
    },
  });

  return (
    <View style={shadow && styles.shadow}>
      <Image source={source} style={[styles.image, style]} />
    </View>
  );
}

export default CardImage;
