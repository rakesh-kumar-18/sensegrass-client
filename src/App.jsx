import { SignupProvider } from "./context/SignupContext";
import SignupPage from "./pages/SignupPage";

const App = () => {
  return (
    <SignupProvider>
      <SignupPage />
    </SignupProvider>
  );
};

export default App;
