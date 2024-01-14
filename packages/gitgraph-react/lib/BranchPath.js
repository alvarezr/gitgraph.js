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
import { toSvgPath } from "@gitgraph/core";
var BranchPath = /** @class */ (function (_super) {
    __extends(BranchPath, _super);
    function BranchPath() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BranchPath.prototype.render = function () {
        var _this = this;
        return (React.createElement("path", { d: toSvgPath(this.props.coordinates.map(function (a) {
                return a.map(function (b) { return _this.props.getWithCommitOffset(b); });
            }), this.props.isBezier, this.props.gitgraph.isVertical), fill: "none", stroke: this.props.branch.computedColor, strokeWidth: this.props.branch.style.lineWidth, transform: "translate(" + this.props.offset + ", " + this.props.offset + ")" }));
    };
    return BranchPath;
}(React.Component));
export { BranchPath };
//# sourceMappingURL=BranchPath.js.map