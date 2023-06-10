import Link from "next/link";
import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-10 py-8 px-[7%]">
      <span className="text-base sm:text-start text-center text-gray-800">
        © 2023 Created by{" "}
        <Link
          href="https://www.linkedin.com/in/rudy-genave/"
          target="_blank"
          className="text-slate-800 underline underline-offset-4 font-semibold"
        >
          Rudy Genave
        </Link>{" "}
        | All Rights Reserved.
      </span>
      <ul className="flex items-center gap-10">
        <li>
          <Link
            href="https://www.facebook.com/rudy.genave.9/"
            target="_blank"
            className="text-xl text-slate-800"
          >
            <BsFacebook className="transition duration-300 hover:-translate-y-1" />
          </Link>
        </li>
        <li>
          <Link
            href="https://www.instagram.com/rudy.gnve/"
            target="_blank"
            className="text-xl text-slate-800"
          >
            <BsInstagram className="transition duration-300 hover:-translate-y-1" />
          </Link>
        </li>
        <li>
          <Link
            href="https://www.linkedin.com/in/rudy-genave/"
            target="_blank"
            className="text-xl text-slate-800"
          >
            <BsLinkedin className="transition duration-300 hover:-translate-y-1" />
          </Link>
        </li>
        <li>
          <Link
            href="https://github.com/rudygnve/"
            target="_blank"
            className="text-xl text-slate-800"
          >
            <BsGithub className="transition duration-300 hover:-translate-y-1" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
