'use client'
import styles from "./page.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsSpin } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { useEffect } from "react";
import { thunkGetUsers } from "./redux/users";
import { Client } from "postmark"


export default function Home() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.data)
  const postmarkClient = new Client(process.env.NEXT_PUBLIC_POSTMARK_SERVER_TOKEN || '');

  useEffect(() => {
    dispatch(thunkGetUsers())
  }, [])

  const sendEmail = async () => {
    console.log("Here")

    const emailData = {
      From: 'nicholas.brooks@aya.yale.edu',
      To: 'nicholas.brooks@aya.yale.edu',
      Subject: "Hello",
      HtmlBody: "Test",
    };

    try {
      const result = await postmarkClient.sendEmail(emailData);
      console.log('Email sent successfully!');
      return result;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
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
