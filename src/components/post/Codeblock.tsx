import { HighlightedCode, Pre } from "codehike/code";
import { AnnotationHandler, InnerLine } from "codehike/code";

export interface CodeblockProps {
  codeblock: HighlightedCode;
}

const lineNumbers = (number = 1): Exclude<AnnotationHandler, undefined> => ({
  name: "line-numbers",
  Line: (props) => {
    const total = props.totalLines + number - 1;
    const line = props.lineNumber + number - 1;
    const width = total.toString().length + 2;
    return (
      <div className="flex align-top">
        <span
          className={`text-right pr-[2ch]`}
          style={{ minWidth: `${width}ch` }}
        >
          {line}
        </span>
        <InnerLine className="flex-1" merge={props} />
      </div>
    );
  }
});

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

const DEFAULT_HANDLER: AnnotationHandler[] = [markHandler];

function Codeblock({ codeblock }: CodeblockProps) {
  const { annotations } = codeblock;

  const handler = [...DEFAULT_HANDLER];

  const lineNumber = annotations.find(
    (annotation) => annotation.name === "line-numbers"
  );

  if (lineNumber) {
    handler.push(lineNumbers(+(lineNumber.query || 1)));
  }

  if (codeblock.meta) {
    return (
      <div className="my-10">
        <pre className="!my-0 py-1.5 rounded-b-[0] border-b-1 border-gray-600">
          {codeblock.meta}
        </pre>
        <Pre
          className="!my-0 rounded-t-[0]"
          code={codeblock}
          handlers={handler}
        />
      </div>
    );
  }

  return <Pre className="!my-10" code={codeblock} handlers={handler} />;
}

export default Codeblock;
