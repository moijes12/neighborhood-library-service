import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
// import './index.css'
// import App from './App.tsx'
import BookList from './pages/BookList.tsx';
import BookDetail from './components/books/BookDetail.tsx';
import SignIn from './components/users/SignIn';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<SignIn />} />
        <Route path="books">
          <Route index element={<BookList />} />
          <Route path=":id" element={<BookDetail/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
