'use client'
import styles from "./page.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsSpin } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { useEffect } from "react";
import { thunkGetUsers } from "./redux/users";

export default function Home() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.data)

  useEffect(() => {
    dispatch(thunkGetUsers())
  }, [])

  async function sendEmail() {
    const subject = "TEST"
    const body = 'Another test'
    const to = 'nicholas.brooks@aya.yale.edu'
    try {
      await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ subject, body, to })
      })
    } catch (e) {
      console.error(e);
    }
  }



  return (
    <main className={styles.main}>
      <div className={styles.title_divider} />
      <div className={styles.nav_buttons}>
        <Link href='/party_a'><div className="button-light">Party A</div></Link>
        <div className="button-dark" onClick={sendEmail}><FontAwesomeIcon icon={faArrowsSpin} /> Send Email</div>
        <Link href='/party_b'><div className="button-light">Party B</div></Link>
      </div>
      {users && users.map((user: any) => (
        <div key={user.id}>{user.email}</div>
      ))}
    </main>
  );
}
