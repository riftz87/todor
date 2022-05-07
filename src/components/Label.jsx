function Label(props) {
    return (
        <div className={`opacity-50 ${props.className}`}>
            { props.text }
        </div>
    )
}

export default Label;