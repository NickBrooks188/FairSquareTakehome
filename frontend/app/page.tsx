'use client'
import styles from "./page.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsSpin } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { useEffect, useState } from "react";
import { thunkGetUsers } from "./redux/users";

export default function Home() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.data)
  const [selectedEmail, setSelectedEmail] = useState('')

  useEffect(() => {
    dispatch(thunkGetUsers())
  }, [])

  async function sendEmail() {
    const subject = "TEST"
    const body = selectedEmail
    const to = selectedEmail
    if (to === '') {
      return
    }
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

  const getOpens = async () => {
    try {
      const res = await fetch('/api/opens', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data = await res.json()
      console.log(data)
    } catch (e) {
      console.error(e);
    }
  }

  const getStats = async () => {
    try {
      const res = await fetch('/api/stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data = await res.json()
      console.log(data)
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
        <div className="button-light" onClick={getOpens}><FontAwesomeIcon icon={faArrowsSpin} /> Get Opens</div>
        <div className="button-light" onClick={getStats}><FontAwesomeIcon icon={faArrowsSpin} /> Get Stats</div>

        <Link href='/party_b'><div className="button-light">Party B</div></Link>
      </div>
      <div>Selected email: {selectedEmail}</div>
      {users && users.map((user: any) => (
        <div key={user.id} onClick={() => setSelectedEmail(user.email)}>{user.email}</div>
      ))}
    </main>
  );
}
