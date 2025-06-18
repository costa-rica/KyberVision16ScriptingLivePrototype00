import { StyleSheet, Text, View, Dimensions } from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
} from "react-native-gesture-handler";
export default function ScriptingLiveLandscape(props) {
  const stylesContainer = {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  };

  return (
    <View>
      <GestureHandlerRootView style={stylesContainer}>
        <GestureDetector gesture={props.combinedGestures}>
          <View style={stylesContainer}>
            <Text>Scripting - Live - Landscape</Text>
            <Text>{props.orientation}</Text>
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
}
const styles = StyleSheet.create({});
