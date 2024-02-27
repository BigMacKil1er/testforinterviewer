import { createTheme } from '@mui/material/styles';

const colors = {
    dusty_rose: '#bc6d4f',
    vine: '#500805',
    dark: '#1e0000',
    text: '#fff'
}

export const theme = createTheme({
  palette: {
    primary: {
      light: colors.dusty_rose,
      main: colors.vine,
      dark: colors.dark,
      contrastText: colors.text,
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});