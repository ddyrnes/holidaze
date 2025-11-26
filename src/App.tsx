import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import VenueDetailPage from "./pages/VenueDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import BookingPage from "./pages/BookingPage";
import ManagerVenuesPage from "./pages/ManagerVenuesPage";
import CreateVenuePage from "./pages/CreateVenuePage";
import EditVenuePage from "./pages/EditVenuePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/venues/:id" element={<VenueDetailPage />} />
          <Route path="/venues/:id/book" element={<BookingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/manager/venues" element={<ManagerVenuesPage />} />
          <Route path="/manager/venues/create" element={<CreateVenuePage />} />
          <Route path="/manager/venues/:id/edit" element={<EditVenuePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
