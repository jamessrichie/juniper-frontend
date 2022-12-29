import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

import SmallAppText from "../appTexts/SmallAppText";

function TinyHyperlink({
  linkColor,
  linkText,
  onPress,
  preLinkText,
  postLinkText,
  style,
  textColor,
}) {
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      flexDirection: "row",
    },
    text: {
      color: textColor,
    },
    hyperlink: {
      color: linkColor,
    },
  });

  return (
    <View style={[styles.container, style]}>
      {preLinkText && (
        <SmallAppText style={styles.text}>{preLinkText} </SmallAppText>
      )}
      <TouchableWithoutFeedback onPress={onPress}>
        <View>
          <SmallAppText style={styles.hyperlink}>{linkText}</SmallAppText>
        </View>
      </TouchableWithoutFeedback>
      {postLinkText && (
        <SmallAppText style={styles.text}> {postLinkText}</SmallAppText>
      )}
    </View>
  );
}

export default TinyHyperlink;
