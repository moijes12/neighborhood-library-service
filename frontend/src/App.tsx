import {BrowserRouter, Route, Routes} from "react-router";
import SignIn from "./components/users/SignIn"
import BookDetail from "./components/books/BookDetail"
import BookList from "./pages/BookList"


export default function App() {

  return (
    <BrowserRouter>
          <Routes>
            <Route index element={<SignIn />} />
            <Route path="books">
              <Route index element={<BookList />} />
              <Route path=":id" element={<BookDetail/>} />
            </Route>
          </Routes>
        </BrowserRouter>
  );
}
