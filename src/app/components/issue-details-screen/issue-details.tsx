/* eslint-disable @next/next/no-img-element */
import { sampleData } from "@/app/data/sample";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./styles/issue-details.module.scss";
import { useRouter } from "next/router";
import { Issue } from "../list-issues-screen/types";

export default function IssueDetails() {
  const params = useParams();
  const [issueDetails, setIssueDetails] = useState<Issue>();
  const router = useRouter();

  useEffect(() => {
    if (params?.id) {
      const issueDetailsFromSampleData = sampleData.find(
        (issue) => issue.id == +params.id
      );
      setIssueDetails(issueDetailsFromSampleData);
    }
  }, [params?.id]);

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.backButton} onClick={handleBackClick}>
        ← Back to Issues
      </button>
      <h2 className={styles.title}>Issue Details</h2>
      <table className={styles.detailsTable}>
        <tbody>
          <tr>
            <th>Id</th>
            <td>{issueDetails?.id}</td>
          </tr>
          <tr>
            <th>Code Snippet</th>
            <td>
              <pre>{issueDetails?.codeSnippet}</pre>
            </td>
          </tr>
          <tr>
            <th>Component</th>
            <td>{issueDetails?.component}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{issueDetails?.description}</td>
          </tr>
          <tr>
            <th>Issue Type</th>
            <td>{issueDetails?.issueType}</td>
          </tr>
          <tr>
            <th>Severity</th>
            <td>{issueDetails?.severity}</td>
          </tr>
          <tr>
            <th>Selector</th>
            <td>{issueDetails?.selector}</td>
          </tr>
          <tr>
            <th>Screenshot</th>
            <img
              src={issueDetails?.screenshot as string}
              alt="screenshot"
              className={styles.screenshot}
            />
          </tr>
          <tr>
            <th>URL</th>
            <td>{issueDetails?.url}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
