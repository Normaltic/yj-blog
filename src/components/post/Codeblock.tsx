import { HighlightedCode, Pre } from "codehike/code";
import { AnnotationHandler, InnerLine } from "codehike/code";

export interface CodeblockProps {
  codeblock: HighlightedCode;
}

export const lineNumbers: Exclude<AnnotationHandler, undefined> = {
  name: "line-numbers",
  Line: (props) => {
    const width = props.totalLines.toString().length + 2;
    return (
      <div className="flex align-top">
        <span
          className={`text-right pr-[2ch]`}
          style={{ minWidth: `${width}ch` }}
        >
          {props.lineNumber}
        </span>
        <InnerLine className="flex-1" merge={props} />
      </div>
    );
  }
};

const markHandler: Exclude<AnnotationHandler, undefined> = {
  name: "mark",
  Line: ({ annotation, ...props }) => {
    const className =
      annotation?.name === "mark"
        ? "border-l-2 border-primary bg-primary/20"
        : "";
    return <InnerLine className={className} merge={props} />;
  }
};

function Codeblock({ codeblock }: CodeblockProps) {
  return <Pre code={codeblock} handlers={[markHandler, lineNumbers]} />;
}

export default Codeblock;
