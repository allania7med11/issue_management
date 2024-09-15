import { useState } from "react";
import { updateIssue, deleteIssue} from "../../api/issues/index.js"

export const Issue = ({ issue, setIssues }) => {
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState(issue.title)
    const [description, setDescription] = useState(issue.description)
    const dlt = async () => {
        let id = issue.id
        await deleteIssue(id);
        setIssues((prev) => prev.filter(isu => isu.id != id))
    }
    const update = async () => {
        if(!edit){
            setTitle(issue.title)
            setDescription(issue.description)
            setEdit(true)
            return
        }
        const obj = {
            id: issue.id,
            title: title,
            description: description,
        }
        let updatedIssue = await updateIssue(obj)
        setEdit(false)
        setIssues((prev) => prev.map(isu => isu.id == updatedIssue.id ? updatedIssue : isu))
    }
    return (
        <div className="issue">
            {!edit && <>
                <div className="title">{issue.title}</div>
                <div className="description">{issue.description}</div>
            </>}
            {edit && <>
                <label>
                    Title
                    <input name="title" value={title} onChange={e => setTitle(e.target.value)} required />
                </label>
                <label>
                    Description
                    <input name="description" value={description} onChange={e => setDescription(e.target.value)} required />
                </label>
            </>}
            <div className="action">
                <button onClick={update}>{edit ? "Submit" : "Edit"}</button>
                <button onClick={dlt}>Delete</button>
            </div>
        </div>
    )
}