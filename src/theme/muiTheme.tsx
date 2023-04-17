import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

// General MUI theme
const extTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#001a72", //--swm-navy-light-100
        },
        secondary: {
          main: "#782aeb", //--swm-purple-light-100
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#eef0ff", //--swm-navy-light-10
        },
        secondary: {
          main: "#b58df1", //--swm-purple-light-80
        },
      },
    },
  },
});

export default extTheme;
