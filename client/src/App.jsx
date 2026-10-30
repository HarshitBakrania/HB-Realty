import { Homepage } from "./pages/Homepage";
import { ListPage } from "./pages/ListPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PropertyPage } from "./pages/PropertyPage";
import { SignUpPage } from "./pages/SignUpPage";
import { SignInPage } from "./pages/SignInPage";
import { UserPage } from "./pages/UserPage";
import { MessagePage } from "./pages/MessagePage";
import { UpdatePage } from "./pages/UpdatePage";
import { NewPostPage } from "./pages/NewPostPage";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function RequireAuth({ children }) {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="list" element={<ListPage />} />
          <Route path="/posts/:id" element={<PropertyPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route
            path="/user"
            element={
              <RequireAuth>
                <UserPage />
              </RequireAuth>
            }
          />
          <Route
            path="/user/update"
            element={
              <RequireAuth>
                <UpdatePage />
              </RequireAuth>
            }
          />
          <Route
            path="/user/messages"
            element={
              <RequireAuth>
                <MessagePage />
              </RequireAuth>
            }
          />
          <Route
            path="/posts/create"
            element={
              <RequireAuth>
                <NewPostPage />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
