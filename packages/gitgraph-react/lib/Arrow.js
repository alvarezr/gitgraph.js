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
import { arrowSvgPath } from "@gitgraph/core";
var Arrow = /** @class */ (function (_super) {
    __extends(Arrow, _super);
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
            React.createElement("path", { d: arrowSvgPath(this.props.gitgraph, parent, this.props.commit), fill: this.props.gitgraph.template.arrow.color })));
    };
    return Arrow;
}(React.Component));
export { Arrow };
//# sourceMappingURL=Arrow.js.map