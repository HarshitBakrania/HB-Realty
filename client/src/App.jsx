import { Homepage } from "./routes/Homepage"
import { ListPage } from "./routes/ListPage";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { PropertyPage } from "./routes/PropertyPage";
import { SignUpPage } from "./routes/SignUpPage";
import { SignInPage } from "./routes/SignInPage";
import { UserPage } from "./routes/UserPage";
import { MessagePage } from "./routes/MessagePage";
import { UpdatePage } from "./routes/UpdatePage";
import { NewPostPage } from "./routes/NewPostPage";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path= "/" element={<Homepage />} />
          <Route path="list" element={<ListPage />} />
          <Route path="/:id" element={<PropertyPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/update" element={<UpdatePage />} />
          <Route path="/user/messages" element={<MessagePage />} />
          <Route path="/create" element={<NewPostPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App