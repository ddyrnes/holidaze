import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { showSuccess } from "../../utils/toast";
import * as S from "./Header.styles";

function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    showSuccess("You have been logged out");
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <S.HeaderWrapper>
      <S.Nav>
        <S.Logo to="/" onClick={closeMobileMenu}>
          <h1>Holidaze</h1>
        </S.Logo>

        <S.MobileControls>
          {isAuthenticated && (
            <S.MobileAvatar to="/profile" onClick={closeMobileMenu}>
              {user?.avatar?.url ? (
                <img src={user.avatar.url} alt={user.avatar.alt || user.name} />
              ) : (
                user?.name?.charAt(0).toUpperCase()
              )}
            </S.MobileAvatar>
          )}
          <S.HamburgerButton
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </S.HamburgerButton>
        </S.MobileControls>

        <S.MobileMenuWrapper $isOpen={isMobileMenuOpen}>
          <S.MobileMenuContent>
            <S.MobileNavList>
              <li>
                <S.MobileNavLink to="/" onClick={closeMobileMenu}>Home</S.MobileNavLink>
              </li>
              {isAuthenticated && (
                <li>
                  <S.MobileNavLink to="/profile" onClick={closeMobileMenu}>Profile</S.MobileNavLink>
                </li>
              )}
              {isAuthenticated && user?.venueManager && (
                <li>
                  <S.MobileNavLink to="/manager/venues" onClick={closeMobileMenu}>My Venues</S.MobileNavLink>
                </li>
              )}
            </S.MobileNavList>

            <S.MobileDivider />

            {isAuthenticated ? (
              <S.MobileUserSection>
                <S.MobileUserInfo>
                  <S.MobileUserAvatar>
                    {user?.avatar?.url ? (
                      <img src={user.avatar.url} alt={user.avatar.alt || user.name} />
                    ) : (
                      user?.name?.charAt(0).toUpperCase()
                    )}
                  </S.MobileUserAvatar>
                  {user?.name}
                </S.MobileUserInfo>
                <S.MobileLogoutButton onClick={handleLogout}>Logout</S.MobileLogoutButton>
              </S.MobileUserSection>
            ) : (
              <S.MobileAuthSection>
                <S.MobileAuthLink to="/login" onClick={closeMobileMenu}>Login</S.MobileAuthLink>
                <S.MobileAuthButton to="/register" onClick={closeMobileMenu}>Register</S.MobileAuthButton>
              </S.MobileAuthSection>
            )}
          </S.MobileMenuContent>
        </S.MobileMenuWrapper>

        <S.DesktopMenu>
          <S.NavList>
            <li>
              <S.NavLink to="/">Home</S.NavLink>
            </li>
            {isAuthenticated && user?.venueManager && (
              <li>
                <S.NavLink to="/manager/venues">My Venues</S.NavLink>
              </li>
            )}
          </S.NavList>

          {isAuthenticated ? (
            <>
              <S.Divider />
              <S.UserLink to="/profile">
                <S.UserAvatar>
                  {user?.avatar?.url ? (
                    <img src={user.avatar.url} alt={user.avatar.alt || user.name} />
                  ) : (
                    user?.name?.charAt(0).toUpperCase()
                  )}
                </S.UserAvatar>
                <S.UserName>{user?.name}</S.UserName>
              </S.UserLink>
              <S.LogoutButton onClick={handleLogout}>Logout</S.LogoutButton>
            </>
          ) : (
            <>
              <S.Divider />
              <S.AuthLink to="/login">Login</S.AuthLink>
              <S.AuthButton to="/register">Register</S.AuthButton>
            </>
          )}
        </S.DesktopMenu>
      </S.Nav>
    </S.HeaderWrapper>
  );
}

export default Header;
