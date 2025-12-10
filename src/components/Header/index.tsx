import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { showSuccess } from "../../utils/toast";
import * as S from "./Header.styles";

function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showSuccess("You have been logged out");
    navigate("/");
  };

  return (
    <S.HeaderWrapper>
      <S.Nav>
        <S.Logo to="/">
          <h1>Holidaze</h1>
        </S.Logo>
        <S.NavList>
          <li>
            <S.NavLink to="/">Home</S.NavLink>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <S.NavLink to="/profile">Profile</S.NavLink>
              </li>
              {user?.venueManager && (
                <li>
                  <S.NavLink to="/manager/venues">My Venues</S.NavLink>
                </li>
              )}
              <li>
                <S.UserName>{user?.name}</S.UserName>
              </li>
              <li>
                <S.LogoutButton onClick={handleLogout}>Logout</S.LogoutButton>
              </li>
            </>
          ) : (
            <>
              <li>
                <S.NavLink to="/login">Login</S.NavLink>
              </li>
              <li>
                <S.NavLink to="/register">Register</S.NavLink>
              </li>
            </>
          )}
        </S.NavList>
      </S.Nav>
    </S.HeaderWrapper>
  );
}

export default Header;
