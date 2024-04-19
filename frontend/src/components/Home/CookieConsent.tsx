import CookieConsent from "react-cookie-consent";

export const CookieConsents = () => {
  return (
    <CookieConsent
    //   acceptOnScroll={true}
    //   acceptOnScrollPercentage={50}
    
      location="bottom"
      buttonText="Accept"
      cookieName="usercookie"
      style={{ background: "#2B373B", padding: "20px 40px", transitionDelay: "2s"}}
      buttonStyle={{ color: "#4e503b", fontSize: "22px" }}
      expires={1}
      //   cookieValue={}
    >
      We uses cookies to enhance the user experience. By using our website. you
      agree to our use of cookies.{" "}
      <a href="https://www.cookiepro.com/knowledge/cookie-policy-vs-privacy-policy/" style={{ fontSize: "16px", fontWeight: "bold" }}>
        <u>Learn more.</u>
      </a>
    </CookieConsent>
  );
};
