"use client";
import React from "react";
import Logo from "ADD YOUR OWN LOGO";
import { UserButton, useUser } from "@clerk/nextjs";
import styles from "@/app/styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";

const Hader = ({ setSearchQuery, onOpenGenerateModal }) => {
  const { user, isLoaded } = useUser();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section className={styles.header}>
      <section className={styles.logo}>
        <Link href="/">
          {/* ADD YOUR OWN LOGO */}
          <Image src={Logo} alt="Logo" width={150} />
        </Link>
      </section>
      <section className={styles.nav}>
        <section className={styles.nav_items}>
          <Link href="/generated" className={styles.link}>
            <p>Generated</p>
          </Link>
          <Link href="/generated" className={styles.link}>
            <p>Liked</p>
          </Link>
          <Link href="/generated" className={styles.link}>
            <p>Profile</p>
          </Link>
        </section>
        <section className={styles.searchSection}>
          <div className={styles.searchContainer}>
            <search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search for image"
              className={styles.inputField}
              onChange={handleSearchChange}
            />
          </div>
        </section>

        <section>
          {isLoaded && user && (
            <div className={styles.user_button}>
              <button
                onClick={() => onOpenGenerateModal()}
                className={styles.generate_btn}
              >
                GENERATE
              </button>

              <UserButton afterSignOutUrl="/" />
            </div>
          )}
        </section>
      </section>
    </section>
  );
};

export default Hader;
