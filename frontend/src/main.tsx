import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css'
// import App from './App.tsx'
import BookList from './components/books/BookList.tsx';
import BookDetail from './components/books/BookDetail.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="books">
          <Route index element={<BookList />} />
          <Route path=":id" element={<BookDetail/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
