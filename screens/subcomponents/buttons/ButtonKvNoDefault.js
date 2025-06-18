import React, { useRef, useState } from "react";
import { Animated, Pressable, Text } from "react-native";

export default function ButtonKvNoDefault({
  onPress,
  styleView,
  styleText,
  pressInColor = "gray",
  children,
  active = true,
}) {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const [currentBackgroundColor, setCurrentBackgroundColor] = useState(
    styleView.backgroundColor
  );
  const handlePressIn = () => {
    if (!active) return;
    setCurrentBackgroundColor(pressInColor); // Change color on press
    Animated.spring(scaleValue, {
      toValue: 0.7,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    if (!active) return;
    setCurrentBackgroundColor(styleView.backgroundColor); // Revert color when press is released
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

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styleView}
        disabled={!active}
      >
        <Text style={styleText}>{children}</Text>
      </Pressable>
    </Animated.View>
  );
}

// export default ButtonKv;
