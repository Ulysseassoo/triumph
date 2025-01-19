interface Props{
    text: string;
    backgroundColor?: string;
    color?: string;
    fontSize?: string;
    borderRadius?: string;
}
function Badge(props: Props) {
    const text = props.text ?? "New";
    const style = {
        display: "inline-block",
        backgroundColor: props.backgroundColor ?? "red",
        color: props.color ?? "white",
        padding: "2px 8px",
        fontSize: props.fontSize ?? "12px",
        fontWeight: "bold",
        borderRadius: props.borderRadius ?? "12px",
    };

    return (
        <span style={style}>
            {text}
        </span>
    );
}

export default Badge;
