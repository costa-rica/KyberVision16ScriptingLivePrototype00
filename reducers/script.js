import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scriptId: null,
  sessionsArray: [],
  matchActionsArray: [], // former actionsArray
  matchPointsTableArray: [], // former pointsTableArray
  playersArray: [],
  scriptingPlayerCount: null,
  scriptingForPlayerObject: null, // <-- player object (id, firstName, lastName, shirtNumber)
  scriptingTeamObject: null, // <-- team object (id, name)
  // /// - testing
  // objToModify: null,
  // testPayloadTime: null,
  // testPayloadQuailty: null,
  // newObj: null,
  // --- These are meant to be hardcoded and available throughout the app --- NO MODIFY in code
  typesArray: ["Bl", "Def", "Set", "Att", "tap"],
  subtypesArray: [
    "B2",
    "B1",
    "BC",
    "FB",
    "AC",
    "NS",
    "Q",
    "Hi",
    "Tip",
    "Pwr",
    "Rol",
    "B3",
    "tap",
  ],
  qualityArray: ["=", "-", "0", "+", "#"],
  rotationArray: ["P1", "P2", "P3", "P4", "P5", "P6"],
  positionalAreasArray: Array.from({ length: 6 }, (_, i) => i + 1),
  playerNamesArray: ["Léa", "Odeyssa", "Yoann", "Johanne", "Ted", "Sarah"],
  playerNamesArrayRotated: [], // Initialized empty, will be set in reducer
  pointsArray: Array.from({ length: 50 }, (_, i) => i),
  setOptionsArray: Array.from({ length: 4 }, (_, i) => i),
  scriptLivePortraitVwVolleyballCourtCoords: {
    x: null,
    y: null,
    width: null,
    height: null,
  },
};
// *** Important Type Inforamtion ***

// actionsArray element properties
// dateScripted: new Date().toISOString(), // Convert to ISO string
// timeStamp: player.currentTime,
// type: actionObj.type,
// subType: "tap - sub",
// quality: "some quality",
// playerId: "Player 1",
// scriptId: scriptReducer.scriptId,
// newAction: true,
// pointId: "set" - "scoreTeamAnalyzed + scoreTeamOpponent"

// pointsTableArray element properties
// pointId: "set" - "scoreTeamAnalyzed + scoreTeamOpponent"
// setNumber: 1,
// scoreTeamAnalyzed: 0,
// scoreTeamOpponent: 0,
// rotation: p1
// opponentServed: false
// favorite: false

// *** (END) Important Type Inforamtion ***

export const scriptSlice = createSlice({
  name: "script",
  initialState,
  reducers: {
    // newScript: (state, action) => {
    //   console.log("start newScript (in script reduer)");
    //   state.scriptId = action.payload.scriptId;
    //   state.tokenWithUserId = action.payload.userId;
    //   console.log("END newScript (in script reduer)");
    // },
    // deleteScript: (state) => {
    emptyMatchActionsArray: (state) => {
      // state.scriptId = null;
      // state.tokenWithUserId = null;
      state.matchActionsArray = [];
    },
    replaceScriptMatchActionsArray: (state, action) => {
      state.matchActionsArray = action.payload.matchActionsArray;
      // state.scriptId = action.payload?.scriptId;
    },
    updateScriptingPlayerCount: (state, action) => {
      state.scriptingPlayerCount = action.payload;
    },

    updateQualityPropertyInObjectOfMatchActionsArray: (state, action) => {
      const { timestamp, quality } = action.payload;

      // Find the index of the object to update
      const index = state.matchActionsArray.findIndex(
        (obj) => obj.timestamp === timestamp
      );
      if (index !== -1) {
        // Create a new object with the updated quality
        const updatedObject = { ...state.matchActionsArray[index], quality };

        // Create a new array with the updated object
        const updatedArray = [
          ...state.matchActionsArray.slice(0, index), // gets all objects from 0 to index
          updatedObject,
          ...state.matchActionsArray.slice(index + 1), // gets all object from index+1 to end
        ];

        // Sort the array by timeStamp
        state.matchActionsArray = updatedArray.sort(
          (a, b) => a.timestamp - b.timestamp
        );
      }
    },
    updateTypePropertyInObjectOfMatchActionsArray: (state, action) => {
      const { timestamp, type } = action.payload;

      // Find the index of the object to update
      const index = state.matchActionsArray.findIndex(
        (obj) => obj.timestamp === timestamp
      );
      if (index !== -1) {
        // Create a new object with the updated quality
        const updatedObject = { ...state.matchActionsArray[index], type };

        // Create a new array with the updated object
        const updatedArray = [
          ...state.matchActionsArray.slice(0, index), // gets all objects from 0 to index
          updatedObject,
          ...state.matchActionsArray.slice(index + 1), // gets all object from index+1 to end
        ];

        // Sort the array by timeStamp
        state.matchActionsArray = updatedArray.sort(
          (a, b) => a.timestamp - b.timestamp
        );
      }
    },
    updateSubtypePropertyInObjectOfMatchActionsArray: (state, action) => {
      const { timestamp, subtype } = action.payload;

      // Find the index of the object to update
      const index = state.matchActionsArray.findIndex(
        (obj) => obj.timestamp === timestamp
      );
      if (index !== -1) {
        // Create a new object with the updated quality
        const updatedObject = { ...state.matchActionsArray[index], subtype };

        // Create a new array with the updated object
        const updatedArray = [
          ...state.matchActionsArray.slice(0, index), // gets all objects from 0 to index
          updatedObject,
          ...state.matchActionsArray.slice(index + 1), // gets all object from index+1 to end
        ];

        // Sort the array by timeStamp
        state.matchActionsArray = updatedArray.sort(
          (a, b) => a.timestamp - b.timestamp
        );
      }
    },
    updateMatchPointsTableArray: (state, action) => {
      state.matchPointsTableArray = action.payload.matchPointsTableArray;
    },
    rotatePlayerNamesArray: (state) => {
      if (state.playerNamesArrayRotated.length === 0) {
        // Initialize if not already set
        state.playerNamesArrayRotated = [...state.playerNamesArray];
      }
      if (state.playerNamesArrayRotated.length > 1) {
        // Rotate array elements to the left
        state.playerNamesArrayRotated = [
          ...state.playerNamesArrayRotated.slice(1),
          state.playerNamesArrayRotated[0],
        ];
      }
    },
    initializePlayerNamesArrayRotated: (state) => {
      console.log("--- >  initializePlayerNamesArrayRotated");
      // This action can be dispatched at app startup to ensure correct initialization
      state.playerNamesArrayRotated = [...state.playerNamesArray];
    },
    setScriptingForPlayerObject: (state, action) => {
      state.scriptingForPlayerObject = action.payload;
    },
    setScriptingTeamObject: (state, action) => {
      state.scriptingTeamObject = action.payload;
    },

    // NEW for Version 15
    updateScriptLivePortraitVwVolleyballCourtCoords: (state, action) => {
      state.scriptLivePortraitVwVolleyballCourtCoords = action.payload;
    },
    updatePlayersArray: (state, action) => {
      state.playersArray = action.payload;
    },
    updateScriptId: (state, action) => {
      state.scriptId = action.payload;
    },
    updateSessionsArray: (state, action) => {
      state.sessionsArray = action.payload;
    },
  },
});

export const {
  // newScript,
  // deleteScript,
  emptyMatchActionsArray,
  replaceScriptMatchActionsArray,
  updateScriptingPlayerCount,
  updateQualityPropertyInObjectOfMatchActionsArray,
  updateTypePropertyInObjectOfMatchActionsArray,
  updateSubtypePropertyInObjectOfMatchActionsArray,
  updateMatchPointsTableArray,
  rotatePlayerNamesArray,
  initializePlayerNamesArrayRotated,
  setScriptingForPlayerObject,
  setScriptingTeamObject,

  // NEW for Version 15
  updateScriptLivePortraitVwVolleyballCourtCoords,
  updatePlayersArray,
  updateScriptId,
  updateSessionsArray,
} = scriptSlice.actions;
export default scriptSlice.reducer;
