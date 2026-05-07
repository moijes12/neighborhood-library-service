import {BrowserRouter, Route, Routes} from "react-router";
import SignIn from "./components/users/SignIn"
import BookDetail from "./components/books/BookDetail"
import BookList from "./pages/BookList"
import Dashboard from "./components/users/Dashboard";
import Layout from "./components/layouts/Layout";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = !!localStorage.getItem('access_token');
  return isAuth ? children : <Navigate to="/signin" />;
};


export default function App() {

  return (
    <BrowserRouter>
    <Layout>
          <Routes>
            <Route index element={<BookList />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="books">
              <Route index element={<BookList />} />
              <Route path=":id" element={<BookDetail/>} />
            </Route>
            <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Routes>
          </Layout>
        </BrowserRouter>
  );
}
