import { ThemeProvider } from "@mui/material/styles"
import { theme } from "./styles/theme"
import { BasePage } from "../pages/base_page/BasePage"

function App() {

  return (
    <ThemeProvider theme={theme}>
      <BasePage />
    </ThemeProvider >
  )
}

export default App
