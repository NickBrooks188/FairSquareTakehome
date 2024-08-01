'use client'
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faChartSimple } from "@fortawesome/free-solid-svg-icons";
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


  // Load users and templates, in a full application these would be loaded from a backend, but here we just use the hardcoded data
  useEffect(() => {
    dispatch(thunkGetUsers())
    dispatch(thunkGetTemplates())

  }, [])

  // Send email to selected recipient
  async function sendEmail() {
    const newIndex = Object.keys(templates).length + 1
    let tag = newIndex
    const to = selectedEmail
    // Check if the email is a combination of a subject and body (i.e., template) that already exists
    if (combinations[subject]) {
      if (combinations[subject][body]) {
        tag = combinations[subject][body]
      }
    }
    if (to === '') {
      return
    }
    // If this is a new template, add it to the store
    if (tag === newIndex) {
      dispatch(addTemplate({ subject, body, id: tag }))
    }
    // Send the request - we need to use Net.js's built in API functionality since Postmark won't accept requests directly from the frontend
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

  // Get stats for the selected template, or all emails if no template is selected
  const getStats = async () => {
    const tag = selectedTemplate
    let statsData, opensData
    // Fetch stats
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
    // Fetch opens
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
    // Only display data if both requests were successful
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
            className={clsx(styles.option, { [styles.selected_email]: selectedEmail === user.email })}
            onClick={() => setSelectedEmail(user.email)}>{user.email}
          </div>
        ))}
      </div>
      <div className={styles.input_wrapper}>
        <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <textarea placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
      </div>
      <div className={styles.nav_buttons}>
        <button className="button-dark" onClick={sendEmail} disabled={(!selectedEmail || !subject || !body)} ><FontAwesomeIcon icon={faPaperPlane} /> Send Email</button>
      </div>
      <div className={styles.title_divider} />
      <div>Filter by template:</div>
      <div className={styles.options_wrapper}>
        <div
          className={clsx(styles.option, { [styles.selected_email]: selectedTemplate === "All" })}
          onClick={() => setSelectedTemplate('All')}>All</div>
        {templates && Object.values(templates).map((template: any) => (
          <div key={template.id}
            title={template.subject}
            className={clsx(styles.option, { [styles.selected_email]: selectedTemplate === template.id })}
            onClick={() => setSelectedTemplate(template.id)}>{template.id}
          </div>
        ))}
      </div>
      <div className="button-light" onClick={getStats}><FontAwesomeIcon icon={faChartSimple} /> Get Stats</div>
      <div className={styles.stats_grid}>
        <div>Opens:</div><div> {opens} {`(${total > 0 ? (100 * opens / total).toFixed(0) : 0}%)`}</div>
        <div>Clicks:</div><div> {clicks} {`(${total > 0 ? (100 * clicks / total).toFixed(0) : 0}%)`}</div>
        <div>Total sent:</div><div> {total}</div>
      </div>
    </main>
  );
}
