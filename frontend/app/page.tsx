'use client'
import styles from "./page.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsSpin, faPaperPlane, faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { useEffect, useState } from "react";
import { thunkGetUsers } from "./redux/users";
import clsx from "clsx";
import { thunkGetTemplates, addTemplate } from "./redux/templates";

export default function Home() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.data)
  const templates = useAppSelector(state => state.templates.data)
  const combinations = useAppSelector(state => state.templates.combinations)

  const [selectedEmail, setSelectedEmail] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('All')

  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  const [opens, setOpens] = useState(0)
  const [clicks, setClicks] = useState(0)
  const [total, setTotal] = useState(0)


  useEffect(() => {
    dispatch(thunkGetUsers())
    dispatch(thunkGetTemplates())

  }, [])

  async function sendEmail() {
    let tag = Object.keys(templates).length
    const to = selectedEmail
    console.log(combinations)
    if (combinations[subject]) {
      if (combinations[subject][body]) {
        tag = combinations[subject][body]
      }
    } else {
      dispatch(addTemplate({ subject, body, id: tag }))
    }
    if (to === '') {
      return
    }
    try {
      await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ subject, body, to, tag })
      })
    } catch (e) {
      console.error(e);
    }
  }

  const getStats = async () => {
    const tag = selectedTemplate
    let statsData, opensData
    try {
      const res = await fetch('/api/stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tag })
      })
      statsData = await res.json()
    } catch (e) {
      console.error(e);
      return
    }
    try {
      const res = await fetch('/api/opens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tag })
      })
      opensData = await res.json()
    } catch (e) {
      console.error(e);
      return
    }
    setTotal(statsData.Sent)
    setClicks(statsData.TotalClicks)
    setOpens(opensData.TotalCount)
  }


  return (
    <main className={styles.main}>
      <div>Recipient:</div>
      <div className={styles.options_wrapper}>

        {users && Object.values(users).map((user: any) => (
          <div key={user.id}
            className={clsx({ [styles.selected_email]: selectedEmail === user.email })}
            onClick={() => setSelectedEmail(user.email)}>{user.email}
          </div>
        ))}
      </div>
      <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <textarea placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
      <div className={styles.nav_buttons}>
        <div className="button-dark" onClick={sendEmail}><FontAwesomeIcon icon={faPaperPlane} /> Send Email</div>

      </div>
      <div className={styles.title_divider} />
      <div>Selected template:</div>
      <div className={styles.options_wrapper}>
        <div
          className={clsx({ [styles.selected_email]: selectedTemplate === "All" })}
          onClick={() => setSelectedTemplate('All')}>All</div>
        {templates && Object.values(templates).map((template: any) => (
          <div key={template.id}
            className={clsx({ [styles.selected_email]: selectedTemplate === template.id })}
            onClick={() => setSelectedTemplate(template.id)}>{template.id}
          </div>
        ))}
      </div>
      <div className="button-light" onClick={getStats}><FontAwesomeIcon icon={faChartSimple} /> Get Stats</div>
      <div>
        <div>Opens: {opens} {`(${total > 0 ? (opens / total) : 0}%)`}</div>
        <div>Clicks: {clicks} {`(${total > 0 ? (clicks / total) : 0}%)`}</div>
        <div>Total sent: {total}</div>
      </div>
    </main>
  );
}
