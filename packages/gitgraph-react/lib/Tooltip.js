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
var Tooltip = /** @class */ (function (_super) {
    __extends(Tooltip, _super);
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
export { Tooltip };
//# sourceMappingURL=Tooltip.js.map