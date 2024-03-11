import { ThemeProvider } from "@mui/material/styles"
import { theme } from "./styles/theme"
import { BasePage } from "../pages/base_page/BasePage"
import { Provider } from "react-redux"
import store from "./store"
import './styles/index.css'
function App() {

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BasePage />
      </Provider>
    </ThemeProvider >
  )
}

export default App
