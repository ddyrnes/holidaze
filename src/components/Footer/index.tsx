import * as S from "./Footer.styles";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <S.FooterWrapper>
      <S.FooterContent>
        <S.FooterGrid>
          <S.FooterBrand>
            <h3>Holidaze</h3>
            <p>
              Find your perfect getaway. Browse thousands of unique venues worldwide and book your dream vacation with ease.
            </p>
          </S.FooterBrand>

          <S.FooterColumn>
            <h4>Explore</h4>
            <S.FooterLinks>
              <li><S.FooterLink to="/">Home</S.FooterLink></li>
              <li><S.FooterLink to="/">Browse Venues</S.FooterLink></li>
              <li><S.FooterLink to="/login">Login</S.FooterLink></li>
              <li><S.FooterLink to="/register">Register</S.FooterLink></li>
            </S.FooterLinks>
          </S.FooterColumn>

          <S.FooterColumn>
            <h4>Follow Us</h4>
            <S.SocialLinks>
              <S.SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </S.SocialLink>
              <S.SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </S.SocialLink>
              <S.SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </S.SocialLink>
            </S.SocialLinks>
          </S.FooterColumn>
        </S.FooterGrid>

        <S.FooterBottom>
          <S.Copyright>&copy; {currentYear} Holidaze. All rights reserved.</S.Copyright>
          <S.Credit>Created by Daniel Dyrnes</S.Credit>
        </S.FooterBottom>
      </S.FooterContent>
    </S.FooterWrapper>
  );
}

export default Footer;
