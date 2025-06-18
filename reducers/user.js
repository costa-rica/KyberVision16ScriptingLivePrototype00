import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: {
    username: null,
    email: null,
  },
  // tribeArray: [],
  teamsArray: [],
  // playersArray: [],
  portraitHeight: null,
  portraitWidth: null,
  // profile: null,
  //video: {}, //list received from API GET /videos
  // videosDownloadedStatusObj: {},
  circleRadiusOuter: 70,
  circleRadiusMiddle: 50,
  circleRadiusInner: 20,
  scriptPositionGuides: false,
  defaultWheelColors: {
    1: "rgba(230, 144, 64, 1)", // right
    2: "rgba(147, 191, 81, 1)", // bottom
    3: "rgba(60, 126, 181, 1)", // left
    4: "rgba(178, 61, 149, 1)", // top
    5: "gray", // rightMiddle
    6: "black", // rightBottom
    7: "white", // bottomRight
    8: "gray", // bottomMiddle
    9: "black", // bottomLeft
    10: "black", // leftBottom
    11: "gray", // leftMiddle
    12: "white", // leftTop
    13: "black", // topleft
    14: "gray", // topMiddle
    15: "white", // topRight
    16: "white", // rightTop
    center: "white",
  },
  selectedWheelColors: {
    1: "#BD9AC1", // right
    // 2: "brown", // right
    2: "#BD9AC1", // bottom
    3: "#BD9AC1", // left
    4: "#BD9AC1", // top
    5: "#BD9AC1",
    6: "#BD9AC1",
    7: "#BD9AC1",
    8: "#BD9AC1",
    9: "#BD9AC1",
    10: "#BD9AC1",
    11: "#BD9AC1",
    12: "#BD9AC1",
    13: "#BD9AC1",
    14: "#BD9AC1",
    15: "#BD9AC1",
    16: "#BD9AC1",
    center: "white",
  },
  swipePadTextStyleMiddleCircle: Object.fromEntries(
    Array.from({ length: 4 }, (_, i) => [
      i + 1, // Key: 1 to 16`
      {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
      },
    ])
  ),
  // swipePadTextStyleOuterCircle: Object.fromEntries(
  //   Array.from({ length: 12 }, (_, i) => [
  //     i + 1, // Key: 1 to 12`
  //     {
  //       color: "black",
  //       fontSize: 14,
  //       // fontWeight: "bold",
  //     },
  //   ])
  // ),
  swipePadTextStyleOuterCircle: {
    1: { color: "black", fontSize: 14, fontWeight: "bold" }, // rightMiddle
    2: { color: "white", fontSize: 16, fontWeight: "bold" }, // rightBottom
    3: { color: "black", fontSize: 14, fontWeight: "bold" }, // bottomRight
    4: { color: "black", fontSize: 14, fontWeight: "bold" }, // bottomMiddle
    5: { color: "white", fontSize: 16, fontWeight: "bold" }, // bottomLeft
    6: { color: "white", fontSize: 16, fontWeight: "bold" }, // leftBottom
    7: { color: "black", fontSize: 14, fontWeight: "bold" }, // leftMiddle
    8: { color: "black", fontSize: 14, fontWeight: "bold" }, // leftTop
    9: { color: "white", fontSize: 16, fontWeight: "bold" }, // topleft
    10: { color: "black", fontSize: 14, fontWeight: "bold" }, // topMiddle
    11: { color: "black", fontSize: 14, fontWeight: "bold" }, // topRight
    12: { color: "black", fontSize: 14, fontWeight: "bold" }, // rightTop
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      // console.log(`- dans Redux: loginUser 🔔`);
      state.token = action.payload.token;
      // state.profile = action.payload.profile;
      state.user.username = action.payload.username;
      state.user.email = action.payload.email;
    },
    // storeVideoDetailsInRedux: (state, action) => {
    //   console.log(`- dans Redux: storeVideoDetailsInRedux 🔔`);
    //   state.video = action.payload.video;
    // },
    reducerSetScreenDimensions: (state, action) => {
      console.log(`- dans Redux: reducerSetScreenDimensions 🔔`);
      state.portraitHeight = action.payload.portraitHeight;
      state.portraitWidth = action.payload.portraitWidth;
    },
    reducerSetUserSwipePadWheel: (state, action) => {
      state.circleRadiusOuter = action.payload.circleRadiusOuter;
      state.circleRadiusMiddle = action.payload.circleRadiusMiddle;
      state.circleRadiusInner = action.payload.circleRadiusInner;
    },
    switchPositionGuides: (state) => {
      console.log("switchPositionGuides");
      state.scriptPositionGuides = !state.scriptPositionGuides;
    },
    // updateTribeArray: (state, action) => {
    updateTeamsArray: (state, action) => {
      // console.log(" 🟢 updateTribeArray");
      state.teamsArray = action.payload;
    },
    // updatePlayersArray: (state, action) => {
    //   state.playersArray = action.payload;
    // },
  },
});

export const {
  loginUser,
  // storeVideoDetailsInRedux,
  reducerSetScreenDimensions,
  reducerSetUserSwipePadWheel,
  switchPositionGuides,
  // updateTribeArray,
  updateTeamsArray,
  // updatePlayersArray,
} = userSlice.actions;
export default userSlice.reducer;

// --- OBE  colors -----
// defaultWheelColors: {
//   1: "rgba(255, 143, 143, 1)", // right
//   2: "rgba(255, 143, 143, 1)", // bottom
//   3: "rgba(255, 143, 143, 1)", // bottombottomleft
//   4: "rgba(255, 143, 143, 1)",
//   5: "rgba(247, 255, 162, 0.5)", // bottombottomleft
//   6: "rgba(247, 255, 162, 0.5)",
//   7: "rgba(247, 255, 162, 0.5)", // bottombottomleft
//   8: "rgba(247, 255, 162, 0.5)",
//   9: "rgba(247, 255, 162, 0.5)", // bottombottomleft
//   10: "rgba(247, 255, 162, 0.5)",
//   11: "rgba(247, 255, 162, 0.5)", // bottombottomleft
//   12: "rgba(247, 255, 162, 0.5)",
//   13: "rgba(247, 255, 162, 0.5)", // bottombottomleft
//   14: "rgba(247, 255, 162, 0.5)",
//   15: "rgba(247, 255, 162, 0.5)", // bottombottomleft
//   16: "rgba(247, 255, 162, 0.5)",
//   center: "gray",
// },
// selectedWheelColors: {
//   1: "rgba(255, 255, 143, 1)", // right
//   // 2: "brown", // right
//   2: "rgba(255, 255, 143, 1)", // bottom
//   3: "rgba(255, 255, 143, 1)", // left
//   4: "rgba(255, 255, 143, 1)", // top
//   5: "rgba(255, 143, 143, 1)",
//   6: "rgba(255, 143, 143, 1)",
//   7: "rgba(255, 143, 143, 1)",
//   8: "rgba(255, 143, 143, 1)",
//   9: "rgba(255, 143, 143, 1)",
//   10: "rgba(255, 143, 143, 1)",
//   11: "rgba(255, 143, 143, 1)",
//   12: "rgba(255, 143, 143, 1)",
//   13: "rgba(255, 143, 143, 1)",
//   14: "rgba(255, 143, 143, 1)",
//   15: "rgba(255, 143, 143, 1)",
//   16: "rgba(255, 143, 143, 1)",
//   center: "white",
// },
