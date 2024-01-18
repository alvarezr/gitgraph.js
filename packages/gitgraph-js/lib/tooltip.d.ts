import { Commit } from "@sourceflow/gitgraph-core";
export { createTooltip, PADDING };
declare const PADDING = 10;
declare function createTooltip(commit: Commit): SVGElement;
