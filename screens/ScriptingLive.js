import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import TemplateViewWithTopChildrenSmall from "./subcomponents/TemplateViewWithTopChildrenSmall";
import ScriptingPortrait from "./subcomponents/ScriptingLivePortrait";
import ScriptingLandscape from "./subcomponents/ScriptingLiveLandscape";
import { Gesture } from "react-native-gesture-handler";
import { useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  replaceScriptSessionActionsArray,
  updatePlayersArray,
  setScriptingForPlayerObject,
  updateScriptId,
} from "../reducers/script";
import SwipePad from "./subcomponents/swipePads/SwipePad";

export default function ScriptingLive({ navigation }) {
  // const [tapIsActive, setTapIsActive] = useState(true);
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
  const [circleSize, setCircleSize] = useState({ width: 50, height: 50 });
  const topChildren = (
    <View>
      <Text style={styles.txtTopChildren}>Live Scripting </Text>
    </View>
  );
  const userReducer = useSelector((state) => state.user);
  const scriptReducer = useSelector((state) => state.script);
  const dispatch = useDispatch();
  const [setScores, setSetScores] = useState({
    teamAnalyzed: 0,
    teamOpponent: 0,
  });
  const [sessionSetsWon, setSessionSetsWon] = useState({
    teamAnalyzed: 0,
    teamOpponent: 0,
  });
  // Last Action
  const [lastActionQuality, setLastActionQuality] = useState("?");
  const [lastActionPosition, setLastActionPosition] = useState("?");
  const [lastActionPlayer, setLastActionPlayer] = useState(
    scriptReducer.playersArray.find((p) => p.selected)
  );
  const [lastActionType, setLastActionType] = useState("?");
  const [lastActionSubtype, setLastActionSubtype] = useState("?");
  // Dropdowns Visibility
  const [
    lastActionDropDownIsVisibleQuality,
    setLastActionDropDownIsVisibleQuality,
  ] = useState(false);
  const [
    lastActionDropDownIsVisiblePosition,
    setLastActionDropDownIsVisiblePosition,
  ] = useState(false);
  const [
    lastActionDropDownIsVisiblePlayer,
    setLastActionDropDownIsVisiblePlayer,
  ] = useState(false);
  const [lastActionDropDownIsVisibleType, setLastActionDropDownIsVisibleType] =
    useState(false);
  const [
    lastActionDropDownIsVisibleSubtype,
    setLastActionDropDownIsVisibleSubtype,
  ] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  // -------------
  // Orientation Stuff
  // -------------
  // orientation
  const [orientation, setOrientation] = useState("portrait");

  useEffect(() => {
    // console.log("- Position useEffect");
    ScreenOrientation.unlockAsync();
    checkOrientation();
    const subscriptionScreenOrientation =
      ScreenOrientation.addOrientationChangeListener(handleOrientationChange);

    return () => {
      subscriptionScreenOrientation.remove();
      ScreenOrientation.lockAsync();
    };
  });

  const checkOrientation = async () => {
    // console.log("in checkOrientation");
    const orientationObject = await ScreenOrientation.getOrientationAsync();
    // console.log(`orientation is ${orientationObject}`);
    if (
      orientationObject.orientationInfo.orientation == 4 ||
      orientationObject.orientationInfo.orientation == 3
    ) {
      setOrientation("landscape");
    } else {
      setOrientation("portrait");
    }
  };
  const handleOrientationChange = async (orientationObject) => {
    if (
      orientationObject.orientationInfo.orientation == 4 ||
      orientationObject.orientationInfo.orientation == 3
    ) {
      setOrientation("landscape");
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      );
    } else {
      setOrientation("portrait");
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
  };

  // -----------------
  //  Swipe Pad - 1
  // -----------------
  const [padVisible, setPadVisible] = useState(false);
  const [tapIsActive, setTapIsActive] = useState(true);
  const [tapDetails, setTapDetails] = useState({
    timestamp: "no date",
    padPosCenterX: 0,
    padPosCenterY: 0,
  });
  const [padPositionCenter, setPadPositionCenter] = useState({ x: 0, y: 0 });
  const [swipeColorDict, setSwipeColorDict] = useState(
    userReducer.defaultWheelColors
  );
  const stdSwipePadDefaultTextColor = "black";
  const stdSwipePadDefaultTextFontSize = 10;
  const defaultTextStyles = Object.fromEntries(
    Array.from({ length: 16 }, (_, i) => [
      i + 1, // Key: 1 to 16
      {
        color: stdSwipePadDefaultTextColor,
        fontSize: stdSwipePadDefaultTextFontSize,
        selected: false,
      },
    ])
  );
  const [swipeTextStyleDict, setSwipeTextStyleDict] =
    useState(defaultTextStyles);

  const [numTrianglesMiddle, setNumTrianglesMiddle] = useState(4); // 2, 4, or 5
  const [numTrianglesOuter, setNumTrianglesOuter] = useState(12); // 8, 10 or 12
  const [currentActionType, setCurrentActionType] = useState(null);
  const [currentActionSubtype, setCurrentActionSubtype] = useState(null);

  // -------------
  // Gesture Stuff
  // -------------
  const gestureTapBegin = Gesture.Tap().onBegin((event) => {
    console.log("gestureTapBegin");
    setSwipeColorDict(userReducer.defaultWheelColors);
    setSwipeTextStyleDict(defaultTextStyles);
    if (tapIsActive) {
      const timestamp = new Date().toISOString();
      const { x, y, absoluteX, absoluteY } = event;
      if (orientation == "portrait") {
        setPadPositionCenter({
          x: x - userReducer.circleRadiusOuter,
          y:
            y +
            scriptReducer.scriptLivePortraitVwVolleyballCourtCoords.y -
            userReducer.circleRadiusOuter,
        });
        console.log(
          `TapBegin - X: ${x - userReducer.circleRadiusOuter} - Y: ${
            y +
            scriptReducer.scriptLivePortraitVwVolleyballCourtCoords.y -
            userReducer.circleRadiusOuter
          }`
        );
      } else {
        setPadPositionCenter({
          x: x,
          y: y,
        });
      }

      setPadVisible(true);
      setTapDetails({
        timestamp,
        // padPosCenterX: padPositionCenter.x,
        // padPosCenterY: padPositionCenter.y,
        padPosCenterX: x - userReducer.circleRadiusOuter,
        padPosCenterY:
          y +
          scriptReducer.scriptLivePortraitVwVolleyballCourtCoords.y -
          userReducer.circleRadiusOuter,
      });

      setTapIsActive(false);
    }
  });

  const gestureTapEnd = Gesture.Tap()
    .maxDuration(10000) // <-- basically if user keeps hold for more than 10 seconds the wheel will just stay there.
    .onEnd((event) => {
      console.log("gestureTapEnd");
      // setTapIsActive(true);
      // addNewActionToScriptReducersActionsArrayNoWheel();
      // setCirclePosition({ x: 0, y: 0 });
      const { x, y, absoluteX, absoluteY } = event;

      // const swipePosX = calculatePadPositionCenter(absoluteX, absoluteY).x;
      // const swipePosY = calculatePadPositionCenter(absoluteX, absoluteY).y;
      const swipePosX = x - userReducer.circleRadiusOuter;
      const swipePosY =
        y +
        scriptReducer.scriptLivePortraitVwVolleyballCourtCoords.y -
        userReducer.circleRadiusOuter;

      const distanceFromCenter = Math.sqrt(
        Math.pow(swipePosX - tapDetails.padPosCenterX, 2) +
          Math.pow(swipePosY - tapDetails.padPosCenterY, 2)
      );
      // console.log(`TapEnd - X: ${swipePosX} - Y: ${swipePosY}`);

      setPadVisible(false);
      setTapIsActive(true);
    });

  const gestureSwipeOnChange = Gesture.Pan().onChange(
    (event) => {
      // console.log("👍 start gestureSwipeOnChange");

      const { x, y, translationX, translationY, absoluteX, absoluteY } = event;

      // console.log("- IN gestureSwipeOnChange");
      // const swipePosX = calculatePadPositionCenter(absoluteX, absoluteY).x;
      // const swipePosY = calculatePadPositionCenter(absoluteX, absoluteY).y;
      const swipePosX = x - userReducer.circleRadiusOuter;
      const swipePosY =
        y +
        scriptReducer.scriptLivePortraitVwVolleyballCourtCoords.y -
        userReducer.circleRadiusOuter;

      const distanceFromCenter = Math.sqrt(
        Math.pow(swipePosX - tapDetails.padPosCenterX, 2) +
          Math.pow(swipePosY - tapDetails.padPosCenterY, 2)
      );

      const relativeToPadCenterX = swipePosX - tapDetails.padPosCenterX;
      const relativeToPadCenterY = swipePosY - tapDetails.padPosCenterY;
      // const relativeToPadCenterX =
      //   swipePosX - tapDetails.padPosCenterX - userReducer.circleRadiusOuter;
      // const relativeToPadCenterY =
      //   swipePosY - tapDetails.padPosCenterY - userReducer.circleRadiusOuter;

      // console.log(`Swipe - X: ${swipePosX} - Y: ${swipePosY}`);
      // console.log("relativeToPadCenterX: " + relativeToPadCenterX);
      // console.log("relativeToPadCenterY: " + relativeToPadCenterY);

      const inInnerCircle = distanceFromCenter < userReducer.circleRadiusInner;
      const inMiddleCircle =
        distanceFromCenter < userReducer.circleRadiusMiddle;

      if (inInnerCircle) {
        handleSwipeColorChange("center");
        setCurrentActionType(null);
      } else {
        logicFourTwelveCircle(
          relativeToPadCenterX,
          relativeToPadCenterY,
          inMiddleCircle
        );
      }
    }
    // console.log("👍 end gestureSwipeOnChange");
    // }
  );

  // Combine swipe and tap gestures
  const gestureSwipeOnEnd = Gesture.Pan().onEnd((event) => {
    const { x, y, translationX, translationY, absoluteX, absoluteY } = event;

    const swipePosX = x - userReducer.circleRadiusOuter;
    const swipePosY =
      y +
      scriptReducer.scriptLivePortraitVwVolleyballCourtCoords.y -
      userReducer.circleRadiusOuter;
    // const swipePosX = calculatePadPositionCenter(x, y).x;
    // const swipePosY = calculatePadPositionCenter(x, y).y;

    const distanceFromCenter = Math.sqrt(
      Math.pow(swipePosX - tapDetails.padPosCenterX, 2) +
        Math.pow(swipePosY - tapDetails.padPosCenterY, 2)
    );

    // NOTE: the logic here is if the swipe is outside the inner circle then add a new action to the sessionActionsArray
    // - if the swipe is inside the inner circle then do either:
    // -- if no actions recorded in sessionActionsArray then reset to "?"
    // -- if actions recorded in sessionActionsArray then update to the last action in the sessionActionsArray
    if (distanceFromCenter > userReducer.circleRadiusInner) {
      // console.log(" !! Add action ");
      addNewActionToScriptReducersActionsArray();

      console.log(
        `tapDetails: ${tapDetails.padPosCenterX} - ${tapDetails.padPosCenterY}`
      );

      // tapDetails.padPosCenterY is adjusted on the y axis to account for the circle radius
      const tapYAdjusted =
        tapDetails.padPosCenterY + userReducer.circleRadiusOuter;
      const tapXAdjusted =
        tapDetails.padPosCenterX + userReducer.circleRadiusOuter;

      console.log(
        `half court line: ${
          scriptReducer.scriptLivePortraitVwVolleyballCourtCoords.y +
          scriptReducer.scriptLivePortraitVwVolleyballCourtCoords.height * 0.5
        }`
      );
      if (
        tapYAdjusted >
        scriptReducer.scriptLivePortraitVwVolleyballCourtCoords.y +
          scriptReducer.scriptLivePortraitVwVolleyballCourtCoords.height * 0.5
      ) {
        console.log("back row");
        if (
          tapXAdjusted >
          scriptReducer.scriptLivePortraitVwVolleyballCourtCoords.width * 0.66
        ) {
          console.log("right");
          setLastActionPosition(1);
        } else if (
          tapXAdjusted >
          scriptReducer.scriptLivePortraitVwVolleyballCourtCoords.width * 0.33
        ) {
          console.log("middle");
          setLastActionPosition(6);
        } else {
          console.log("left ");
          setLastActionPosition(5);
        }
      } else {
        console.log("front row");
        if (
          tapXAdjusted >
          scriptReducer.scriptLivePortraitVwVolleyballCourtCoords.width * 0.66
        ) {
          console.log("right");
          setLastActionPosition(2);
        } else if (
          tapXAdjusted >
          scriptReducer.scriptLivePortraitVwVolleyballCourtCoords.width * 0.33
        ) {
          console.log("middle");
          setLastActionPosition(3);
        } else {
          console.log("left ");
          setLastActionPosition(4);
        }
      }
      setLastActionType(
        scriptReducer.typesArray[lastActionTypeIndexRef.current]
      );
      setLastActionQuality(
        scriptReducer.qualityArrayOuterCircle[lastActionQualityIndexRef.current]
      );
      setLastActionSubtype("?");
    } else {
      // console.log(" no action registered on this swipe ");
      // if (
      //   scriptReducer.sessionActionsArray[
      //     scriptReducer.sessionActionsArray.length - 1
      //   ]?.type
      // ) {
      //   console.log(" !! Last action registered on this swipe ");
      //   setLastActionType(
      //     scriptReducer.sessionActionsArray[
      //       scriptReducer.sessionActionsArray.length - 1
      //     ]?.type
      //   );
      //   // setLastActionSubtype(
      //   //   scriptReducer.sessionActionsArray[
      //   //     scriptReducer.sessionActionsArray.length - 1
      //   //   ]?.subtype
      //   // );
      //   setLastActionQuality(
      //     scriptReducer.sessionActionsArray[
      //       scriptReducer.sessionActionsArray.length - 1
      //     ]?.quality
      //   );
      //   // setLastActionPosition(
      //   //   scriptReducer.sessionActionsArray[
      //   //     scriptReducer.sessionActionsArray.length - 1
      //   //   ]?.position
      //   // );
      //   // setLastActionPlayer(
      //   //   scriptReducer.sessionActionsArray[
      //   //     scriptReducer.sessionActionsArray.length - 1
      //   //   ]?.player
      //   // );
      // } else {
      //   // console.log("no actions registered ever");
      //   setLastActionType("?");
      //   // setLastActionSubtype("?");
      //   setLastActionQuality("?");
      //   // setLastActionPosition("?");
      //   // setLastActionPlayer("?");
      // }
      // console.log(
      //   `lastActionType from array: ${
      //     scriptReducer.sessionActionsArray[
      //       scriptReducer.sessionActionsArray.length - 1
      //     ]?.type
      //   }`
      // );
    }
  });

  const combinedGestures = Gesture.Simultaneous(
    gestureTapBegin,
    gestureTapEnd,
    gestureSwipeOnChange,
    gestureSwipeOnEnd
  );

  // -----------------
  // Swiping Functions
  // -----------------

  // Function to temporarily change color
  const handleSwipeColorChange = (direction, outerDirection = false) => {
    setSwipeColorDict(userReducer.defaultWheelColors);
    setSwipeTextStyleDict(defaultTextStyles);

    if (!outerDirection) {
      setSwipeColorDict((prevColors) => ({
        ...prevColors,
        [direction]: userReducer.selectedWheelColors[direction],
      }));
      setSwipeTextStyleDict((prevTextStyles) => ({
        ...prevTextStyles,
        [direction]: {
          color: "black",
          fontSize: 15,
          fontWeight: "bold",
          selected: true,
        },
      }));
    } else {
      setSwipeColorDict((prevColors) => ({
        ...prevColors,
        [direction]: userReducer.selectedWheelColors[direction],
        [outerDirection]: userReducer.selectedWheelColors[outerDirection],
      }));
      setSwipeTextStyleDict((prevTextStyles) => ({
        ...prevTextStyles,
        [direction]: {
          color: "black",
          fontSize: 15,
          fontWeight: "bold",
          selected: true,
        },
        [outerDirection]: {
          color: "black",
          fontSize: 15,
          fontWeight: "bold",
          selected: true,
        },
      }));
    }
  };

  const lastActionTypeIndexRef = useRef(null);
  const lastActionQualityIndexRef = useRef(null);

  const logicFourTwelveCircle = (
    relativeToPadCenterX,
    relativeToPadCenterY,
    inMiddleCircle
  ) => {
    // Y dependent
    const boundary15Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 15); // ? parts to circle, 15 degrees
    // const boundary30Y =
    //   relativeToPadCenterX * Math.tan((Math.PI / 180) * (360 / 12)); // 12 parts to circle
    const boundary45Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 45); // 8 parts to circle 45 = 360/8
    // X dependent
    const boundary75X =
      relativeToPadCenterY * (1 / Math.tan((Math.PI / 180) * 75));

    let wheelPositionMiddle = 0; // 0-4
    let wheelPositionOuter = 5; // 5-12, 5 is like 0, according to the scriptReducer.subtypesArray
    if (Math.abs(relativeToPadCenterY) < boundary45Y) {
      // Right side
      wheelPositionMiddle = 1;
      handleSwipeColorChange(wheelPositionMiddle);
      // setLastActionType(scriptReducer.typesArray[wheelPositionMiddle - 1]);
      lastActionTypeIndexRef.current = wheelPositionMiddle - 1;
      if (!inMiddleCircle) {
        wheelPositionOuter = 16; // like 16
        if (-relativeToPadCenterY > boundary15Y) {
          // console.log("--- Right Top ---");
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          // setLastActionQuality(
          //   scriptReducer.qualityArrayOuterCircle[wheelPositionOuter - 5]
          // );
          lastActionQualityIndexRef.current = wheelPositionOuter - 5;
        } else if (Math.abs(relativeToPadCenterY) < boundary15Y) {
          // console.log("--- Right Middle ---");
          wheelPositionOuter = 5;
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          // setLastActionQuality(
          //   scriptReducer.qualityArrayOuterCircle[wheelPositionOuter - 5]
          // );
          lastActionQualityIndexRef.current = wheelPositionOuter - 5;
        } else {
          // console.log("--- Right Bottom ---");
          wheelPositionOuter = 6;
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          // setLastActionQuality(
          //   scriptReducer.qualityArrayOuterCircle[wheelPositionOuter - 5]
          // );
          lastActionQualityIndexRef.current = wheelPositionOuter - 5;
        }
      }
    } else if (relativeToPadCenterY > Math.abs(boundary45Y)) {
      // Bottom
      wheelPositionMiddle = 2;
      handleSwipeColorChange(wheelPositionMiddle);
      // setLastActionType(scriptReducer.typesArray[wheelPositionMiddle - 1]);
      lastActionTypeIndexRef.current = wheelPositionMiddle - 1;
      if (!inMiddleCircle) {
        wheelPositionOuter = 7;
        if (relativeToPadCenterX > boundary75X) {
          // console.log("--- Bottom Right ---");
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          // setLastActionQuality(
          //   scriptReducer.qualityArrayOuterCircle[wheelPositionOuter - 5]
          // );
          lastActionQualityIndexRef.current = wheelPositionOuter - 5;
        } else if (Math.abs(relativeToPadCenterX) < boundary75X) {
          // console.log("--- Bottom Middle ---");
          wheelPositionOuter = 8;
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          // setLastActionQuality(
          //   scriptReducer.qualityArrayOuterCircle[wheelPositionOuter - 5]
          // );
          lastActionQualityIndexRef.current = wheelPositionOuter - 5;
        } else {
          // console.log("--- Bottom Left ---");
          wheelPositionOuter = 9;
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          // setLastActionQuality(
          //   scriptReducer.qualityArrayOuterCircle[wheelPositionOuter - 5]
          // );
          lastActionQualityIndexRef.current = wheelPositionOuter - 5;
        }
      }
    } else if (relativeToPadCenterY > boundary45Y) {
      // Left
      wheelPositionMiddle = 3;
      handleSwipeColorChange(wheelPositionMiddle);
      // setLastActionType(scriptReducer.typesArray[wheelPositionMiddle - 1]);
      lastActionTypeIndexRef.current = wheelPositionMiddle - 1;
      if (!inMiddleCircle) {
        wheelPositionOuter = 10;
        if (relativeToPadCenterY > Math.abs(boundary15Y)) {
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          // setLastActionQuality(
          //   scriptReducer.qualityArrayOuterCircle[wheelPositionOuter - 5]
          // ); // Set
          lastActionQualityIndexRef.current = wheelPositionOuter - 5;
        } else if (relativeToPadCenterY > boundary15Y) {
          wheelPositionOuter = 11;
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          // setLastActionQuality(
          //   scriptReducer.qualityArrayOuterCircle[wheelPositionOuter - 5]
          // ); // Set
          lastActionQualityIndexRef.current = wheelPositionOuter - 5;
        } else {
          wheelPositionOuter = 12;
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          // setLastActionQuality(
          //   scriptReducer.qualityArrayOuterCircle[wheelPositionOuter - 5]
          // ); // Set
          lastActionQualityIndexRef.current = wheelPositionOuter - 5;
        }
      }
    } else if (relativeToPadCenterY < boundary45Y) {
      // Top
      wheelPositionMiddle = 4;
      handleSwipeColorChange(wheelPositionMiddle);
      // setLastActionType(scriptReducer.typesArray[wheelPositionMiddle - 1]);
      lastActionTypeIndexRef.current = wheelPositionMiddle - 1;
      if (!inMiddleCircle) {
        wheelPositionOuter = 13;
        if (relativeToPadCenterX < boundary75X) {
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          // setLastActionQuality(
          //   scriptReducer.qualityArrayOuterCircle[wheelPositionOuter - 5]
          // ); // Att
          lastActionQualityIndexRef.current = wheelPositionOuter - 5;
        } else if (relativeToPadCenterX < Math.abs(boundary75X)) {
          wheelPositionOuter = 14;
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          // setLastActionQuality(
          //   scriptReducer.qualityArrayOuterCircle[wheelPositionOuter - 5]
          // ); // Att
          lastActionQualityIndexRef.current = wheelPositionOuter - 5;
        } else {
          wheelPositionOuter = 15;
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          // setLastActionQuality(
          //   scriptReducer.qualityArrayOuterCircle[wheelPositionOuter - 5]
          // ); // Att
          lastActionQualityIndexRef.current = wheelPositionOuter - 5;
        }
      }
    } else {
      console.log(" !! Not add action ");
      setSwipeColorDict(userReducer.defaultWheelColors);
    }
  };

  // -----------------
  //  Circle - OBE ?
  // -----------------
  const stylesCircle = {
    top: circlePosition.y,
    left: circlePosition.x,
    width: circleSize.width,
    height: circleSize.height,
    borderRadius: 25,
    backgroundColor: "orange",
    position: "absolute",
  };

  // const calculateCenterCircle = (x, y) => {
  //   const centerX = x - circleSize.width / 2;
  //   const centerY = y - circleSize.height / 2;

  //   setCirclePosition({
  //     x: centerX,
  //     y: centerY,
  //   });
  // };

  // -----------------
  //  Add Action
  // -----------------
  const addNewActionToScriptReducersActionsArray = () => {
    // console.log(`triggered addNewActionToScriptReducersActionsArray -`);
    const newActionObj = {
      dateScripted: new Date().toISOString(), // Convert to ISO string
      timestamp: new Date().toISOString(),
      type: lastActionType,
      subtype: lastActionSubtype,
      quality: lastActionQuality,
      playerId: scriptReducer.scriptingForPlayerObject.id,
      setNumber: 0,
      scoreTeamAnalyzed: 0,
      scoreTeamOpponent: 0,
      // rotation: scriptReducer.rotationArray[0],
      rotation: "rotation not set yet",
      opponentServed: false,
      favorite: false,
      sessionId: scriptReducer.sessionsArray.find((s) => s.selected).id,
      playerId: scriptReducer.scriptingForPlayerObject.id,
    };

    // console.log("--- newActionObj ---");
    // console.log(newActionObj);
    // console.log("--- END newActionObj ---");

    let tempArray = [...scriptReducer.sessionActionsArray, newActionObj];
    tempArray.sort((a, b) => a.timestamp - b.timestamp);
    dispatch(
      replaceScriptSessionActionsArray({ sessionActionsArray: tempArray })
    );
  };

  // const addNewActionToScriptReducersActionsArrayNoWheel = () => {
  //   console.log(`triggered addNewActionToScriptReducersActionsArrayNoWheel -`);
  //   const newActionObj = {
  //     dateScripted: new Date().toISOString(), // Convert to ISO string
  //     timestamp: new Date().toISOString(),
  //     type: scriptReducer.typesArray[scriptReducer.typesArray.length - 1],
  //     subtype:
  //       scriptReducer.subtypesArray[scriptReducer.subtypesArray.length - 1],
  //     quality: scriptReducer.qualityArray[2],
  //     playerId: scriptReducer.scriptingForPlayerObject.id,
  //     setNumber: 0,
  //     scoreTeamAnalyzed: 0,
  //     scoreTeamOpponent: 0,
  //     rotation: scriptReducer.rotationArray[0],
  //     opponentServed: false,
  //     favorite: false,
  //     sessionId: scriptReducer.sessionsArray.find((s) => s.selected).id,
  //     playerId: scriptReducer.scriptingForPlayerObject.id,
  //   };

  //   console.log("--- newActionObj ---");
  //   console.log(newActionObj);
  //   console.log("--- END newActionObj ---");

  //   // create new array with
  //   // let newScriptReducerActionArray = [
  //   let newScriptReducerSessionActionsArray = [
  //     ...scriptReducer.sessionActionsArray,
  //     newActionObj,
  //   ];

  //   // sort
  //   newScriptReducerSessionActionsArray.sort(
  //     (a, b) => a.timeStamp - b.timeStamp
  //   );
  //   dispatch(
  //     replaceScriptSessionActionsArray({
  //       sessionActionsArray: newScriptReducerSessionActionsArray,
  //     })
  //   );
  //   // Reset Last Action
  //   setLastActionQuality("?");
  //   setLastActionPosition("?");
  //   setLastActionPlayer(scriptReducer.playersArray.find((p) => p.selected));
  //   setLastActionType("?");
  //   setLastActionSubtype("?");
  //   // if (scriptReducerActionArray.length > 0) {
  //   //   setScriptReducerActionArray([...scriptReducerActionArray, newActionObj]);
  //   // } else {
  //   //   setScriptReducerActionArray([newActionObj]);
  //   // }

  //   //setPadVisible(false);
  //   //setTapIsActive(true);
  //   // setSwipePadServeIsActive(false);
  //   // setSwipePadReceptionIsActive(false);
  //   // console.log(
  //   //   "addNewActionToScriptReducersActionsArrayNoWheel: Working (end of function)"
  //   // );
  // };
  const sendScriptReducerSessionActionsArrayToServer = async () => {
    console.log("----> sendScriptReducerSessionActionsArrayToServer");

    alert("Sending recorded actions to Kyber Vision Database");

    const bodyObj = {
      actionsArray: scriptReducer.sessionActionsArray,
      // sessionId: userReducer.teamsArray.filter((tribe) => tribe.selected)[0]
      //   .practiceSession.id,
      sessionId: scriptReducer.sessionsArray.find((s) => s.selected).id,
      scriptId: scriptReducer.scriptId,
    };

    // console.log("-- bodyObj --");
    // console.log(bodyObj);
    // console.log("-- END bodyObj --");

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/scripts/receive-actions-array`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userReducer.token}`,
        },
        body: JSON.stringify(bodyObj),
      }
    );

    console.log("Received response:", response.status);

    let resJson = null;
    const contentType = response.headers.get("Content-Type");

    if (contentType?.includes("application/json")) {
      resJson = await response.json();
    }

    if (response.ok && resJson) {
      console.log(`response ok`);
      console.log(resJson);
      dispatch(updateScriptId(resJson.scriptId));
    } else {
      const errorMessage =
        resJson?.error ||
        `There was a server error (and no resJson): ${response.status}`;
      alert(errorMessage);
    }
  };

  // -----------------
  //  Last Action - Modify
  // -----------------
  const handleLastActionPlayerPress = (player) => {
    console.log(`- selected player: ${player.firstName}`);
    // const handleSelectPlayer = () => {
    const tempArray = scriptReducer.playersArray.map((player) => {
      if (player.id === player.id) {
        // setDisplayWarning(false);
        return {
          ...player,
          selected: !player.selected,
        };
      }
      return { ...player, selected: false };
    });
    dispatch(updatePlayersArray(tempArray));
    dispatch(setScriptingForPlayerObject(player));
    console.log(`- selected player [2]: ${player.firstName}`);
    setLastActionPlayer(player);
  };

  // -----------------
  //  Set Circle
  // -----------------
  // Expects team: "analyzed" | "opponent"
  const handleSetCirclePress = (team, setIndex) => {
    if (team === "analyzed") {
      if (sessionSetsWon.teamAnalyzed === setIndex) {
        setSessionSetsWon({
          teamAnalyzed: setIndex - 1,
          teamOpponent: sessionSetsWon.teamOpponent,
        });
      } else if (sessionSetsWon.teamAnalyzed + 1 === setIndex) {
        setSessionSetsWon({
          teamAnalyzed: setIndex,
          teamOpponent: sessionSetsWon.teamOpponent,
        });
      }
    } else {
      if (sessionSetsWon.teamOpponent === setIndex) {
        setSessionSetsWon({
          teamAnalyzed: sessionSetsWon.teamAnalyzed,
          teamOpponent: setIndex - 1,
        });
      } else if (sessionSetsWon.teamOpponent + 1 === setIndex) {
        setSessionSetsWon({
          teamAnalyzed: sessionSetsWon.teamAnalyzed,
          teamOpponent: setIndex,
        });
      }
    }
  };

  const handleSetScorePress = (team, scoreAdjust) => {
    // scores can never go below 0
    if (team === "analyzed") {
      if (setScores.teamAnalyzed + scoreAdjust < 0) {
        return;
      }
      setSetScores({
        teamAnalyzed: setScores.teamAnalyzed + scoreAdjust,
        teamOpponent: setScores.teamOpponent,
      });
    } else {
      if (setScores.teamOpponent + scoreAdjust < 0) {
        return;
      }
      setSetScores({
        teamAnalyzed: setScores.teamAnalyzed,
        teamOpponent: setScores.teamOpponent + scoreAdjust,
      });
    }
  };

  // -----------------
  //  Swipe Pad - 2
  // -----------------

  const styleVwMainPosition = {
    position: "absolute",
    left: padPositionCenter.x, // Center modal horizontally
    top: padPositionCenter.y, // Center modal vertically
    // left: 100,
    // top: 100,
  };

  // Determine which component to render
  const renderSwipePad = () => {
    if (padVisible) {
      return (
        <SwipePad
          styleVwMainPosition={styleVwMainPosition}
          swipeColorDict={swipeColorDict}
          swipeTextStyleDict={swipeTextStyleDict}
          numTrianglesMiddle={numTrianglesMiddle}
          numTrianglesOuter={numTrianglesOuter}
        />
      );
    }
    // return null; // Nothing renders if all are false
  };

  return orientation == "portrait" ? (
    <TemplateViewWithTopChildrenSmall
      navigation={navigation}
      topChildren={topChildren}
    >
      {/* {scriptReducer?.scriptLivePortraitVwVolleyballCourtCoords?.x && (
        <View style={{ position: "absolute", left: 20, bottom: 10 }}>
          <Text>
            VwVolleyballCourtCoords X/Y:{" "}
            {scriptReducer.scriptLivePortraitVwVolleyballCourtCoords?.x.toFixed(
              0
            )}
            ,{" "}
            {scriptReducer.scriptLivePortraitVwVolleyballCourtCoords?.y.toFixed(
              0
            )}
          </Text>
          <Text>
            VwVolleyballCourtCoords Width/Height:{" "}
            {scriptReducer.scriptLivePortraitVwVolleyballCourtCoords?.width.toFixed(
              0
            )}
            ,{" "}
            {scriptReducer.scriptLivePortraitVwVolleyballCourtCoords?.height.toFixed(
              0
            )}
          </Text>

          <Text>
            Third Court Line:{" "}
            {scriptReducer.scriptLivePortraitVwVolleyballCourtCoords.width *
              0.33}
          </Text>
          <Text>
            Two-Thirds Court Line:{" "}
            {scriptReducer.scriptLivePortraitVwVolleyballCourtCoords.width *
              0.66}
          </Text>
        </View>
      )} */}

      {showGrid && (
        <View
          style={{
            position: "absolute",
            top: scriptReducer.scriptLivePortraitVwVolleyballCourtCoords.y,
            left: 0,
          }}
        >
          {/* Half Court Line */}
          <View
            style={{
              position: "absolute",
              top:
                scriptReducer.scriptLivePortraitVwVolleyballCourtCoords.height *
                0.5,
              width:
                scriptReducer.scriptLivePortraitVwVolleyballCourtCoords.width,
              height: 2,
              backgroundColor: "black",
              zIndex: 1,
            }}
          />
          {/* Left Side Line */}
          <View
            style={{
              position: "absolute",
              left:
                scriptReducer.scriptLivePortraitVwVolleyballCourtCoords.width /
                3,
              width: 2,
              height:
                scriptReducer.scriptLivePortraitVwVolleyballCourtCoords.height,
              backgroundColor: "black",
              zIndex: 1,
            }}
          />
          {/* Right Side Line */}
          <View
            style={{
              position: "absolute",
              left:
                (scriptReducer.scriptLivePortraitVwVolleyballCourtCoords.width *
                  2) /
                3,
              width: 2,
              height:
                scriptReducer.scriptLivePortraitVwVolleyballCourtCoords.height,
              backgroundColor: "black",
              zIndex: 1,
            }}
          />
        </View>
      )}
      <ScriptingPortrait
        combinedGestures={combinedGestures}
        orientation={orientation}
        setScores={setScores}
        sessionSetsWon={sessionSetsWon}
        handleSetCirclePress={handleSetCirclePress}
        handleSetScorePress={handleSetScorePress}
        // ----------- Dropdowns Value -----------
        lastActionQuality={lastActionQuality}
        setLastActionQuality={setLastActionQuality}
        lastActionPosition={lastActionPosition}
        setLastActionPosition={setLastActionPosition}
        lastActionPlayer={lastActionPlayer}
        // setLastActionPlayer={setLastActionPlayer}
        handleLastActionPlayerPress={handleLastActionPlayerPress}
        lastActionType={lastActionType}
        setLastActionType={setLastActionType}
        lastActionSubtype={lastActionSubtype}
        setLastActionSubtype={setLastActionSubtype}
        // --------- Dropdowns Toggles -----------
        // Quality
        lastActionDropDownIsVisibleQuality={lastActionDropDownIsVisibleQuality}
        setLastActionDropDownIsVisibleQuality={
          setLastActionDropDownIsVisibleQuality
        }
        // Position
        lastActionDropDownIsVisiblePosition={
          lastActionDropDownIsVisiblePosition
        }
        setLastActionDropDownIsVisiblePosition={
          setLastActionDropDownIsVisiblePosition
        }
        // Player
        lastActionDropDownIsVisiblePlayer={lastActionDropDownIsVisiblePlayer}
        setLastActionDropDownIsVisiblePlayer={
          setLastActionDropDownIsVisiblePlayer
        }
        // Type
        lastActionDropDownIsVisibleType={lastActionDropDownIsVisibleType}
        setLastActionDropDownIsVisibleType={setLastActionDropDownIsVisibleType}
        // Subtype
        lastActionDropDownIsVisibleSubtype={lastActionDropDownIsVisibleSubtype}
        setLastActionDropDownIsVisibleSubtype={
          setLastActionDropDownIsVisibleSubtype
        }
        sendScriptReducerSessionActionsArrayToServer={
          sendScriptReducerSessionActionsArrayToServer
        }
      />
      {/* {circlePosition.y > 0 && <View style={stylesCircle} />} */}
      {renderSwipePad()}
    </TemplateViewWithTopChildrenSmall>
  ) : (
    <View>
      <ScriptingLandscape
        combinedGestures={combinedGestures}
        orientation={orientation}
        setScores={setScores}
        sessionSetsWon={sessionSetsWon}
        handleSetCirclePress={handleSetCirclePress}
        handleSetScorePress={handleSetScorePress}
        lastActionQuality={lastActionQuality}
        setLastActionQuality={setLastActionQuality}
        lastActionPosition={lastActionPosition}
        setLastActionPosition={setLastActionPosition}
        lastActionPlayer={lastActionPlayer}
        setLastActionPlayer={setLastActionPlayer}
        lastActionType={lastActionType}
        setLastActionType={setLastActionType}
        lastActionSubtype={lastActionSubtype}
        setLastActionSubtype={setLastActionSubtype}
        // lastActionDropDownIsVisible={lastActionDropDownIsVisible}
        // setLastActionDropDownIsVisible={setLastActionDropDownIsVisible}
        // --------- Dropdowns Toggles -----------
        // Quality
        lastActionDropDownIsVisibleQuality={lastActionDropDownIsVisibleQuality}
        setLastActionDropDownIsVisibleQuality={
          setLastActionDropDownIsVisibleQuality
        }
        // Position
        lastActionDropDownIsVisiblePosition={
          lastActionDropDownIsVisiblePosition
        }
        setLastActionDropDownIsVisiblePosition={
          setLastActionDropDownIsVisiblePosition
        }
        // Player
        lastActionDropDownIsVisiblePlayer={lastActionDropDownIsVisiblePlayer}
        setLastActionDropDownIsVisiblePlayer={
          setLastActionDropDownIsVisiblePlayer
        }
        // Type
        lastActionDropDownIsVisibleType={lastActionDropDownIsVisibleType}
        setLastActionDropDownIsVisibleType={setLastActionDropDownIsVisibleType}
        // Subtype
        lastActionDropDownIsVisibleSubtype={lastActionDropDownIsVisibleSubtype}
        setLastActionDropDownIsVisibleSubtype={
          setLastActionDropDownIsVisibleSubtype
        }
        sendScriptReducerSessionActionsArrayToServer={
          sendScriptReducerSessionActionsArrayToServer
        }
      />
      <View style={stylesCircle} />
    </View>
  );
}

const styles = StyleSheet.create({
  txtTopChildren: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
