import { AuthProvider } from "./context/AuthContext";
import SignupPage from "./pages/SignupPage";

const App = () => (
  <AuthProvider>
    <div>
      <SignupPage />
    </div>
  </AuthProvider>
);

export default App;
