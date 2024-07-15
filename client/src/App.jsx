import { Homepage } from "./routes/Homepage"
import { ListPage } from "./routes/ListPage";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { PropertyPage } from "./routes/PropertyPage";
import { SignUpPage } from "./routes/SignUpPage";
import { SignInPage } from "./routes/SignInPage";
import { UserPage } from "./routes/UserPage";
import { MessagePage } from "./routes/MessagePage";


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
          <Route path="/messages" element={<MessagePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App