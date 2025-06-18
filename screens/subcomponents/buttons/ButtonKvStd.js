import React, { useRef, useState } from "react";
import { Animated, Pressable, Text } from "react-native";

export default function ButtonKvStd({ onPress, style, children }) {
  const scaleValue = useRef(new Animated.Value(1)).current;

  // Define default styles
  const defaultStyles = {
    width: 140,
    height: 40,
    borderRadius: 35,
    backgroundColor: "#A3A3A3",
    fontSize: 20,
    color: "white",
    fontWeight: "",
    padding: 5,
    alignItems: "center",
  };
  // Merge provided style with default styles
  const mergedStyle = { ...defaultStyles, ...style };
  const [currentBackgroundColor, setCurrentBackgroundColor] = useState(
    mergedStyle.backgroundColor
  );
  const handlePressIn = () => {
    setCurrentBackgroundColor("gray"); // Change color on press
    Animated.spring(scaleValue, {
      toValue: 0.7,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setCurrentBackgroundColor(mergedStyle.backgroundColor); // Revert color when press is released
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();

    // Call the onPress function passed as a prop
    if (onPress) {
      onPress();
    }
  };

  const styleView = {
    backgroundColor: currentBackgroundColor,
    padding: mergedStyle.padding,
    borderRadius: mergedStyle.borderRadius,
    width: mergedStyle.width,
    height: mergedStyle.height,
    justifyContent: mergedStyle.justifyContent,
    alignItems: mergedStyle.alignItems,
    opacity: mergedStyle.opacity,
    borderColor: mergedStyle.borderColor,
    borderWidth: mergedStyle.borderWidth,
    borderStyle: mergedStyle.borderStyle,
    borderBottomWidth: mergedStyle.borderBottomWidth,
    borderBottomColor: mergedStyle.borderBottomColor,
    borderBottomStyle: mergedStyle.borderBottomStyle,
  };
  const styleText = {
    fontSize: mergedStyle.fontSize,
    color: mergedStyle.color,
    // textAlign: "center",
    fontFamily: "ApfelGrotezk",
    // backgroundColor: "green",
    // padding: mergedStyle.borderWidth * 2,
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styleView}
      >
        <Text style={styleText}>{children}</Text>
      </Pressable>
    </Animated.View>
  );
}
