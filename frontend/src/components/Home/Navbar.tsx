// import { Link } from "react-router-dom"
import logoButtom from "/svg/arrow-bottom.svg";
import { useEffect, useContext } from "react";
import { Link, Events, animateScroll as scroll, scrollSpy } from "react-scroll";
import { UserContext } from "@/contexts/api-get/UserContext";
import Logout from "@/components/auth/Logout";
import { AuthProvider } from "@/middleware/useAuth";
import { LuLogIn } from "react-icons/lu";

const Navbar = () => {
  const userContext = useContext(UserContext);
  useEffect(() => {
    scrollSpy.update();
    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);
  const handleSetActive = (to: unknown) => {
    // setActiveSection(to);
    console.log(to);
  };
  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  //   const activeLinkStyles = {
  //     borderBottom: "3px solid blue", // Change to your desired underline color
  //   };
  return (
    <AuthProvider>
      <div className="laptop:h-[90px] w-full bg-secondary px-[67px] fixed z-[100] flex items-center justify-between">
        <div className="text-[32px] font-extrabold text-primary">
          <a className="cursor-pointer" onClick={scrollToTop}>
            Calendoo
          </a>
        </div>
        <div className="flex">
          <ul className="flex text-primary items-center text-[24px] font-bold gap-[52px]">
            <li className="cursor-pointer focus:border-b-primary focus:border-b">
              <Link
                activeClass="active"
                to="home"
                spy={true}
                smooth={true}
                offset={10}
                duration={500}
                onSetActive={handleSetActive}
                // style={activeSection === "home" ? activeLinkStyles : {}}
              >
                Home
              </Link>
            </li>
            <li className="cursor-pointer focus:border-b-primary focus:border-b">
              <Link
                activeClass="active"
                to="about"
                spy={true}
                smooth={true}
                offset={-120}
                duration={500}
                onSetActive={handleSetActive}
                // style={activeSection === "about" ? activeLinkStyles : {}}
              >
                About
              </Link>
            </li>
            <li className="cursor-pointer focus:border-b-primary focus:border-b">
              <Link
                activeClass="active"
                to="contacts"
                spy={true}
                smooth={true}
                offset={10}
                duration={500}
                onSetActive={handleSetActive}
                // style={activeSection === "contacts" ? activeLinkStyles : {}}
              >
                Contact
              </Link>
            </li>

            {userContext.user ? (
              <>
                <li>
                  <details className="dropdown">
                    <summary className="btn border-none text-primary text-[24px] bg-transparent mx-[-15px]">
                      Project <img src={logoButtom} alt="" />
                    </summary>
                    <ul className="p-2 shadow menu text-secondary bg-primary dropdown-content z-[1] rounded-box w-[150px]">
                      <li className="hover:bg-hover transition-all">
                        <a href="/notes">Notes</a>
                      </li>
                      <li className="hover:bg-hover transition-all">
                        <a href="/project">Project Tasks</a>
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <div className="dropdown">
                    <div
                      tabIndex={0}
                      role="button"
                      className="mt-3 flex items-center gap-3 bg-transparent"
                    >
                      {userContext.user?.profile ? (
                        <>
                          <img
                            src={userContext.user?.profile}
                            className="h-[40px] w-[40px] rounded-[50%] bg-primary"
                            alt="User Avatar"
                          ></img>
                          <p className="text-primary text-[16px]">
                            {userContext.user?.username}
                          </p>
                          <img src={logoButtom} alt="" />
                        </>
                      ) : (
                        <p className="text-primary mb-3 flex gap-2">
                          {userContext.user?.username}
                          <img src={logoButtom} alt="" />
                        </p>
                      )}
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content text-lg hover:bg-hover transition-all z-[1] mt-2 menu p-2 text-secondary border border-collapse border-secondary shadow bg-base-100 rounded-box w-[150px]"
                    >
                      <li>
                        <Logout />
                      </li>
                    </ul>
                  </div>
                </li>
              </>
            ) : (
              <a href="/auth" className="flex items-center gap-3">
                Login
                <LuLogIn />
              </a>
            )}
          </ul>
        </div>
      </div>
    </AuthProvider>
  );
};

export default Navbar;
