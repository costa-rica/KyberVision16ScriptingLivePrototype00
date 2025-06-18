import { StyleSheet, View, Image } from "react-native";
import ButtonKvImage from "./buttons/ButtonKvImage";
import BackArrow from "../../assets/images/navigationAndSmall/btnTemplateViewBackArrow.svg";
import { useNavigation } from "@react-navigation/native";

export default function TemplateView({ children, navigation }) {
  const handleBackPress = async () => {
    // await ScreenOrientation.lockAsync(
    //   ScreenOrientation.OrientationLock.PORTRAIT_UP
    // ); // Force back to portrait
    // setOrientation("portrait");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Image
          source={require("../../assets/images/imgBackgroundBottomFade.png")}
        />

        {navigation && (
          <View style={styles.btnBack}>
            <ButtonKvImage
              onPress={() => {
                handleBackPress();
              }}
            >
              <BackArrow style={styles.svgBackArrow} />
            </ButtonKvImage>
          </View>
        )}
        <Image
          source={require("../../assets/images/KyberV2Shiny.png")}
          style={styles.imgLogo}
        />
      </View>
      <View style={styles.containerBottom}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTop: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "gray",
    // borderWidth: 1,
    // borderStyle: "dashed",
    height: "35%",
    overflow: "hidden",
  },
  btnBack: {
    position: "absolute",
    top: 50,
    left: 20,
    // zIndex: 10,
  },
  // svgBackArrow: {
  //   width: 50,
  //   height: 50,
  // },

  imgLogo: {
    position: "absolute",
    bottom: 0,
  },
  containerBottom: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
