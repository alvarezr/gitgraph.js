(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
var gitgraph_1 = require("./gitgraph");
exports.GitgraphCore = gitgraph_1.GitgraphCore;
var mode_1 = require("./mode");
exports.Mode = mode_1.Mode;
var gitgraph_user_api_1 = require("./user-api/gitgraph-user-api");
exports.GitgraphUserApi = gitgraph_user_api_1.GitgraphUserApi;
var branch_user_api_1 = require("./user-api/branch-user-api");
exports.BranchUserApi = branch_user_api_1.BranchUserApi;
var branch_1 = require("./branch");
exports.Branch = branch_1.Branch;
var commit_1 = require("./commit");
exports.Commit = commit_1.Commit;
var tag_1 = require("./tag");
exports.Tag = tag_1.Tag;
var refs_1 = require("./refs");
exports.Refs = refs_1.Refs;
var template_1 = require("./template");
exports.MergeStyle = template_1.MergeStyle;
exports.TemplateName = template_1.TemplateName;
exports.templateExtend = template_1.templateExtend;
var orientation_1 = require("./orientation");
exports.Orientation = orientation_1.Orientation;
var branches_paths_1 = require("./branches-paths");
exports.toSvgPath = branches_paths_1.toSvgPath;
var utils_1 = require("./utils");
exports.arrowSvgPath = utils_1.arrowSvgPath;

})));
