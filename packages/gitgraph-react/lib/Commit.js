import * as React from "react";
import { Mode, } from "@gitgraph/core";
import { Dot } from "./Dot";
import { Tooltip } from "./Tooltip";
import { Arrow } from "./Arrow";
import { Message } from "./Message";
import { Tag, TAG_PADDING_X } from "./Tag";
import { BranchLabel } from "./BranchLabel";
export var Commit = function (props) {
    var commit = props.commit, commits = props.commits, gitgraph = props.gitgraph, commitMessagesX = props.commitMessagesX;
    /**
     * This _should_ likely be an array, but is not in order to intentionally keep
     *  a potential bug in the codebase that existed prior to Hook-ifying this component
     * @see https://github.com/nicoespeon/gitgraph.js/blob/be9cdf45c7f00970e68e1a4ba579ca7f5c672da4/packages/gitgraph-react/src/Gitgraph.tsx#L197
     * (notice that it's a single `null` value instead of an array
     *
     * The potential bug in question is "what happens when there are more than one
     * branch label rendered? Do they overlap or cause the message X position to be
     * in the wrong position?"
     *
     * TODO: Investigate potential bug outlined above
     */
    var branchLabelRef = React.useRef();
    var tagRefs = React.useRef([]);
    // "as unknown as any" needed to avoid `ref` mistypings later. :(
    var messageRef = React.useRef();
    var _a = React.useState(0), branchLabelX = _a[0], setBranchLabelX = _a[1];
    var _b = React.useState([]), tagXs = _b[0], setTagXs = _b[1];
    var _c = React.useState(0), messageX = _c[0], setMessageX = _c[1];
    var arrows = React.useMemo(function () {
        if (!gitgraph.template.arrow.size)
            return null;
        var commitRadius = commit.style.dot.size;
        return commit.parents.map(function (parentHash) {
            return (React.createElement(Arrow, { key: parentHash, commits: commits, commit: commit, gitgraph: gitgraph, parentHash: parentHash, commitRadius: commitRadius }));
        });
    }, [commits, commit, gitgraph]);
    var branchLabels = React.useMemo(function () {
        // @gitgraph/core could compute branch labels into commits directly.
        // That will make it easier to retrieve them, just like tags.
        var branches = Array.from(gitgraph.branches.values());
        return branches.map(function (branch) {
            return (React.createElement(BranchLabel, { key: branch.name, gitgraph: gitgraph, branch: branch, commit: commit, ref: branchLabelRef, branchLabelX: branchLabelX }));
        });
    }, [gitgraph, commit, branchLabelX]);
    var tags = React.useMemo(function () {
        tagRefs.current = [];
        if (!commit.tags)
            return null;
        if (gitgraph.isHorizontal)
            return null;
        return commit.tags.map(function (tag, i) { return (React.createElement(Tag, { key: commit.hashAbbrev + "-" + tag.name, commit: commit, tag: tag, ref: function (r) { return (tagRefs.current[i] = r); }, tagX: tagXs[i] || 0 })); });
    }, [commit, gitgraph, tagXs]);
    var _d = props.getWithCommitOffset(commit), x = _d.x, y = _d.y;
    // positionCommitsElements
    React.useLayoutEffect(function () {
        if (gitgraph.isHorizontal) {
            // Elements don't appear on horizontal mode, yet.
            return;
        }
        var padding = 10;
        var translateX = commitMessagesX;
        if (branchLabelRef.current) {
            setBranchLabelX(translateX);
            // For some reason, one paddingX is missing in BBox width.
            var branchLabelWidth = branchLabelRef.current.getBBox().width + BranchLabel.paddingX;
            translateX += branchLabelWidth + padding;
        }
        var allTagXs = tagRefs.current.map(function (tag) {
            if (!tag)
                return 0;
            var tagX = translateX;
            // For some reason, one paddingX is missing in BBox width.
            var tagWidth = tag.getBBox().width + TAG_PADDING_X;
            translateX += tagWidth + padding;
            return tagX;
        });
        setTagXs(allTagXs);
        if (messageRef.current) {
            setMessageX(translateX);
        }
    }, [tagRefs, gitgraph, commitMessagesX]);
    var shouldRenderTooltip = props.currentCommitOver === commit &&
        (props.gitgraph.isHorizontal ||
            (props.gitgraph.mode === Mode.Compact &&
                commit.style.hasTooltipInCompactMode));
    if (shouldRenderTooltip) {
        props.setTooltip(React.createElement("g", { transform: "translate(" + x + ", " + y + ")" },
            React.createElement(Tooltip, { commit: commit },
                commit.hashAbbrev,
                " - ",
                commit.subject)));
    }
    return (React.createElement("g", { transform: "translate(" + x + ", " + y + ")" },
        React.createElement(Dot, { commit: commit, onMouseOver: function () {
                props.setCurrentCommitOver(commit);
                commit.onMouseOver();
            }, onMouseOut: function () {
                props.setCurrentCommitOver(null);
                props.setTooltip(null);
                commit.onMouseOut();
            } }),
        arrows,
        React.createElement("g", { transform: "translate(" + -x + ", 0)" },
            commit.style.message.display && (React.createElement(Message, { commit: commit, ref: messageRef, messageX: messageX })),
            branchLabels,
            tags)));
};
//# sourceMappingURL=Commit.js.map