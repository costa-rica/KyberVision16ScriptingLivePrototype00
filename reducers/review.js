import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviewReducerVideoObject: null,
  reviewReducerActionsArray: [],
  reviewReducerListOfPlayerDbObjects: [],
  isFavoriteToggle: false,
  // manuallySelectedActionId: null, // New property to track user-selected action
  selectedActionObject: null, // New property to track user-selected action
  // selectedActionTimestamp: null, // New property to track user-selected action
};

// --- Elements of reviewActionsArray:
// actionsDbTableId: elem.id,
// reviewVideoActionsArrayIndex: elem.reviewVideoActionsArrayIndex,
// playerId: elem.playerId,
// timestamp: elem.timestampFromStartOfVideo,
// type: elem.type,
// subtype: elem.subtype,
// quality: elem.quality,
// isDisplayed: true,
// isFavorite: false,
// isPlaying: false,

// --- Elements of reviewReducerListOfPlayerDbObjects:
// "id
// firstName"
// lastName
// birthDate
// isDisplayed

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    updateReviewReducerVideoObject: (state, action) => {
      state.reviewReducerVideoObject = action.payload;
      console.log(`- dans Redux: updateReviewReducerVideoObject 🔔`);
    },
    createReviewActionsArray: (state, action) => {
      state.reviewReducerActionsArray = action.payload;
    },
    createReviewActionsArrayUniquePlayersNamesAndObjects: (state, action) => {
      state.reviewReducerListOfPlayerDbObjects =
        action.payload.playerDbObjectsArray;
    },

    updateReviewReducerIsPlayingforActionsArrayV5: (state, action) => {
      const currentTime = action.payload;
      // const threshold = 0.25; // Define a tolerance range in seconds

      // Filter only actions where isDisplayed is true
      const displayedActions = state.reviewReducerActionsArray.filter(
        (action) => action.isDisplayed
      );

      // Removed a check here for displayedActions.length === 0; I don't think its needed
      let newPlayingAction = null;

      // 🔹 Step 1: If a manual action is selected, keep it active until its timestamp is passed
      if (
        state.selectedActionObject &&
        currentTime < state.selectedActionObject.timestamp
      ) {
        newPlayingAction = state.selectedActionObject;
      } else {
        state.selectedActionObject = null;

        // 🔹 Step 2: Find the closest action, but ensure it's after the current time
        let futureActions = displayedActions.filter(
          (action) => action.timestamp >= currentTime
        );

        // 🔹 Step 2.1: Find the closest action, but ensure it's after the current time
        if (futureActions.length > 0) {
          newPlayingAction = futureActions.reduce((prev, curr) => {
            return Math.abs(curr.timestamp - currentTime) <
              Math.abs(prev.timestamp - currentTime)
              ? curr
              : prev;
          });
        } else {
          // If no future actions exist, just keep the last available action
          newPlayingAction = displayedActions[displayedActions.length - 1];
        }
      }

      // 🔹 Step 3: Update the state
      state.reviewReducerActionsArray = state.reviewReducerActionsArray.map(
        (action) => ({
          ...action,
          isPlaying:
            action.isDisplayed &&
            action.reviewVideoActionsArrayIndex ===
              newPlayingAction.reviewVideoActionsArrayIndex,
        })
      );
    },

    pressedActionInReviewReducerActionArray: (state, action) => {
      state.selectedActionObject = action.payload;
      // state.selectedActionTimestamp = action.payload.timestamp;
      const updateActionIsPlaying = {
        ...action.payload,
        isPlaying: true,
      };

      // 🔹 UPDATE THE STATE
      state.reviewReducerActionsArray = state.reviewReducerActionsArray.map(
        (action) => ({
          ...action,
          isPlaying:
            action.isDisplayed &&
            action.reviewVideoActionsArrayIndex ===
              updateActionIsPlaying.reviewVideoActionsArrayIndex,
        })
      );
    },

    filterReviewReducerActionsArrayOnPlayer: (state, action) => {
      // 🔹  filter on player by toggline on isDisplayed
      // 🔹  takes into account the isFavoriteToggle
      const playerId = action.payload.id;

      // Toggle isDisplayed in reviewReducerListOfPlayerDbObjects
      const player = state.reviewReducerListOfPlayerDbObjects.find(
        (p) => p.id === playerId
      );
      if (player) {
        player.isDisplayed = !player.isDisplayed;
      }

      // Toggle isDisplayed for corresponding actions in reviewReducerActionsArray
      state.reviewReducerActionsArray = state.reviewReducerActionsArray.map(
        (action) => {
          if (state.isFavoriteToggle) {
            return action.playerId === playerId && action.isFavorite
              ? { ...action, isDisplayed: !action.isDisplayed }
              : action;
          } else {
            return action.playerId === playerId
              ? { ...action, isDisplayed: !action.isDisplayed }
              : action;
          }
        }
      );
    },

    toggleReviewReducerActionIsFavorite: (state, action) => {
      // 🔹  Used by ReviewVideoLandscape > star button
      // 🔹  > toggle isFavorite for corresponding action
      const actionsDbTableId = action.payload;

      state.reviewReducerActionsArray = state.reviewReducerActionsArray.map(
        (item) =>
          item.actionsDbTableId === actionsDbTableId
            ? { ...item, isFavorite: !item.isFavorite } // Toggle isFavorite
            : item
      );
    },

    filterReviewReducerActionsArrayOnIsFavorite: (state) => {
      // 🔹 If payload === true → Show only favorite actions, but apply the player filtering
      // 🔹 If payload === false → Show all actions, but still respect player filtering.
      state.isFavoriteToggle = !state.isFavoriteToggle;

      state.reviewReducerActionsArray = state.reviewReducerActionsArray.map(
        (actionItem) => {
          // Find the corresponding player object based on playerId
          const matchingPlayer = state.reviewReducerListOfPlayerDbObjects.find(
            (player) => player.id === actionItem.playerId
          );

          // Ensure we have a matching player
          if (!matchingPlayer) {
            return actionItem; // Skip if no matching player is found
          }

          // If state.isFavoriteToggle is true, show only favorites & apply player filtering
          if (state.isFavoriteToggle) {
            return {
              ...actionItem,
              isDisplayed: actionItem.isFavorite
                ? matchingPlayer.isDisplayed
                : false,
            };
          }

          // If shouldShowOnlyFavorites is false, show all actions & apply player filtering
          return {
            ...actionItem,
            isDisplayed: matchingPlayer.isDisplayed,
          };
        }
      );
    },
    filterReviewReducerActionsArrayShowAll: (state) => {
      // 🔹  Used by ReviewVideoLandscape > show all actions
      state.reviewReducerActionsArray = state.reviewReducerActionsArray.map(
        (action) => ({
          ...action,
          isDisplayed: true,
        })
      );
      state.isFavoriteToggle = false;
      state.reviewReducerListOfPlayerDbObjects =
        state.reviewReducerListOfPlayerDbObjects.map((player) => ({
          ...player,
          isDisplayed: true,
        }));
    },
  },
});

export const {
  updateReviewReducerVideoObject,
  createReviewActionsArray,
  createReviewActionsArrayUniquePlayersNamesAndObjects,
  filterReviewReducerActionsArrayOnPlayer,
  updateReviewReducerIsPlayingforActionsArray,
  toggleReviewReducerActionIsFavorite,
  filterReviewReducerActionsArrayOnIsFavorite,
  filterReviewReducerActionsArrayShowAll,

  updateReviewReducerIsPlayingforActionsArrayV5,
  pressedActionInReviewReducerActionArray,
} = reviewSlice.actions;

export default reviewSlice.reducer;
