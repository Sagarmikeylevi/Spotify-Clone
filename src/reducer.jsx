export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  token: null,
  showSidebar: true,
  sponsoredPlaylist: {},
  showMessage: {
    isShow: false,
    message: null,
  },
  playlistCards: [],
  suggestedArtist: [],
  homePage: true,
  SearchPage: false,
  showListPage: {
    isOpen: false,
    items: null,
  },
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

    case "SHOW_SIDEBAR":
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };

    case "ADD_SPONSOREDPLAYLIST":
      return {
        ...state,
        sponsoredPlaylist: action.sponsoredPlaylist,
      };

    case "LOGOUT":
      return {
        ...state,
        token: null,
      };

    case "SHOW_MESSAGE":
      return {
        ...state,
        showMessage: {
          isShow: action.showMessage.isShow,
          message: action.showMessage.message,
        },
      };

    case "ADD_PLAYLIST_CARD":
      return {
        ...state,
        playlistCards: [...state.playlistCards, action.playlistCards],
      };

    case "ADD_ARTIST":
      const newArtist = {
        id: action.artistDetails.id,
        name: action.artistDetails.name,
        imgURL: action.artistDetails.imgURL,
      };

      return {
        ...state,
        suggestedArtist: [...state.suggestedArtist, newArtist],
      };

    case "OPEN_HOME":
      return {
        ...state,
        homePage: true,
        SearchPage: false,
        showListPage: {
          isOpen: false,
        },
      };

    case "OPEN_SEARCH":
      return {
        ...state,
        homePage: false,
        SearchPage: true,
        showListPage: {
          isOpen: false,
        },
      };

    case "OPEN_SHOWLIST":
      return {
        ...state,
        homePage: false,
        SearchPage: false,
        showListPage: {
          isOpen: true,
          items: action.items,
        },
      };

    default:
      return state;
  }
};

export default reducer;

// "BQB2dEeA5GT5LOmmO5VMl3KI2Q4nfQiRXgjmZoL2AkxSSRzDEtX_u1i7h9mgV4q48PRXhV7A9Y81cqh2L6iENlw2_m0URvzk1bAwnu3w522qe-fO0CItfUp-7FBjTzGnKvb-y7fV2mfNn9M9VifHs37i5mT6tCJOo5d5xo8jTdiUTRc-5Erxohy5e5BYylCF3mgbd1QlbJMV3w3zjcXuwxkoKFTIGGMFxVLN6UJm4EtqMISFCx0e9sU"
