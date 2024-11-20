"use client";

import styles from "./SettingsAccount.module.scss";
import NavTabs from "@/components/Tabs/Tabs";

function Settings() {
  return (
    <section className={styles.settings_account_wrapper}>
      <div className={styles.account_table}>
        <NavTabs />
      </div>
    </section>
  );
}

export default Settings;
