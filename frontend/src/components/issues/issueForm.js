import { useState } from "react";
import { createIssue } from "../../api/issues/index.js"

export const IssueForm = ({ setIssues }) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    async function handleSubmit(e) {
        e.preventDefault();
        const issue = {
            title: title,
            description: description,
        }
        let newIssue = await createIssue(issue)
        setIssues((prev) => [newIssue, ...prev])
        setTitle("")
        setDescription("")
    }
    return (
        <form onSubmit={handleSubmit} className="issue-form">
            <label>
                Title
                <input name="title" value={title} onChange={e => setTitle(e.target.value)} required />
            </label>
            <label>
                Description
                <input name="description" value={description} onChange={e => setDescription(e.target.value)} required />
            </label>
            <button type="submit">Create</button>
        </form>
    )
}