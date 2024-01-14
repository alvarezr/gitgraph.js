import * as React from "react";
import { GitgraphCommitOptions, GitgraphBranchOptions, GitgraphTagOptions, GitgraphMergeOptions, BranchUserApi } from "@gitgraph/core";
export declare type ReactSvgElement = React.ReactElement<SVGElement>;
export declare type CommitOptions = GitgraphCommitOptions<ReactSvgElement>;
export declare type BranchOptions = GitgraphBranchOptions<ReactSvgElement>;
export declare type TagOptions = GitgraphTagOptions<ReactSvgElement>;
export declare type MergeOptions = GitgraphMergeOptions<ReactSvgElement>;
export declare type Branch = BranchUserApi<ReactSvgElement>;
