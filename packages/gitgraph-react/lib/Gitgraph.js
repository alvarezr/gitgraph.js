var __extends = (this && this.__extends) || (function () {
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
import * as React from "react";
import { GitgraphCore, MergeStyle, Mode, Orientation, TemplateName, templateExtend, } from "@gitgraph/core";
import { BranchLabel } from "./BranchLabel";
import { Tooltip } from "./Tooltip";
import { Commit } from "./Commit";
import { BranchPath } from "./BranchPath";
export { Gitgraph, TemplateName, templateExtend, MergeStyle, Mode, Orientation, };
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
            : new GitgraphCore(props.options);
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
        var isBezier = this.gitgraph.template.branch.mergeStyle === MergeStyle.Bezier;
        return Array.from(this.state.branchesPaths).map(function (_a) {
            var branch = _a[0], coordinates = _a[1];
            return (React.createElement(BranchPath, { key: branch.name, gitgraph: _this.gitgraph, branch: branch, coordinates: coordinates, getWithCommitOffset: _this.getWithCommitOffset.bind(_this), isBezier: isBezier, offset: offset }));
        });
    };
    Gitgraph.prototype.computeOffsets = function (commits) {
        var totalOffsetY = 0;
        // In VerticalReverse orientation, commits are in the same order in the DOM.
        var orientedCommits = this.gitgraph.orientation === Orientation.VerticalReverse
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
//# sourceMappingURL=Gitgraph.js.map