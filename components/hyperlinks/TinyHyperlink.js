import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";

import SmallAppText from "../appTexts/SmallAppText";

import colors from "../../config/colors";

function TinyHyperlink({
  color,
  preUrlText,
  url,
  urlText,
  postUrlText,
  style,
}) {
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      flexDirection: "row",
    },
    text: {
      color,
    },
    hyperlink: {
      color: colors.hyperlink,
    },
  });

  return (
    <View style={[styles.container, style]}>
      {preUrlText && (
        <SmallAppText style={styles.text}>{preUrlText} </SmallAppText>
      )}
      <TouchableWithoutFeedback onPress={() => Linking.openURL(url)}>
        <View>
          <SmallAppText style={styles.hyperlink}>{urlText}</SmallAppText>
        </View>
      </TouchableWithoutFeedback>
      {postUrlText && (
        <SmallAppText style={styles.text}> {postUrlText}</SmallAppText>
      )}
    </View>
  );
}

export default TinyHyperlink;
