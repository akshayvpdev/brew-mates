"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

function Header() {
  const path = usePathname();
  console.log(path);
  const links = [
    { href: "/list-friends", text: "connections" },
    { href: "/chatroom", text: "Messages" },
  ];
  return (
    <>
      <header className="header-section">
        <div className="header-none fixed-top">
          <div id="header-sticky" className="demo-header small-menu menu-area">
            {/* <div className="logo-text text-texture">
              <a href="/dashboard">
                <h1>A</h1>
              </a>
            </div> */}
            <div className={styles.sideNavbar}>
              <div className={styles.middleLeft}>
                <Link href={'/dashboard'}>
                <img
                  src="/brandlogo.png"
                  alt="Your Photo"
                  className={styles.photo}
                />
                </Link>
   
              </div>
              {/* <div className={styles.rightBottom}>
                <a href="#" className={styles.link}>
                  Link 1
                </a>
                <a href="#" className={styles.link}>
                  Link 2
                </a>
              </div> */}
            </div>
          </div>
          <div className="">
            <ul className="ml-5 nav flex">
              {links.map((link, key) => (
                <li key={key}>
                  <div>
                    <Link
                      className={`${
                        link.href === path.replace(/^\//, "")
                          ? "text-gray-300"
                          : "hover:text-gray-300"
                      }`}
                      href={link.href}>
                      {link.text}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <nav role="navigation" className="d-block d-xl-none">
          <div id="menuToggle" className>
            <input type="checkbox" />
            <div className="mobile-menu mainmenu" id="mobile-menu">
              <ul id="nav">
                <li>
                  <a href="#home">
                    <i className="las la-home" />
                  </a>
                </li>
                <li>
                  <a href="#about">
                    <i className="las la-address-book" />
                  </a>
                </li>
                <li>
                  <a href="#portfolio">
                    <i className="las la-briefcase" />
                  </a>
                </li>
                <li>
                  <a href="#client">
                    <i className="las la-exchange-alt" />
                  </a>
                </li>
                <li>
                  <a href="#blog">
                    <i className="las la-blog" />
                  </a>
                </li>
                <li>
                  <a href="#contact">
                    <i className="las la-comments" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
