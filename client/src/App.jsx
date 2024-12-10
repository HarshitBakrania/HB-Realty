import { Homepage } from "./pages/Homepage";
import { ListPage } from "./pages/ListPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PropertyPage } from "./pages/PropertyPage";
import { SignUpPage } from "./pages/SignUpPage";
import { SignInPage } from "./pages/SignInPage";
import { UserPage } from "./pages/UserPage";
import { MessagePage } from "./pages/MessagePage";
import { UpdatePage } from "./pages/UpdatePage";
import { NewPostPage } from "./pages/NewPostPage";

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
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/update" element={<UpdatePage />} />
          <Route path="/user/messages" element={<MessagePage />} />
          <Route path="/posts/create" element={<NewPostPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
