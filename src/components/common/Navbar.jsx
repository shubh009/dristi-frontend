import { useState } from "react";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiMenu3Line,
  RiCloseLine,
  RiLoginBoxLine,
} from "react-icons/ri";
import logo from "../../assets/img/logo.jpeg";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleServices = () => setIsServicesOpen(!isServicesOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Dristi Eye Care Logo"
            className="h-16 w-auto object-contain"
          />
          <span className="text-3xl font-extrabold text-black w-100 leading-none">
            Dristi <br />
            Eye Care
          </span>{" "}
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li>
            <Link to="/" className="hover:text-teal-700 transition">
              Home
            </Link>
          </li>

          {/* Services Dropdown */}
          <li className="relative">
            <a
              onClick={toggleServices}
              className="flex items-center hover:text-teal-700 transition focus:outline-none"
            >
              Services
              {isServicesOpen ? (
                <RiArrowUpSLine className="ml-1 text-lg" />
              ) : (
                <RiArrowDownSLine className="ml-1 text-lg" />
              )}
            </a>

            {isServicesOpen && (
              <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg w-60 text-gray-700 border border-gray-100 ">
                <li>
                  <Link
                    to="/services/eye-checkup"
                    className="block px-4 py-2 hover:bg-teal-50 hover:text-teal-700 border-b"
                  >
                    Eye Checkup
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/laser-surgery"
                    className="block px-4 py-2 hover:bg-teal-50 hover:text-teal-700 border-b"
                  >
                    Laser Surgery
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/cataract"
                    className="block px-4 py-2 hover:bg-teal-50 hover:text-teal-700 border-b"
                  >
                    Cataract Treatment
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/contact-lens"
                    className="block px-4 py-2 hover:bg-teal-50 hover:text-teal-700 border-b"
                  >
                    Contact Lens Fitting
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link to="/about" className="hover:text-teal-700 transition ">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-teal-700 transition ">
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="hover:text-teal-700 transition bg-secondary px-6 py-1 rounded-full text-black"
            >
              <RiLoginBoxLine className="inline" /> Login
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-teal-700 focus:outline-none"
        >
          {isMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-100">
          <ul className="flex flex-col px-6 py-4 space-y-4 text-gray-700 font-medium">
            <li>
              <Link to="/" className="hover:text-teal-700" onClick={toggleMenu}>
                Home
              </Link>
            </li>

            {/* Services Dropdown (Mobile) */}
            <li>
              <a
                onClick={toggleServices}
                className="flex items-center w-full text-left hover:text-teal-700"
              >
                Services
                {isServicesOpen ? (
                  <RiArrowUpSLine className="ml-1 text-lg" />
                ) : (
                  <RiArrowDownSLine className="ml-1 text-lg" />
                )}
              </a>

              {isServicesOpen && (
                <ul className="pl-4 mt-2 space-y-2 text-gray-600">
                  <li>
                    <Link
                      to="/services/eye-checkup"
                      onClick={toggleMenu}
                      className="block hover:text-teal-700"
                    >
                      Eye Checkup
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services/laser-surgery"
                      onClick={toggleMenu}
                      className="block hover:text-teal-700"
                    >
                      Laser Surgery
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services/cataract"
                      onClick={toggleMenu}
                      className="block hover:text-teal-700"
                    >
                      Cataract Treatment
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services/contact-lens"
                      onClick={toggleMenu}
                      className="block hover:text-teal-700"
                    >
                      Contact Lens Fitting
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link
                to="/about"
                onClick={toggleMenu}
                className="hover:text-teal-700"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={toggleMenu}
                className="hover:text-teal-700"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
