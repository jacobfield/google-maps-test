"use server";
import ThemeProvider from "./assets/comps/ThemeProvider";
import AppContainer from "./assets/comps/AppContainer";
import Map from "./assets/comps/Map";

function App() {
  return (
    <ThemeProvider>
      <AppContainer>
        <Map />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
