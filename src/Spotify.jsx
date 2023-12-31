const authEndpoint = "https://accounts.spotify.com/authorize";

const clientId = "07996469063c4ac786a883c737038968";

const redirectUri = "http://localhost:5173/";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "user-library-read",
  "playlist-read-private",
  "user-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
];

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog-true`;
