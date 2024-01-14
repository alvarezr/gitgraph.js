import * as React from "react";
function DefaultBranchLabel(_a) {
    var branch = _a.branch, commit = _a.commit;
    var _b = React.useState({
        textWidth: 0,
        textHeight: 0,
    }), textSizing = _b[0], setTextSizing = _b[1];
    var getSizing = React.useCallback(function (node) {
        if (!node)
            return;
        var box = node.getBBox();
        setTextSizing({ textWidth: box.width, textHeight: box.height });
    }, []);
    var boxWidth = textSizing.textWidth + 2 * BranchLabel.paddingX;
    var boxHeight = textSizing.textHeight + 2 * BranchLabel.paddingY;
    return (React.createElement("g", null,
        React.createElement("rect", { stroke: branch.style.label.strokeColor || commit.style.color, fill: branch.style.label.bgColor, rx: branch.style.label.borderRadius, width: boxWidth, height: boxHeight }),
        React.createElement("text", { ref: getSizing, fill: branch.style.label.color || commit.style.color, style: { font: branch.style.label.font }, alignmentBaseline: "middle", dominantBaseline: "middle", x: BranchLabel.paddingX, y: boxHeight / 2 }, branch.name)));
}
export var BranchLabel = React.forwardRef(function (props, ref) {
    var branch = props.branch, commit = props.commit, branchLabelX = props.branchLabelX;
    if (!branch.style.label.display)
        return null;
    if (!props.gitgraph.branchLabelOnEveryCommit) {
        var commitHash = props.gitgraph.refs.getCommit(branch.name);
        if (commit.hash !== commitHash)
            return null;
    }
    // For the moment, we don't handle multiple branch labels.
    // To do so, we'd need to reposition each of them appropriately.
    if (commit.branchToDisplay !== branch.name)
        return null;
    var branchLabel = branch.renderLabel ? (branch.renderLabel(branch)) : (React.createElement(DefaultBranchLabel, { branch: branch, commit: commit }));
    if (props.gitgraph.isVertical) {
        return (React.createElement("g", { ref: ref, transform: "translate(" + (branchLabelX || 0) + ", 0)" }, branchLabel));
    }
    else {
        var commitDotSize = commit.style.dot.size * 2;
        var horizontalMarginTop = 10;
        var y = commitDotSize + horizontalMarginTop;
        return (React.createElement("g", { ref: ref, transform: "translate(" + commit.x + ", " + y + ")" }, branchLabel));
    }
});
BranchLabel.paddingX = 10;
BranchLabel.paddingY = 5;
//# sourceMappingURL=BranchLabel.js.map