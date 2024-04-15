import { ChangeEventHandler, FocusEventHandler, MouseEventHandler } from "react";
interface EleProps {
    className: string | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    showInputEle: any;
    handleChange: ChangeEventHandler<HTMLElement> | undefined;
    handleDoubleClick: MouseEventHandler<HTMLSpanElement> | undefined;
    handleBlur: FocusEventHandler<HTMLElement> | undefined;
    value: string;
    name: string;
}

// Create an ElementMaker component
function TextareaMaker(props: EleProps) {
  return (
    <span>
      {
        // Use JavaScript's ternary operator to specify <span>'s inner content
        props.showInputEle ? (
          <textarea
            name={props.name}
            value={props.value}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            autoFocus
            className={props.className}
          />
        ) : (
          <span
            onDoubleClick={props.handleDoubleClick}
            className={props.className}
            style={{
              display: "inline-block",
              height: "180px",
            //   minWidth: "300px",
            }}
          >
            {props.value}
          </span>
        )
      }
    </span>
  );
}

export default TextareaMaker;