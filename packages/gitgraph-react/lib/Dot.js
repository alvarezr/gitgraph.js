import * as React from "react";
export var Dot = function (_a) {
    var commit = _a.commit, onMouseOver = _a.onMouseOver, onMouseOut = _a.onMouseOut;
    if (commit.renderDot) {
        return commit.renderDot(commit);
    }
    return (
    /*
      In order to handle strokes, we need to do some complex stuff here… 😅

      Problem: strokes are drawn inside & outside the circle.
      But we want the stroke to be drawn inside only!

      The outside overlaps with other elements, as we expect the dot to have a fixed size. So we want to crop the outside part.

      Solution:
      1. Create the circle in a <defs>
      2. Define a clip path that references the circle
      3. Use the clip path, adding the stroke.
      4. Double stroke width as half of it will be clipped (the outside part).

      Ref.: https://stackoverflow.com/a/32162431/3911841

      P.S. there is a proposal for a stroke-alignment property,
      but it's still a W3C Draft ¯\_(ツ)_/¯
      https://svgwg.org/specs/strokes/#SpecifyingStrokeAlignment
    */
    React.createElement(React.Fragment, null,
        React.createElement("defs", null,
            React.createElement("circle", { id: commit.hash, cx: commit.style.dot.size, cy: commit.style.dot.size, r: commit.style.dot.size, fill: commit.style.dot.color }),
            React.createElement("clipPath", { id: "clip-" + commit.hash },
                React.createElement("use", { xlinkHref: "#" + commit.hash }))),
        React.createElement("g", { onClick: commit.onClick, onMouseOver: onMouseOver, onMouseOut: onMouseOut },
            React.createElement("use", { xlinkHref: "#" + commit.hash, clipPath: "url(#clip-" + commit.hash + ")", stroke: commit.style.dot.strokeColor, strokeWidth: commit.style.dot.strokeWidth && commit.style.dot.strokeWidth * 2 }),
            commit.dotText && (React.createElement("text", { alignmentBaseline: "central", textAnchor: "middle", x: commit.style.dot.size, y: commit.style.dot.size, style: { font: commit.style.dot.font } }, commit.dotText)))));
};
//# sourceMappingURL=Dot.js.map