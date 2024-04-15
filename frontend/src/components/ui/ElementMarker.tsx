import { ChangeEventHandler, FocusEventHandler, MouseEventHandler } from "react";
interface EleProps {
    className: string | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    showInputEle: any;
    handleChange: ChangeEventHandler<HTMLInputElement> | undefined;
    handleDoubleClick: MouseEventHandler<HTMLSpanElement> | undefined;
    handleBlur: FocusEventHandler<HTMLInputElement> | undefined;
    value: string;
    name: string;
}

// Create an ElementMaker component
function ElementMaker(props: EleProps) {
  return (
    <span>
      {
        // Use JavaScript's ternary operator to specify <span>'s inner content
        props.showInputEle ? (
          <input
            type="text"
            name={props.name}
            value={props.value}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            autoFocus
          />
        ) : (
          <span
            onDoubleClick={props.handleDoubleClick}
            className={props.className}
          >
            {props.value}
          </span>
        )
      }
    </span>
  );
}

export default ElementMaker;