import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const Navigate = useNavigate();

  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-40 text-sm">
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li
              className="cursor-pointer hover:underline"
              onClick={() => Navigate("/")}
            >
              Home
            </li>
            <li
              className="cursor-pointer hover:underline"
              onClick={() => Navigate("/about")}
            >
              About Us
            </li>
            <li
              className="cursor-pointer hover:underline"
              onClick={() => Navigate("/contact")}
            >
              Contact Us
            </li>
            <li
              className="cursor-pointer hover:underline"
              onClick={() => Navigate("/")}
            >
              Privacy Policy
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">Get In Touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+0-000-000-000</li>
            <li>example@mail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr className="border-gray-300" />
        <p className="py-5 text-sm text-center">
          Copyright {new Date().getFullYear()}@ Prescripto - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
