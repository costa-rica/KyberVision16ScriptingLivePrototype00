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
  circleRadiusOuter: 30,
  circleRadiusMiddle: 30,
  circleRadiusInner: 30,
  scriptPositionGuides: false,
  defaultWheelColors: {
    1: "rgba(230, 144, 64, 1)", // right
    2: "rgba(147, 191, 81, 1)", // bottom
    3: "rgba(60, 126, 181, 1)", // left
    4: "rgba(178, 61, 149, 1)", // top
    5: "rgba(212, 134, 66, 1)", // rightMiddle
    6: "rgba(217, 168, 60, 1)", // rightBottom
    7: "rgba(108,161,29,1)", // bottomRight
    8: "rgba(126, 162, 79, 1)", // bottomMiddle
    9: "rgba(60, 154, 108, 1)", // bottomLeft
    10: "rgba(60, 159, 164, 1)", // leftBottom
    11: "rgba(60, 120, 169, 1)", // leftMiddle
    12: "rgba(60, 100, 160, 1)", // leftTop
    13: "rgba(116, 82, 144, 1)", // topleft
    14: "rgba(165, 61, 141, 1)", // topMiddle
    15: "rgba(204, 60, 77, 1)", // topRight
    16: "rgba(206,95, 94, 1)", // rightTop
    center: "gray",
  },
  selectedWheelColors: {
    1: "white", // right
    // 2: "brown", // right
    2: "white", // bottom
    3: "white", // left
    4: "white", // top
    5: "white",
    6: "white",
    7: "white",
    8: "white",
    9: "white",
    10: "white",
    11: "white",
    12: "white",
    13: "white",
    14: "white",
    15: "white",
    16: "white",
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
  swipePadTextStyleOuterCircle: Object.fromEntries(
    Array.from({ length: 12 }, (_, i) => [
      i + 1, // Key: 1 to 12`
      {
        color: "black",
        fontSize: 14,
        // fontWeight: "bold",
      },
    ])
  ),
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
