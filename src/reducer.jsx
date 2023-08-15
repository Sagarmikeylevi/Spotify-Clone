export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  token: null,
};

const reducer = (state, action) => {
  // console.log("action ---> ", action);

  // Action --> type, [playload]

  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };

    case "ADD_PLAYLIST":
      let updatedPlaylists;
      if (action.playlist.id === 2) {
        updatedPlaylists = [
          state.playlists[0],
          action.playlist,
          ...state.playlists.slice(1),
        ];
      } else if (action.playlist.id === 1) {
        updatedPlaylists = [action.playlist, ...state.playlists];
      } else {
        updatedPlaylists = [...state.playlists, action.playlist];
      }

      return {
        ...state,
        playlists: updatedPlaylists,
      };

    default:
      return state;
  }
};

export default reducer;

// "BQB2dEeA5GT5LOmmO5VMl3KI2Q4nfQiRXgjmZoL2AkxSSRzDEtX_u1i7h9mgV4q48PRXhV7A9Y81cqh2L6iENlw2_m0URvzk1bAwnu3w522qe-fO0CItfUp-7FBjTzGnKvb-y7fV2mfNn9M9VifHs37i5mT6tCJOo5d5xo8jTdiUTRc-5Erxohy5e5BYylCF3mgbd1QlbJMV3w3zjcXuwxkoKFTIGGMFxVLN6UJm4EtqMISFCx0e9sU"
