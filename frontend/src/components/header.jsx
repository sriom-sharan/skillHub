import { Link } from "react-router-dom";
import { AuthContext } from "./authContext";
import { useContext, useEffect, useState } from "react";
import Profile from "./avatar";
import { ModeToggle } from "./partials/dark-light-button";

const Header = () => {
  const { isLoggedin } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`
        fixed top-0 left-0 z-50 w-full
        px-4 md:px-8 xl:px-0
        transition-all duration-300
        ${
          scrolled
            ? "border-b border-border bg-background/95 shadow-sm backdrop-blur-md"
            : "bg-background/80 backdrop-blur-sm"
        }
      `}
    >
      <div className="mx-auto max-w-screen-xl">
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center"
              aria-label="SkillHub Home"
            >
              <h1 className="poppins-semibold text-2xl tracking-tighter ">
                <span className="text-purple-500 ">Skill</span>
                <span className="text-foreground">Hub</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-10">
            <nav aria-label="Global">
              <ul className="flex items-center gap-7 poppins-regular text-sm">
                <li>
                  <Link
                    className="
                      text-foreground
                      transition-colors
                      hover:text-foreground
                    "
                    to="/about"
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    className="
                      text-foreground
                      transition-colors
                      hover:text-foreground
                    "
                    to="/courses"
                  >
                    Courses
                  </Link>
                </li>

                {/* <li>
                  <Link
                    className="
                      text-muted-foreground
                      transition-colors
                      hover:text-foreground
                    "
                    to="/projects"
                  >
                    Projects
                  </Link>
                </li> */}
              </ul>
            </nav>

            {/* Authentication */}
            <div className="flex items-center gap-4">
              {!isLoggedin ? (
                <div className="flex items-center gap-2">
                  <Link
                    className="
                      rounded-md px-4 py-2.5
                      poppins-medium text-sm
                      text-foreground
                      transition-colors
                      hover:bg-accent
                    "
                    to="/login"
                  >
                    Login
                  </Link>

                  <Link
                    className="
                      rounded-full
                      main-gradient
                      px-6 py-2
                      poppins-bold
                      text-sm text-white
                      shadow-sm
                      transition-opacity
                      hover:opacity-90
                    "
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <Profile />
              )}

              <ModeToggle />
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 md:hidden">
            <ModeToggle />

            {!isLoggedin && (
              <Link
                to="/login"
                className="
                  hidden sm:inline-flex
                  rounded-md px-3 py-2
                  poppins-medium text-sm
                  text-foreground
                  hover:bg-accent
                "
              >
                Login
              </Link>
            )}

            {isLoggedin && <Profile />}

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="
                rounded-md border border-border
                bg-background
                p-2
                text-foreground
                transition-colors
                hover:bg-accent
              "
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav
            aria-label="Mobile navigation"
            className="
              border-t border-border
              bg-background
              py-5
              md:hidden
            "
          >
            <ul className="flex flex-col items-center gap-5 poppins-regular text-sm">

              <li>
                <Link
                  onClick={closeMenu}
                  className="
                    text-muted-foreground
                    transition-colors
                    hover:text-foreground
                  "
                  to="/about"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  onClick={closeMenu}
                  className="
                    text-muted-foreground
                    transition-colors
                    hover:text-foreground
                  "
                  to="/courses"
                >
                  Courses
                </Link>
              </li>

              {/* <li>
                <Link
                  onClick={closeMenu}
                  className="
                    text-muted-foreground
                    transition-colors
                    hover:text-foreground
                  "
                  to="/projects"
                >
                  Projects
                </Link>
              </li> */}

              {!isLoggedin && (
                <li className="sm:hidden">
                  <Link
                    onClick={closeMenu}
                    className="
                      rounded-full
                      main-gradient
                      px-6 py-2
                      poppins-bold
                      text-sm text-white
                    "
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
