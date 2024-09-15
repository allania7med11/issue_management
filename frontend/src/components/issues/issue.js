export const Issue = ({ issue }) => {
    return (
        <div className="issue">
            <div className="title">{issue.title}</div>
            <div className="description">{issue.description}</div>
        </div>
    )
}