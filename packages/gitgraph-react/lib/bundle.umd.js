(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('@gitgraph/core')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react', '@gitgraph/core'], factory) :
	(factory((global.GitgraphReact = {}),global.React,global.gitgraph.core));
}(this, (function (exports,React,core) { 'use strict';

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
var BranchLabel = React.forwardRef(function (props, ref) {
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

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Tooltip = /** @class */ (function (_super) {
    __extends$1(Tooltip, _super);
    function Tooltip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { textWidth: 0 };
        _this.$text = React.createRef();
        return _this;
    }
    Tooltip.prototype.componentDidMount = function () {
        this.setState({ textWidth: this.$text.current.getBBox().width });
    };
    Tooltip.prototype.render = function () {
        if (this.props.commit.renderTooltip) {
            return this.props.commit.renderTooltip(this.props.commit);
        }
        var commitSize = this.props.commit.style.dot.size * 2;
        var offset = 10;
        var padding = Tooltip.padding;
        var radius = 5;
        var boxHeight = 50;
        var boxWidth = offset + this.state.textWidth + 2 * padding;
        var path = [
            "M 0,0",
            "L " + offset + "," + offset,
            "V " + (boxHeight / 2 - radius),
            "Q " + offset + "," + boxHeight / 2 + " " + (offset + radius) + "," + boxHeight / 2,
            "H " + (boxWidth - radius),
            "Q " + boxWidth + "," + boxHeight / 2 + " " + boxWidth + "," + (boxHeight / 2 - radius),
            "V -" + (boxHeight / 2 - radius),
            "Q " + boxWidth + ",-" + boxHeight / 2 + " " + (boxWidth - radius) + ",-" + boxHeight / 2,
            "H " + (offset + radius),
            "Q " + offset + ",-" + boxHeight / 2 + " " + offset + ",-" + (boxHeight / 2 - radius),
            "V -" + offset,
            "z",
        ].join(" ");
        return (React.createElement("g", { transform: "translate(" + commitSize + ", " + commitSize / 2 + ")" },
            React.createElement("path", { d: path, fill: "#EEE" }),
            React.createElement("text", { ref: this.$text, x: offset + padding, y: 0, alignmentBaseline: "central", fill: "#333" }, this.props.children)));
    };
    Tooltip.padding = 10;
    return Tooltip;
}(React.Component));

var Dot = function (_a) {
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

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Arrow = /** @class */ (function (_super) {
    __extends$2(Arrow, _super);
    function Arrow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Arrow.prototype.render = function () {
        var _this = this;
        var parent = this.props.commits.find(function (_a) {
            var hash = _a.hash;
            return hash === _this.props.parentHash;
        });
        if (!parent)
            return null;
        // Starting point, relative to commit
        var origin = this.props.gitgraph.reverseArrow
            ? {
                x: this.props.commitRadius + (parent.x - this.props.commit.x),
                y: this.props.commitRadius + (parent.y - this.props.commit.y),
            }
            : { x: this.props.commitRadius, y: this.props.commitRadius };
        return (React.createElement("g", { transform: "translate(" + origin.x + ", " + origin.y + ")" },
            React.createElement("path", { d: core.arrowSvgPath(this.props.gitgraph, parent, this.props.commit), fill: this.props.gitgraph.template.arrow.color })));
    };
    return Arrow;
}(React.Component));

var Message = React.forwardRef(function (props, ref) {
    var commit = props.commit, messageX = props.messageX;
    if (commit.renderMessage) {
        return (React.createElement("g", { ref: ref, transform: "translate(" + messageX + ", 0)" }, commit.renderMessage(commit)));
    }
    var body = null;
    if (commit.body) {
        body = (React.createElement("foreignObject", { width: "600", x: "10" },
            React.createElement("p", null, commit.body)));
    }
    // Use commit dot radius to align text with the middle of the dot.
    var y = commit.style.dot.size;
    return (React.createElement("g", { ref: ref, transform: "translate(" + messageX + ", " + y + ")" },
        React.createElement("text", { alignmentBaseline: "central", fill: commit.style.message.color, style: { font: commit.style.message.font }, onClick: commit.onMessageClick }, commit.message),
        body));
});

var TAG_PADDING_X = 10;
var TAG_PADDING_Y = 5;
function DefaultTag(props) {
    var _a = React.useState({ textWidth: 0, textHeight: 0 }), state = _a[0], setState = _a[1];
    var $text = React.useRef(null);
    React.useEffect(function () {
        var box = $text.current.getBBox();
        setState({ textWidth: box.width, textHeight: box.height });
    }, []);
    var tag = props.tag;
    var offset = tag.style.pointerWidth;
    var radius = tag.style.borderRadius;
    var boxWidth = offset + state.textWidth + 2 * TAG_PADDING_X;
    var boxHeight = state.textHeight + 2 * TAG_PADDING_Y;
    var path = [
        "M 0,0",
        "L " + offset + "," + boxHeight / 2,
        "V " + boxHeight / 2,
        "Q " + offset + "," + boxHeight / 2 + " " + (offset + radius) + "," + boxHeight / 2,
        "H " + (boxWidth - radius),
        "Q " + boxWidth + "," + boxHeight / 2 + " " + boxWidth + "," + (boxHeight / 2 - radius),
        "V " + -(boxHeight / 2 - radius),
        "Q " + boxWidth + ",-" + boxHeight / 2 + " " + (boxWidth - radius) + ",-" + boxHeight / 2,
        "H " + (offset + radius),
        "Q " + offset + ",-" + boxHeight / 2 + " " + offset + ",-" + boxHeight / 2,
        "V -" + boxHeight / 2,
        "z",
    ].join(" ");
    return (React.createElement("g", null,
        React.createElement("path", { d: path, fill: tag.style.bgColor, stroke: tag.style.strokeColor }),
        React.createElement("text", { ref: $text, fill: tag.style.color, style: { font: tag.style.font }, alignmentBaseline: "middle", dominantBaseline: "middle", x: offset + TAG_PADDING_X, y: 0 }, tag.name)));
}
var Tag = React.forwardRef(function (props, ref) {
    var tag = props.tag, commit = props.commit, tagX = props.tagX;
    return (React.createElement("g", { ref: ref, transform: "translate(" + (tagX || 0) + ", " + commit.style.dot.size + ")" }, tag.render ? tag.render(tag.name, tag.style) : React.createElement(DefaultTag, { tag: tag })));
});

var Commit = function (props) {
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
            (props.gitgraph.mode === core.Mode.Compact &&
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

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BranchPath = /** @class */ (function (_super) {
    __extends$3(BranchPath, _super);
    function BranchPath() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BranchPath.prototype.render = function () {
        var _this = this;
        return (React.createElement("path", { d: core.toSvgPath(this.props.coordinates.map(function (a) {
                return a.map(function (b) { return _this.props.getWithCommitOffset(b); });
            }), this.props.isBezier, this.props.gitgraph.isVertical), fill: "none", stroke: this.props.branch.computedColor, strokeWidth: this.props.branch.style.lineWidth, transform: "translate(" + this.props.offset + ", " + this.props.offset + ")" }));
    };
    return BranchPath;
}(React.Component));

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function isPropsWithGraph(props) {
    return "graph" in props;
}
var Gitgraph = /** @class */ (function (_super) {
    __extends(Gitgraph, _super);
    function Gitgraph(props) {
        var _this = _super.call(this, props) || this;
        _this.$graph = React.createRef();
        _this.$commits = React.createRef();
        _this.$tooltip = null;
        _this.state = {
            commits: [],
            branchesPaths: new Map(),
            commitMessagesX: 0,
            commitYWithOffsets: {},
            shouldRecomputeOffsets: true,
            currentCommitOver: null,
        };
        _this.gitgraph = isPropsWithGraph(props)
            ? props.graph
            : new core.GitgraphCore(props.options);
        _this.gitgraph.subscribe(function (data) {
            var commits = data.commits, branchesPaths = data.branchesPaths, commitMessagesX = data.commitMessagesX;
            _this.setState({
                commits: commits,
                branchesPaths: branchesPaths,
                commitMessagesX: commitMessagesX,
                shouldRecomputeOffsets: true,
            });
        });
        return _this;
    }
    Gitgraph.prototype.render = function () {
        var _this = this;
        return (React.createElement("svg", { ref: this.$graph },
            React.createElement("g", { transform: "translate(" + BranchLabel.paddingX + ", " + Tooltip.padding + ")" },
                this.renderBranchesPaths(),
                React.createElement("g", { ref: this.$commits }, this.state.commits.map(function (commit) { return (React.createElement(Commit, { key: commit.hash, commits: _this.state.commits, commit: commit, currentCommitOver: _this.state.currentCommitOver, setCurrentCommitOver: _this.setCurrentCommitOver.bind(_this), gitgraph: _this.gitgraph, getWithCommitOffset: _this.getWithCommitOffset.bind(_this), setTooltip: _this.setTooltip.bind(_this), commitMessagesX: _this.state.commitMessagesX })); })),
                this.$tooltip)));
    };
    Gitgraph.prototype.componentDidMount = function () {
        if (isPropsWithGraph(this.props))
            return;
        this.props.children(this.gitgraph.getUserApi());
    };
    Gitgraph.prototype.componentDidUpdate = function () {
        if (this.$graph.current) {
            var _a = this.$graph.current.getBBox(), height = _a.height, width = _a.width;
            this.$graph.current.setAttribute("width", 
            // Add `Tooltip.padding` so we don't crop the tooltip text.
            // Add `BranchLabel.paddingX` so we don't cut branch label.
            (width + Tooltip.padding + BranchLabel.paddingX).toString());
            this.$graph.current.setAttribute("height", 
            // Add `Tooltip.padding` so we don't crop tooltip text
            // Add `BranchLabel.paddingY` so we don't crop branch label.
            (height + Tooltip.padding + BranchLabel.paddingY).toString());
        }
        if (!this.state.shouldRecomputeOffsets)
            return;
        if (!this.$commits.current)
            return;
        var commits = Array.from(this.$commits.current.children);
        this.setState({
            commitYWithOffsets: this.computeOffsets(commits),
            shouldRecomputeOffsets: false,
        });
    };
    Gitgraph.prototype.setCurrentCommitOver = function (v) {
        this.setState({ currentCommitOver: v });
    };
    Gitgraph.prototype.setTooltip = function (v) {
        this.$tooltip = v;
    };
    Gitgraph.prototype.renderBranchesPaths = function () {
        var _this = this;
        var offset = this.gitgraph.template.commit.dot.size;
        var isBezier = this.gitgraph.template.branch.mergeStyle === core.MergeStyle.Bezier;
        return Array.from(this.state.branchesPaths).map(function (_a) {
            var branch = _a[0], coordinates = _a[1];
            return (React.createElement(BranchPath, { key: branch.name, gitgraph: _this.gitgraph, branch: branch, coordinates: coordinates, getWithCommitOffset: _this.getWithCommitOffset.bind(_this), isBezier: isBezier, offset: offset }));
        });
    };
    Gitgraph.prototype.computeOffsets = function (commits) {
        var totalOffsetY = 0;
        // In VerticalReverse orientation, commits are in the same order in the DOM.
        var orientedCommits = this.gitgraph.orientation === core.Orientation.VerticalReverse
            ? commits
            : commits.reverse();
        return orientedCommits.reduce(function (newOffsets, commit) {
            var commitY = parseInt(commit.getAttribute("transform").split(",")[1].slice(0, -1), 10);
            var firstForeignObject = commit.getElementsByTagName("foreignObject")[0];
            var customHtmlMessage = firstForeignObject && firstForeignObject.firstElementChild;
            var messageHeight = 0;
            if (customHtmlMessage) {
                var height = customHtmlMessage.getBoundingClientRect().height;
                var marginTopInPx = window.getComputedStyle(customHtmlMessage).marginTop || "0px";
                var marginTop = parseInt(marginTopInPx.replace("px", ""), 10);
                messageHeight = height + marginTop;
            }
            // Force the height of the foreignObject (browser issue)
            if (firstForeignObject) {
                firstForeignObject.setAttribute("height", messageHeight + "px");
            }
            newOffsets[commitY] = commitY + totalOffsetY;
            // Increment total offset after setting the offset
            // => offset next commits accordingly.
            totalOffsetY += messageHeight;
            return newOffsets;
        }, {});
    };
    Gitgraph.prototype.getWithCommitOffset = function (_a) {
        var x = _a.x, y = _a.y;
        return { x: x, y: this.state.commitYWithOffsets[y] || y };
    };
    Gitgraph.defaultProps = {
        options: {},
    };
    return Gitgraph;
}(React.Component));

exports.Gitgraph = Gitgraph;
exports.TemplateName = core.TemplateName;
exports.templateExtend = core.templateExtend;
exports.MergeStyle = core.MergeStyle;
exports.Mode = core.Mode;
exports.Orientation = core.Orientation;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bundle.umd.js.map
