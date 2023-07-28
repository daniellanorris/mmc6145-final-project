import React from "react";
import * as styles from '../public/styles/headerfooter.module.css'
import Image from "next/image";


export default function Header() {
    return (
        <>
            <div className={`${styles.headerfooterbg} ${styles.config}`}>
                <Image href="/" width="100" height="100" src="/LOGO-white.png" className={styles.autoheightimg} alt="logo"/>
            </div>
        </>
    )


}