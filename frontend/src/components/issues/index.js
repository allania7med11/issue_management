import { useEffect, useState } from 'react';
import "./styles.css"
import { getIssues } from "../../api/issues/index.js"
import { Issue } from "./issue.js"
import { IssueForm } from "./issueForm.js"



export const Issues = () => {
    let [issues, setIssues] = useState([])
    let [error, setError] = useState("")
    useEffect(() => {
        const updateIssues = async () => {
            try {
                setError("")
                const arr = await getIssues();
                setIssues(arr)
            } catch (error) {
                console.error(error);
                setError(error.message)
            }
        }
        updateIssues()
    }, [])
    return (
        <div className='issues'>
            <div className='error'>{error}</div>
            <IssueForm setIssues={setIssues} />
            <div className='issues-sections'>
                <div className='issues-sections'>
                    <div className='issues-section'>
                        <div className='issues-section-title'>Issues</div>
                        <div className='issues-container'>
                            {issues.map((issue, index) => <Issue key={index} issue={issue} setIssues={setIssues} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}