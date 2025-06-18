import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import TemplateView from "./TemplateView";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons"; // near top of file
import ButtonKvImage from "./buttons/ButtonKvImage";
import ButtonKvStd from "./buttons/ButtonKvStd";
import ButtonKvNoDefault from "./buttons/ButtonKvNoDefault";
import { loginUser } from "../../reducers/user";
import {
  GestureHandlerRootView,
  GestureDetector,
  // Gesture,
} from "react-native-gesture-handler";
import SvbVolleyballCourt from "../../assets/images/volleyballCourt.svg";
import BtnReception from "../../assets/images/buttons/btnReception.svg";
import BtnService from "../../assets/images/buttons/btnService.svg";
import BtnFavorite from "../../assets/images/buttons/btnFavorite.svg";
import BtnWin from "../../assets/images/buttons/btnWin.svg";
import BtnLose from "../../assets/images/buttons/btnLose.svg";
import Lightning from "../../assets/images/lightning.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  updateScriptLivePortraitVwVolleyballCourtCoords,
  replaceScriptMatchActionsArray,
} from "../../reducers/script";

export default function ScriptingLivePortrait(props) {
  const scriptReducer = useSelector((state) => state.script);
  const userReducer = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleVwVolleyballCourtAndGestSuperLayout = (event) => {
    console.log("handleVwVolleyballCourtAndGestSuperLayout");
    console.log(event.nativeEvent.layout);
    const { width, height, x, y } = event.nativeEvent.layout;

    dispatch(
      updateScriptLivePortraitVwVolleyballCourtCoords({ x, y, width, height })
    );
  };

  // -----------------
  //  Styles
  // -----------------

  const stylesBtnTop = {
    width: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").width * 0.15,
    zIndex: 2,
  };
  const stylesBtnBottom = {
    width: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").width * 0.15,
    zIndex: 2,
    // backgroundColor: "white",
  };
  const stylesBtnFavorite = {
    width: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").width * 0.15,
  };
  const stylesVwGroupButtonsDiagonalLine = {
    position: "absolute",
    width: Dimensions.get("window").width * 0.21, // roughly 0.15 * √2 for diagonal spacing
    height: 8,
    backgroundColor: "#806181",
    top: "50%",
    left: "50%",
    transform: [
      { translateX: -0.5 * Dimensions.get("window").width * 0.21 },
      { translateY: -5 },
      { rotate: "-45deg" },
    ],
    zIndex: 0,
  };
  const stylesVwGroupButtonsCircle = {
    borderRadius: (Dimensions.get("window").width * 0.2) / 2,
    backgroundColor: "gray",
    width: Dimensions.get("window").width * 0.2,
    height: Dimensions.get("window").width * 0.2,
    top: Dimensions.get("window").width * 0.05,
    left:
      (Dimensions.get("window").width * 0.4) / 2 -
      (Dimensions.get("window").width * 0.2) / 2,
    position: "absolute",
    backgroundColor: "#806181",
    opacity: 0.5,
  };

  const stylesDropDownPositionQuality = {
    left: 5,
    width: Dimensions.get("window").width * 0.1 - 5,
  };
  const stylesDropDownPositionPosition = {
    left: Dimensions.get("window").width * 0.1 + 5,
    width: Dimensions.get("window").width * 0.1 - 5,
  };
  const stylesDropDownPositionPlayer = {
    left: Dimensions.get("window").width * 0.2 + 5,
    width: Dimensions.get("window").width * 0.2 - 5,
  };
  const stylesDropDownPositionType = {
    left: Dimensions.get("window").width * 0.4 + 5,
    width: Dimensions.get("window").width * 0.2 - 5,
  };
  const stylesDropDownPositionSubtype = {
    left: Dimensions.get("window").width * 0.6 + 5,
    width: Dimensions.get("window").width * 0.2 - 5,
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View style={styles.vwTeamNames}>
          <View style={styles.vwTeamNameSub}>
            <Text style={styles.txtTeamName}>
              {
                userReducer.teamsArray.filter((tribe) => tribe.selected)[0]
                  .teamName
              }
            </Text>
          </View>
          <Lightning />
          <View style={styles.vwTeamNameSub}>
            <Text style={styles.txtTeamName}>Team 2</Text>
          </View>
        </View>
        {/* <Text>{props.orientation}</Text> */}
        {/* <View style={styles.testActionsContainer}>
          <ScrollView>
            {scriptReducer.actionsArray.map((action, index) => (
              <View key={index}>
                <Text>
                  Id: {action.id}, Type: {action.type}, Subtype:{" "}
                  {action.subtype}, Quality: {action.quality}, PlayerId:{" "}
                  {action.playerId}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View> */}
        <View style={styles.vwGroupScoreAndSets}>
          <View style={styles.vwGroupSetSuper}>
            <View style={styles.vwGroupSet}>
              {Array.from({ length: 3 }).map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    props.handleSetCirclePress("analyzed", index + 1)
                  }
                  style={[
                    styles.touchOpSetsCircle,
                    props.matchSetsWon.teamAnalyzed > index &&
                      styles.touchOpSetsCircleFilled,
                  ]}
                />
              ))}
            </View>
          </View>
          <View style={styles.vwGroupScore}>
            <View style={styles.vwRowButtonsAdjustScore}>
              <ButtonKvStd
                onPress={() => {
                  props.handleSetScorePress("analyzed", 1);
                }}
                style={styles.btnPlus}
              >
                +
              </ButtonKvStd>
              <ButtonKvStd
                onPress={() => {
                  props.handleSetScorePress("opponent", 1);
                }}
                style={styles.btnPlus}
              >
                +
              </ButtonKvStd>
            </View>
            <View style={styles.vwRowScore}>
              <Text style={styles.txtRowScore}>
                {props.setScores.teamAnalyzed}
              </Text>
              <Text style={styles.txtRowScore}>-</Text>
              <Text style={styles.txtRowScore}>
                {props.setScores.teamOpponent}
              </Text>
            </View>
            <View style={styles.vwRowButtonsAdjustScore}>
              <ButtonKvStd
                onPress={() => {
                  props.handleSetScorePress("analyzed", -1);
                }}
                style={styles.btnPlus}
              >
                -
              </ButtonKvStd>
              <ButtonKvStd
                onPress={() => {
                  props.handleSetScorePress("opponent", -1);
                }}
                style={styles.btnPlus}
              >
                -
              </ButtonKvStd>
            </View>
          </View>
          <View style={styles.vwGroupSetSuper}>
            <View style={styles.vwGroupSet}>
              {/* <Text>vwGroupSet</Text> */}
              {/* <View style={styles.vwSetCircles}> */}
              {Array.from({ length: 3 }).map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    props.handleSetCirclePress("opponent", index + 1)
                  }
                  style={[
                    styles.touchOpSetsCircle,
                    props.matchSetsWon.teamOpponent > index &&
                      styles.touchOpSetsCircleFilled,
                  ]}
                />
              ))}
            </View>
          </View>
        </View>
        <View style={styles.vwGroupLastActionButtonsInstructionsAndLabels}>
          <View style={styles.vwGroupInstructionsAndLabels}>
            <Text style={styles.txtInstructions}>Last scripted point</Text>
            <View style={styles.vwGroupLabels}>
              <Text
                style={[stylesDropDownPositionQuality, styles.txtGroupLabel]}
              >
                Quality
              </Text>
              <Text
                style={[stylesDropDownPositionPosition, styles.txtGroupLabel]}
              >
                Pos.
              </Text>
              <Text
                style={[stylesDropDownPositionPlayer, styles.txtGroupLabel]}
              >
                Player
              </Text>
              <Text style={[stylesDropDownPositionType, styles.txtGroupLabel]}>
                Type
              </Text>
              <Text
                style={[stylesDropDownPositionSubtype, styles.txtGroupLabel]}
              >
                Subtype
              </Text>
            </View>
          </View>

          {/* --------- Last Action Buttons --------- */}
          <View style={styles.vwGroupLastActionButtonsSuper}>
            <View style={styles.vwGroupLastActionButtons}>
              <ButtonKvNoDefault
                onPress={() => {
                  console.log("pressed Quality");
                  props.setLastActionDropDownIsVisibleQuality((prev) => !prev);
                }}
                styleView={[styles.btnLastAction, styles.btnLastActionSmall]}
                styleText={styles.txtLastAction}
              >
                {props.lastActionQuality}
              </ButtonKvNoDefault>
              <ButtonKvNoDefault
                onPress={() => {
                  console.log("pressed Position");
                  props.setLastActionDropDownIsVisiblePosition((prev) => !prev);
                }}
                styleView={[styles.btnLastAction, styles.btnLastActionSmall]}
                styleText={styles.txtLastAction}
              >
                {props.lastActionPosition}
              </ButtonKvNoDefault>
              <ButtonKvNoDefault
                onPress={() => {
                  console.log("pressed Player");
                  props.setLastActionDropDownIsVisiblePlayer((prev) => !prev);
                }}
                styleView={[styles.btnLastAction, styles.btnLastActionBig]}
                styleText={styles.txtLastAction}
              >
                {props.lastActionPlayer.firstName.slice(0, 4)}
              </ButtonKvNoDefault>
              <ButtonKvNoDefault
                onPress={() => {
                  console.log("pressed Type");
                  props.setLastActionDropDownIsVisibleType((prev) => !prev);
                }}
                styleView={[styles.btnLastAction, styles.btnLastActionBig]}
                styleText={styles.txtLastAction}
              >
                {props.lastActionType}
              </ButtonKvNoDefault>
              <ButtonKvNoDefault
                onPress={() => {
                  console.log("pressed Subtype");
                  props.setLastActionDropDownIsVisibleSubtype((prev) => !prev);
                }}
                styleView={[styles.btnLastAction, styles.btnLastActionBig]}
                styleText={styles.txtLastAction}
              >
                {props.lastActionSubtype}
              </ButtonKvNoDefault>
              {props.lastActionDropDownIsVisibleQuality && (
                <View
                  style={[
                    stylesDropDownPositionQuality,
                    styles.vwDropDownContainer,
                  ]}
                >
                  {scriptReducer.qualityArray.map((quality, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        props.setLastActionQuality(quality);
                        props.setLastActionDropDownIsVisibleQuality(false);
                      }}
                      style={styles.btnDropDown}
                    >
                      <Text style={styles.txtDropDownBtn}>{quality}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {props.lastActionDropDownIsVisiblePosition && (
                <View
                  style={[
                    stylesDropDownPositionPosition,
                    styles.vwDropDownContainer,
                  ]}
                >
                  {scriptReducer.positionalAreasArray.map(
                    (positionalArea, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          props.setLastActionPosition(positionalArea);
                          props.setLastActionDropDownIsVisiblePosition(false);
                        }}
                        style={styles.btnDropDown}
                      >
                        <Text style={styles.txtDropDownBtn}>
                          {positionalArea}
                        </Text>
                      </TouchableOpacity>
                    )
                  )}
                </View>
              )}
              {props.lastActionDropDownIsVisiblePlayer && (
                <View
                  style={[
                    stylesDropDownPositionPlayer,
                    styles.vwDropDownContainer,
                  ]}
                >
                  {scriptReducer.playersArray.map((player, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        // console.log(`player pressed: ${player.firstName}`);
                        props.handleLastActionPlayerPress(player);
                        props.setLastActionDropDownIsVisiblePlayer(false);
                      }}
                      style={styles.btnDropDown}
                    >
                      <Text style={styles.txtDropDownBtn}>
                        {player.firstName.slice(0, 4)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              {props.lastActionDropDownIsVisibleType && (
                <View
                  style={[
                    stylesDropDownPositionType,
                    styles.vwDropDownContainer,
                  ]}
                >
                  {scriptReducer.typesArray.map((type, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        props.setLastActionType(type);
                        props.setLastActionDropDownIsVisibleType(false);
                      }}
                      style={styles.btnDropDown}
                    >
                      <Text style={styles.txtDropDownBtn}>{type}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              {props.lastActionDropDownIsVisibleSubtype && (
                <View
                  style={[
                    stylesDropDownPositionSubtype,
                    styles.vwDropDownContainer,
                  ]}
                >
                  {scriptReducer.subtypesArray.map((subtype, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        props.setLastActionSubtype(subtype);
                        props.setLastActionDropDownIsVisibleSubtype(false);
                      }}
                      style={styles.btnDropDown}
                    >
                      <Text style={styles.txtDropDownBtn}>{subtype}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* ------------ MIDDLE Container ------------ */}
      <View
        style={styles.containerMiddle}
        onLayout={(event) => handleVwVolleyballCourtAndGestSuperLayout(event)}
      >
        <GestureHandlerRootView
          style={{}} //This is key to make sure the flex properties will trickle down to <Image>
        >
          <GestureDetector gesture={props.combinedGestures}>
            <View style={styles.containerMiddleSub}>
              <View style={styles.vwPlayer}>
                <View style={styles.vwPlayerLeft}>
                  <Text style={styles.txtShirtNumber}>
                    {props.lastActionPlayer.shirtNumber}
                  </Text>
                </View>
                <View style={styles.vwPlayerRight}>
                  <Text style={styles.txtPlayerName}>
                    {props.lastActionPlayer.firstName}
                  </Text>
                  <Text style={styles.txtPlayerName}>
                    {props.lastActionPlayer.lastName}
                  </Text>
                </View>
              </View>

              <SvbVolleyballCourt />
            </View>
          </GestureDetector>
        </GestureHandlerRootView>
      </View>
      {/* ------------ BOTTOM Container ------------ */}
      <View style={styles.containerBottom}>
        <View style={styles.vwRallyButtonsGroup}>
          <View style={styles.vwGroupButtons}>
            <View style={stylesVwGroupButtonsCircle} />
            <View style={stylesVwGroupButtonsDiagonalLine} />
            <ButtonKvImage
              onPress={() => {
                console.log("pressed service");
                dispatch(
                  replaceScriptMatchActionsArray({ matchActionsArray: [] })
                );
              }}
              style={styles.btnRallyGroupBottom}
            >
              <BtnService style={stylesBtnBottom} />
            </ButtonKvImage>
            <ButtonKvImage
              onPress={() => {
                console.log("pressed reception");
              }}
              style={styles.btnRallyGroupTop}
            >
              <BtnReception style={stylesBtnTop} />
            </ButtonKvImage>
          </View>
          <View style={styles.vwButtonFavorite}>
            <ButtonKvImage
              onPress={() => {
                console.log("pressed favorite");
              }}
              style={{ margin: 0, padding: 0 }}
            >
              <BtnFavorite style={stylesBtnFavorite} />
            </ButtonKvImage>
          </View>
          <View style={styles.vwGroupButtons}>
            <View style={stylesVwGroupButtonsCircle} />
            <View style={stylesVwGroupButtonsDiagonalLine} />
            <ButtonKvImage
              onPress={() => {
                console.log("pressed win");
              }}
              style={styles.btnRallyGroupBottom}
            >
              <BtnWin style={stylesBtnBottom} />
            </ButtonKvImage>

            <ButtonKvImage
              onPress={() => {
                console.log("pressed lose");
              }}
              style={styles.btnRallyGroupTop}
            >
              <BtnLose style={stylesBtnTop} />
            </ButtonKvImage>
          </View>
        </View>
        <View style={styles.vwSendScriptGroup}>
          <View style={styles.vwScriptDetails}>
            <Text style={{ color: "#806181" }}>
              {" "}
              {scriptReducer.matchActionsArray.length} actions recorded
            </Text>
            <Text style={{ fontStyle: "italic", color: "#806181" }}>
              {" "}
              {
                scriptReducer.matchActionsArray.filter(
                  (action) => action.favorite
                ).length
              }{" "}
              favorites
            </Text>
          </View>
          <View style={styles.vwSendScriptButton}>
            <ButtonKvStd
              onPress={() => {
                console.log("pressed send script");
                // console.log(scriptReducer.matchActionsArray);
                props.sendScriptReducerMatchActionsArrayToServer();
              }}
              style={{
                backgroundColor: "#806181",
                width: "100%",
                // padding: 15,
              }}
            >
              Send script to{" "}
              {
                userReducer.teamsArray.filter((tribe) => tribe.selected)[0]
                  .teamName
              }
            </ButtonKvStd>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  // ------------
  // TOP Container
  // ------------
  containerTop: {
    width: "100%",
  },
  testActionsContainer: {
    height: 80,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "dashed",
  },
  vwTeamNames: {
    backgroundColor: "#806181",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    height: 50,
    overflow: "hidden",
  },
  txtTeamName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  vwGroupScoreAndSets: {
    flexDirection: "row",
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    // borderColor: "gray",
    // borderWidth: 1,
    // borderStyle: "dashed",
    paddingVertical: 10,
  },
  vwGroupSet: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#806181",
    padding: 5,
    borderRadius: 15,
    gap: 5,
  },
  touchOpSetsCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    marginHorizontal: 1,
    backgroundColor: "white",
  },
  touchOpSetsCircleFilled: {
    backgroundColor: "#806181",
  },
  vwGroupScore: {
    width: Dimensions.get("window").width * 0.4,
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
    // borderColor: "gray",
    // borderWidth: 1,
    // borderStyle: "dashed",
  },
  vwRowButtonsAdjustScore: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "20%",
  },
  btnPlus: {
    padding: 0,
    margin: 0,
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#806181",
    color: "white",
    width: 35,
    borderRadius: 10,
    height: null,
    fontSize: null,
    opacity: 0.5,
  },
  vwRowScore: {
    backgroundColor: "#806181",
    borderRadius: 20,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: "15%",
  },
  txtRowScore: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  vwGroupLastActionButtonsInstructionsAndLabels: {
    // width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "gray",
    // borderWidth: 1,
    // borderStyle: "dashed",
  },
  vwGroupInstructionsAndLabels: {
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
  },
  txtInstructions: {
    color: "#806181",
    fontSize: 12,
    fontWeight: "bold",
    width: Dimensions.get("window").width * 0.8 + 5,
  },
  vwGroupLabels: {
    flexDirection: "row",
    position: "relative",
    height: 15,
    width: Dimensions.get("window").width * 0.8 + 5, // +5 for padding linked to btnLastActionSmall and btnLastActionBig
  },
  txtGroupLabel: {
    color: "gray",
    fontSize: 10,
    position: "absolute",
    top: 0,
    zIndex: 1,
    textAlign: "center",
  },
  vwGroupLastActionButtonsSuper: {
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "gray",
    // borderWidth: 1,
    // borderStyle: "dashed",
  },
  vwGroupLastActionButtons: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#806181",
    borderRadius: 20,
    padding: 5,
    width: Dimensions.get("window").width * 0.8 + 5, // +5 for padding linked to btnLastActionSmall and btnLastActionBig
  },
  btnLastAction: {
    backgroundColor: "#BD9AC1",
    borderWidth: 0,
    height: null,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    width: null,
  },
  btnLastActionSmall: {
    width: Dimensions.get("window").width * 0.1 - 5, // +5 for padding linked to vwGroupLastActionButtons
  },
  btnLastActionBig: {
    width: Dimensions.get("window").width * 0.2 - 5, // +5 for padding linked to vwGroupLastActionButtons
  },
  txtLastAction: {
    color: "#806181",
    fontSize: 15,
  },
  vwDropDownContainer: {
    position: "absolute",
    top: 30,
    // left: Dimensions.get("window").width * 0.4 + 5,
    // width: Dimensions.get("window").width * 0.2 - 5,
    backgroundColor: "#806181",
    borderRadius: 10,
    padding: 5,
    zIndex: 1,
    gap: 5,
  },
  btnDropDown: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
  },
  txtDropDownBtn: {
    color: "#806181",
    // fontSize: 15,
  },
  // ------------
  // MIDDLE Container
  // ------------
  containerMiddle: {},
  containerMiddleSub: {
    backgroundColor: "#F0EAF9",
    alignItems: "center",
    padding: 15,
    gap: 20,
  },
  vwPlayer: {
    borderWidth: 1,
    borderColor: "#6E4C84",
    borderRadius: 30,
    backgroundColor: "white",
    flexDirection: "row",
    gap: 10,
    padding: 5,
    width: Dimensions.get("window").width * 0.3,
  },
  vwPlayerLeft: {
    justifyContent: "center",
    backgroundColor: "#806181",
    borderRadius: 30,
  },
  txtShirtNumber: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
    borderRadius: 7,
    height: 15,
    width: 20,
    textAlign: "center",
  },
  vwPlayerRight: {
    alignItems: "center",
    justifyContent: "center",
  },
  txtPlayerName: {
    textAlign: "center",
    color: "#6E4C84",
    fontSize: 11,
  },

  // ------------
  // BOTTOM Container
  // ------------

  containerBottom: {
    width: "100%",
  },
  vwRallyButtonsGroup: {
    flexDirection: "row",
  },
  vwGroupButtons: {
    position: "relative",
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.4,
    justifyContent: "center",
    // borderColor: "gray",
    // borderWidth: 1,
    // borderStyle: "dashed",
  },

  btnRallyGroupBottom: {
    paddingHorizontal: 0,
    // borderColor: "gray",
    // borderWidth: 1,
    // borderStyle: "dashed",
    paddingTop: 50,
  },
  vwGroupButtonsLine: {
    width: Dimensions.get("window").width * 0.4,
    height: 5,
    backgroundColor: "#806181",
    position: "absolute",
    top: Dimensions.get("window").width * 0.2 - 20,
    left: 0,
    // rotate
    transform: [{ rotate: "-45deg" }],
    zIndex: 0,
  },
  btnRallyGroupTop: {
    // borderColor: "gray",
    // borderWidth: 1,
    // borderStyle: "dashed",
  },
  btnReception: {
    width: 50,
    height: 50,
  },
  vwButtonFavorite: {
    borderRadius: (Dimensions.get("window").width * 0.2) / 2,
    backgroundColor: "white",
    marginTop: -35,
    paddingTop: 5,
    width: Dimensions.get("window").width * 0.2,
    alignItems: "center",

    // height: Dimensions.get("window").width * 0.15,
  },
  btnFavorite: {
    // marginTop: -50,
  },
  vwSendScriptGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});
