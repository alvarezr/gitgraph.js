(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = "MODULE_NOT_FOUND"), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function (r) {
            var n = e[i][1][r];
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t,
        );
      }
      return n[i].exports;
    }
    for (
      var u = "function" == typeof require && require, i = 0;
      i < t.length;
      i++
    )
      o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [
      function (require, module, exports) {
        /*
object-assign
(c) Sindre Sorhus
@license MIT
*/

        "use strict";
        /* eslint-disable no-unused-vars */
        var getOwnPropertySymbols = Object.getOwnPropertySymbols;
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var propIsEnumerable = Object.prototype.propertyIsEnumerable;

        function toObject(val) {
          if (val === null || val === undefined) {
            throw new TypeError(
              "Object.assign cannot be called with null or undefined",
            );
          }

          return Object(val);
        }

        function shouldUseNative() {
          try {
            if (!Object.assign) {
              return false;
            }

            // Detect buggy property enumeration order in older V8 versions.

            // https://bugs.chromium.org/p/v8/issues/detail?id=4118
            var test1 = new String("abc"); // eslint-disable-line no-new-wrappers
            test1[5] = "de";
            if (Object.getOwnPropertyNames(test1)[0] === "5") {
              return false;
            }

            // https://bugs.chromium.org/p/v8/issues/detail?id=3056
            var test2 = {};
            for (var i = 0; i < 10; i++) {
              test2["_" + String.fromCharCode(i)] = i;
            }
            var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
              return test2[n];
            });
            if (order2.join("") !== "0123456789") {
              return false;
            }

            // https://bugs.chromium.org/p/v8/issues/detail?id=3056
            var test3 = {};
            "abcdefghijklmnopqrst".split("").forEach(function (letter) {
              test3[letter] = letter;
            });
            if (
              Object.keys(Object.assign({}, test3)).join("") !==
              "abcdefghijklmnopqrst"
            ) {
              return false;
            }

            return true;
          } catch (err) {
            // We don't expect any of the above to throw, but better to be safe.
            return false;
          }
        }

        module.exports = shouldUseNative()
          ? Object.assign
          : function (target, source) {
              var from;
              var to = toObject(target);
              var symbols;

              for (var s = 1; s < arguments.length; s++) {
                from = Object(arguments[s]);

                for (var key in from) {
                  if (hasOwnProperty.call(from, key)) {
                    to[key] = from[key];
                  }
                }

                if (getOwnPropertySymbols) {
                  symbols = getOwnPropertySymbols(from);
                  for (var i = 0; i < symbols.length; i++) {
                    if (propIsEnumerable.call(from, symbols[i])) {
                      to[symbols[i]] = from[symbols[i]];
                    }
                  }
                }
              }

              return to;
            };
      },
      {},
    ],
    2: [
      function (require, module, exports) {
        // shim for using process in browser
        var process = (module.exports = {});

        // cached from whatever global is present so that test runners that stub it
        // don't break things.  But we need to wrap it in a try catch in case it is
        // wrapped in strict mode code which doesn't define any globals.  It's inside a
        // function because try/catches deoptimize in certain engines.

        var cachedSetTimeout;
        var cachedClearTimeout;

        function defaultSetTimout() {
          throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
          throw new Error("clearTimeout has not been defined");
        }
        (function () {
          try {
            if (typeof setTimeout === "function") {
              cachedSetTimeout = setTimeout;
            } else {
              cachedSetTimeout = defaultSetTimout;
            }
          } catch (e) {
            cachedSetTimeout = defaultSetTimout;
          }
          try {
            if (typeof clearTimeout === "function") {
              cachedClearTimeout = clearTimeout;
            } else {
              cachedClearTimeout = defaultClearTimeout;
            }
          } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
          }
        })();
        function runTimeout(fun) {
          if (cachedSetTimeout === setTimeout) {
            //normal enviroments in sane situations
            return setTimeout(fun, 0);
          }
          // if setTimeout wasn't available but was latter defined
          if (
            (cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) &&
            setTimeout
          ) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
          }
          try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedSetTimeout(fun, 0);
          } catch (e) {
            try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
              return cachedSetTimeout.call(null, fun, 0);
            } catch (e) {
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
              return cachedSetTimeout.call(this, fun, 0);
            }
          }
        }
        function runClearTimeout(marker) {
          if (cachedClearTimeout === clearTimeout) {
            //normal enviroments in sane situations
            return clearTimeout(marker);
          }
          // if clearTimeout wasn't available but was latter defined
          if (
            (cachedClearTimeout === defaultClearTimeout ||
              !cachedClearTimeout) &&
            clearTimeout
          ) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
          }
          try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedClearTimeout(marker);
          } catch (e) {
            try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
              return cachedClearTimeout.call(null, marker);
            } catch (e) {
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
              // Some versions of I.E. have different rules for clearTimeout vs setTimeout
              return cachedClearTimeout.call(this, marker);
            }
          }
        }
        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;

        function cleanUpNextTick() {
          if (!draining || !currentQueue) {
            return;
          }
          draining = false;
          if (currentQueue.length) {
            queue = currentQueue.concat(queue);
          } else {
            queueIndex = -1;
          }
          if (queue.length) {
            drainQueue();
          }
        }

        function drainQueue() {
          if (draining) {
            return;
          }
          var timeout = runTimeout(cleanUpNextTick);
          draining = true;

          var len = queue.length;
          while (len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
              if (currentQueue) {
                currentQueue[queueIndex].run();
              }
            }
            queueIndex = -1;
            len = queue.length;
          }
          currentQueue = null;
          draining = false;
          runClearTimeout(timeout);
        }

        process.nextTick = function (fun) {
          var args = new Array(arguments.length - 1);
          if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
            }
          }
          queue.push(new Item(fun, args));
          if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
          }
        };

        // v8 likes predictible objects
        function Item(fun, array) {
          this.fun = fun;
          this.array = array;
        }
        Item.prototype.run = function () {
          this.fun.apply(null, this.array);
        };
        process.title = "browser";
        process.browser = true;
        process.env = {};
        process.argv = [];
        process.version = ""; // empty string to avoid regexp issues
        process.versions = {};

        function noop() {}

        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.prependListener = noop;
        process.prependOnceListener = noop;

        process.listeners = function (name) {
          return [];
        };

        process.binding = function (name) {
          throw new Error("process.binding is not supported");
        };

        process.cwd = function () {
          return "/";
        };
        process.chdir = function (dir) {
          throw new Error("process.chdir is not supported");
        };
        process.umask = function () {
          return 0;
        };
      },
      {},
    ],
    3: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const branch_user_api_1 = require("./user-api/branch-user-api");
        const DELETED_BRANCH_NAME = "";
        exports.DELETED_BRANCH_NAME = DELETED_BRANCH_NAME;
        class Branch {
          constructor(options) {
            this.gitgraph = options.gitgraph;
            this.name = options.name;
            this.style = options.style;
            this.parentCommitHash = options.parentCommitHash;
            this.commitDefaultOptions = options.commitDefaultOptions || {
              style: {},
            };
            this.onGraphUpdate = options.onGraphUpdate;
            this.renderLabel = options.renderLabel;
          }
          /**
           * Return the API to manipulate Gitgraph branch as a user.
           */
          getUserApi() {
            return new branch_user_api_1.BranchUserApi(
              this,
              this.gitgraph,
              this.onGraphUpdate,
            );
          }
          /**
           * Return true if branch was deleted.
           */
          isDeleted() {
            return this.name === DELETED_BRANCH_NAME;
          }
        }
        exports.Branch = Branch;
        function createDeletedBranch(gitgraph, style, onGraphUpdate) {
          return new Branch({
            name: DELETED_BRANCH_NAME,
            gitgraph,
            style,
            onGraphUpdate,
          });
        }
        exports.createDeletedBranch = createDeletedBranch;
      },
      { "./user-api/branch-user-api": 17 },
    ],
    4: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class BranchesOrder {
          constructor(commits, colors, compareFunction) {
            this.branches = new Set();
            this.colors = colors;
            commits.forEach((commit) =>
              this.branches.add(commit.branchToDisplay),
            );
            if (compareFunction) {
              this.branches = new Set(
                Array.from(this.branches).sort(compareFunction),
              );
            }
          }
          /**
           * Return the order of the given branch name.
           *
           * @param branchName Name of the branch
           */
          get(branchName) {
            return Array.from(this.branches).findIndex(
              (branch) => branch === branchName,
            );
          }
          /**
           * Return the color of the given branch.
           *
           * @param branchName Name of the branch
           */
          getColorOf(branchName) {
            return this.colors[this.get(branchName) % this.colors.length];
          }
        }
        exports.BranchesOrder = BranchesOrder;
      },
      {},
    ],
    5: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const utils_1 = require("./utils");
        /**
         * Calculate branches paths of the graph.
         *
         * It follows the Command pattern:
         * => a class with a single `execute()` public method.
         *
         * Main benefit is we can split computation in smaller steps without
         * passing around parameters (we can rely on private data).
         */
        class BranchesPathsCalculator {
          constructor(
            commits,
            branches,
            commitSpacing,
            isGraphVertical,
            isGraphReverse,
            createDeletedBranch,
          ) {
            this.branchesPaths = new Map();
            this.commits = commits;
            this.branches = branches;
            this.commitSpacing = commitSpacing;
            this.isGraphVertical = isGraphVertical;
            this.isGraphReverse = isGraphReverse;
            this.createDeletedBranch = createDeletedBranch;
          }
          /**
           * Compute branches paths for graph.
           */
          execute() {
            this.fromCommits();
            this.withMergeCommits();
            return this.smoothBranchesPaths();
          }
          /**
           * Initialize branches paths from calculator's commits.
           */
          fromCommits() {
            this.commits.forEach((commit) => {
              let branch = this.branches.get(commit.branchToDisplay);
              if (!branch) {
                // NB: may not work properly if there are many deleted branches.
                branch =
                  this.getDeletedBranchInPath() || this.createDeletedBranch();
              }
              const path = [];
              const existingBranchPath = this.branchesPaths.get(branch);
              const firstParentCommit = this.commits.find(
                ({ hash }) => hash === commit.parents[0],
              );
              if (existingBranchPath) {
                path.push(...existingBranchPath);
              } else if (firstParentCommit) {
                // Make branch path starts from parent branch (parent commit).
                path.push({ x: firstParentCommit.x, y: firstParentCommit.y });
              }
              path.push({ x: commit.x, y: commit.y });
              this.branchesPaths.set(branch, path);
            });
          }
          /**
           * Insert merge commits points into `branchesPaths`.
           *
           * @example
           *     // Before
           *     [
           *       { x: 0, y: 640 },
           *       { x: 50, y: 560 }
           *     ]
           *
           *     // After
           *     [
           *       { x: 0, y: 640 },
           *       { x: 50, y: 560 },
           *       { x: 50, y: 560, mergeCommit: true }
           *     ]
           */
          withMergeCommits() {
            const mergeCommits = this.commits.filter(
              ({ parents }) => parents.length > 1,
            );
            mergeCommits.forEach((mergeCommit) => {
              const parentOnOriginBranch = this.commits.find(({ hash }) => {
                return hash === mergeCommit.parents[1];
              });
              if (!parentOnOriginBranch) return;
              const originBranchName = parentOnOriginBranch.branches
                ? parentOnOriginBranch.branches[0]
                : "";
              let branch = this.branches.get(originBranchName);
              if (!branch) {
                branch = this.getDeletedBranchInPath();
                if (!branch) {
                  // Still no branch? That's strange, we shouldn't set anything.
                  return;
                }
              }
              const lastPoints = [...(this.branchesPaths.get(branch) || [])];
              this.branchesPaths.set(branch, [
                ...lastPoints,
                { x: mergeCommit.x, y: mergeCommit.y, mergeCommit: true },
              ]);
            });
          }
          /**
           * Retrieve deleted branch from calculator's branches paths.
           */
          getDeletedBranchInPath() {
            return Array.from(this.branchesPaths.keys()).find((branch) =>
              branch.isDeleted(),
            );
          }
          /**
           * Smooth all paths by putting points on each row.
           */
          smoothBranchesPaths() {
            const branchesPaths = new Map();
            this.branchesPaths.forEach((points, branch) => {
              if (points.length <= 1) {
                branchesPaths.set(branch, [points]);
                return;
              }
              // Cut path on each merge commits
              // Coordinate[] -> Coordinate[][]
              if (this.isGraphVertical) {
                points = points.sort((a, b) => (a.y > b.y ? -1 : 1));
              } else {
                points = points.sort((a, b) => (a.x > b.x ? 1 : -1));
              }
              if (this.isGraphReverse) {
                points = points.reverse();
              }
              const paths = points.reduce(
                (mem, point, i) => {
                  if (point.mergeCommit) {
                    mem[mem.length - 1].push(utils_1.pick(point, ["x", "y"]));
                    let j = i - 1;
                    let previousPoint = points[j];
                    // Find the last point which is not a merge
                    while (j >= 0 && previousPoint.mergeCommit) {
                      j--;
                      previousPoint = points[j];
                    }
                    // Start a new array with this point
                    if (j >= 0) {
                      mem.push([previousPoint]);
                    }
                  } else {
                    mem[mem.length - 1].push(point);
                  }
                  return mem;
                },
                [[]],
              );
              if (this.isGraphReverse) {
                paths.forEach((path) => path.reverse());
              }
              // Add intermediate points on each sub paths
              if (this.isGraphVertical) {
                paths.forEach((subPath) => {
                  if (subPath.length <= 1) return;
                  const firstPoint = subPath[0];
                  const lastPoint = subPath[subPath.length - 1];
                  const column = subPath[1].x;
                  const branchSize =
                    Math.round(
                      Math.abs(firstPoint.y - lastPoint.y) / this.commitSpacing,
                    ) - 1;
                  const branchPoints =
                    branchSize > 0
                      ? new Array(branchSize).fill(0).map((_, i) => ({
                          x: column,
                          y: subPath[0].y - this.commitSpacing * (i + 1),
                        }))
                      : [];
                  const lastSubPaths = branchesPaths.get(branch) || [];
                  branchesPaths.set(branch, [
                    ...lastSubPaths,
                    [firstPoint, ...branchPoints, lastPoint],
                  ]);
                });
              } else {
                paths.forEach((subPath) => {
                  if (subPath.length <= 1) return;
                  const firstPoint = subPath[0];
                  const lastPoint = subPath[subPath.length - 1];
                  const column = subPath[1].y;
                  const branchSize =
                    Math.round(
                      Math.abs(firstPoint.x - lastPoint.x) / this.commitSpacing,
                    ) - 1;
                  const branchPoints =
                    branchSize > 0
                      ? new Array(branchSize).fill(0).map((_, i) => ({
                          y: column,
                          x: subPath[0].x + this.commitSpacing * (i + 1),
                        }))
                      : [];
                  const lastSubPaths = branchesPaths.get(branch) || [];
                  branchesPaths.set(branch, [
                    ...lastSubPaths,
                    [firstPoint, ...branchPoints, lastPoint],
                  ]);
                });
              }
            });
            return branchesPaths;
          }
        }
        exports.BranchesPathsCalculator = BranchesPathsCalculator;
        /**
         * Return a string ready to use in `svg.path.d` from coordinates
         *
         * @param coordinates Collection of coordinates
         */
        function toSvgPath(coordinates, isBezier, isVertical) {
          return coordinates
            .map(
              (path) =>
                "M" +
                path
                  .map(({ x, y }, i, points) => {
                    if (
                      isBezier &&
                      points.length > 1 &&
                      (i === 1 || i === points.length - 1)
                    ) {
                      const previous = points[i - 1];
                      if (isVertical) {
                        const middleY = (previous.y + y) / 2;
                        return `C ${previous.x} ${middleY} ${x} ${middleY} ${x} ${y}`;
                      } else {
                        const middleX = (previous.x + x) / 2;
                        return `C ${middleX} ${previous.y} ${middleX} ${y} ${x} ${y}`;
                      }
                    }
                    return `L ${x} ${y}`;
                  })
                  .join(" ")
                  .slice(1),
            )
            .join(" ");
        }
        exports.toSvgPath = toSvgPath;
      },
      { "./utils": 19 },
    ],
    6: [
      function (require, module, exports) {
        (function (global, factory) {
          typeof exports === "object" && typeof module !== "undefined"
            ? factory()
            : typeof define === "function" && define.amd
            ? define(factory)
            : factory();
        })(this, function () {
          "use strict";

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
        });
      },
      {
        "./branch": 3,
        "./branches-paths": 5,
        "./commit": 7,
        "./gitgraph": 8,
        "./mode": 12,
        "./orientation": 13,
        "./refs": 14,
        "./tag": 15,
        "./template": 16,
        "./user-api/branch-user-api": 17,
        "./user-api/gitgraph-user-api": 18,
        "./utils": 19,
      },
    ],
    7: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const tag_1 = require("./tag");
        /**
         * Generate a random hash.
         *
         * @return hex string with 40 chars
         */
        const getRandomHash = () =>
          (
            Math.random().toString(16).substring(3) +
            Math.random().toString(16).substring(3) +
            Math.random().toString(16).substring(3) +
            Math.random().toString(16).substring(3)
          ).substring(0, 40);
        class Commit {
          constructor(options) {
            /**
             * Ref names
             */
            this.refs = [];
            /**
             * Commit x position
             */
            this.x = 0;
            /**
             * Commit y position
             */
            this.y = 0;
            // Set author & committer
            let name, email;
            try {
              [, name, email] = options.author.match(/(.*) <(.*)>/);
            } catch (e) {
              [name, email] = [options.author, ""];
            }
            this.author = { name, email, timestamp: Date.now() };
            this.committer = { name, email, timestamp: Date.now() };
            // Set commit message
            this.subject = options.subject;
            this.body = options.body || "";
            // Set commit hash
            this.hash = options.hash || getRandomHash();
            this.hashAbbrev = this.hash.substring(0, 7);
            // Set parent hash
            this.parents = options.parents ? options.parents : [];
            this.parentsAbbrev = this.parents.map((commit) =>
              commit.substring(0, 7),
            );
            // Set style
            this.style = Object.assign({}, options.style, {
              message: Object.assign({}, options.style.message),
              dot: Object.assign({}, options.style.dot),
            });
            this.dotText = options.dotText;
            // Set callbacks
            this.onClick = () =>
              options.onClick ? options.onClick(this) : undefined;
            this.onMessageClick = () =>
              options.onMessageClick ? options.onMessageClick(this) : undefined;
            this.onMouseOver = () =>
              options.onMouseOver ? options.onMouseOver(this) : undefined;
            this.onMouseOut = () =>
              options.onMouseOut ? options.onMouseOut(this) : undefined;
            // Set custom renders
            this.renderDot = options.renderDot;
            this.renderMessage = options.renderMessage;
            this.renderTooltip = options.renderTooltip;
          }
          /**
           * Message
           */
          get message() {
            let message = "";
            if (this.style.message.displayHash) {
              message += `${this.hashAbbrev} `;
            }
            message += this.subject;
            if (this.style.message.displayAuthor) {
              message += ` - ${this.author.name} <${this.author.email}>`;
            }
            return message;
          }
          /**
           * Branch that should be rendered
           */
          get branchToDisplay() {
            return this.branches ? this.branches[0] : "";
          }
          setRefs(refs) {
            this.refs = refs.getNames(this.hash);
            return this;
          }
          setTags(tags, getTagStyle, getTagRender) {
            this.tags = tags
              .getNames(this.hash)
              .map(
                (name) =>
                  new tag_1.Tag(
                    name,
                    getTagStyle(name),
                    getTagRender(name),
                    this.style,
                  ),
              );
            return this;
          }
          setBranches(branches) {
            this.branches = branches;
            return this;
          }
          setPosition({ x, y }) {
            this.x = x;
            this.y = y;
            return this;
          }
          withDefaultColor(color) {
            const newStyle = Object.assign({}, this.style, {
              dot: Object.assign({}, this.style.dot),
              message: Object.assign({}, this.style.message),
            });
            if (!newStyle.color) newStyle.color = color;
            if (!newStyle.dot.color) newStyle.dot.color = color;
            if (!newStyle.message.color) newStyle.message.color = color;
            const commit = this.cloneCommit();
            commit.style = newStyle;
            return commit;
          }
          /**
           * Ideally, we want Commit to be a [Value Object](https://martinfowler.com/bliki/ValueObject.html).
           * We started with a mutable class. So we'll refactor that little by little.
           * This private function is a helper to create a new Commit from existing one.
           */
          cloneCommit() {
            const commit = new Commit({
              author: `${this.author.name} <${this.author.email}>`,
              subject: this.subject,
              style: this.style,
              body: this.body,
              hash: this.hash,
              parents: this.parents,
              dotText: this.dotText,
              onClick: this.onClick,
              onMessageClick: this.onMessageClick,
              onMouseOver: this.onMouseOver,
              onMouseOut: this.onMouseOut,
              renderDot: this.renderDot,
              renderMessage: this.renderMessage,
              renderTooltip: this.renderTooltip,
            });
            commit.refs = this.refs;
            commit.branches = this.branches;
            commit.tags = this.tags;
            commit.x = this.x;
            commit.y = this.y;
            return commit;
          }
        }
        exports.Commit = Commit;
      },
      { "./tag": 15 },
    ],
    8: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const branch_1 = require("./branch");
        const graph_rows_1 = require("./graph-rows");
        const mode_1 = require("./mode");
        const branches_order_1 = require("./branches-order");
        const template_1 = require("./template");
        const refs_1 = require("./refs");
        const branches_paths_1 = require("./branches-paths");
        const utils_1 = require("./utils");
        const orientation_1 = require("./orientation");
        const gitgraph_user_api_1 = require("./user-api/gitgraph-user-api");
        class GitgraphCore {
          constructor(options = {}) {
            this.refs = new refs_1.Refs();
            this.tags = new refs_1.Refs();
            this.tagStyles = {};
            this.tagRenders = {};
            this.commits = [];
            this.branches = new Map();
            this.listeners = [];
            this.nextTimeoutId = null;
            this.template = template_1.getTemplate(options.template);
            // Set a default `master` branch
            this.currentBranch = this.createBranch("master");
            // Set all options with default values
            this.orientation = options.orientation;
            this.reverseArrow = utils_1.booleanOptionOr(
              options.reverseArrow,
              false,
            );
            this.initCommitOffsetX = utils_1.numberOptionOr(
              options.initCommitOffsetX,
              0,
            );
            this.initCommitOffsetY = utils_1.numberOptionOr(
              options.initCommitOffsetY,
              0,
            );
            this.mode = options.mode;
            this.author = options.author || "Sergio Flores <saxo-guy@epic.com>";
            this.commitMessage =
              options.commitMessage || "He doesn't like George Michael! Boooo!";
            this.generateCommitHash =
              typeof options.generateCommitHash === "function"
                ? options.generateCommitHash
                : () => undefined;
            this.branchesOrderFunction =
              typeof options.compareBranchesOrder === "function"
                ? options.compareBranchesOrder
                : undefined;
            this.branchLabelOnEveryCommit = utils_1.booleanOptionOr(
              options.branchLabelOnEveryCommit,
              false,
            );
          }
          get isHorizontal() {
            return (
              this.orientation === orientation_1.Orientation.Horizontal ||
              this.orientation === orientation_1.Orientation.HorizontalReverse
            );
          }
          get isVertical() {
            return !this.isHorizontal;
          }
          get isReverse() {
            return (
              this.orientation ===
                orientation_1.Orientation.HorizontalReverse ||
              this.orientation === orientation_1.Orientation.VerticalReverse
            );
          }
          get shouldDisplayCommitMessage() {
            return !this.isHorizontal && this.mode !== mode_1.Mode.Compact;
          }
          /**
           * Return the API to manipulate Gitgraph as a user.
           * Rendering library should give that API to their consumer.
           */
          getUserApi() {
            return new gitgraph_user_api_1.GitgraphUserApi(this, () =>
              this.next(),
            );
          }
          /**
           * Add a change listener.
           * It will be called any time the graph have changed (commit, merge…).
           *
           * @param listener A callback to be invoked on every change.
           * @returns A function to remove this change listener.
           */
          subscribe(listener) {
            this.listeners.push(listener);
            let isSubscribed = true;
            return () => {
              if (!isSubscribed) return;
              isSubscribed = false;
              const index = this.listeners.indexOf(listener);
              this.listeners.splice(index, 1);
            };
          }
          /**
           * Return all data required for rendering.
           * Rendering libraries will use this to implement their rendering strategy.
           */
          getRenderedData() {
            const commits = this.computeRenderedCommits();
            const branchesPaths = this.computeRenderedBranchesPaths(commits);
            const commitMessagesX = this.computeCommitMessagesX(branchesPaths);
            this.computeBranchesColor(commits, branchesPaths);
            return { commits, branchesPaths, commitMessagesX };
          }
          createBranch(args) {
            const defaultParentBranchName = "HEAD";
            let options = {
              gitgraph: this,
              name: "",
              parentCommitHash: this.refs.getCommit(defaultParentBranchName),
              style: this.template.branch,
              onGraphUpdate: () => this.next(),
            };
            if (typeof args === "string") {
              options.name = args;
              options.parentCommitHash = this.refs.getCommit(
                defaultParentBranchName,
              );
            } else {
              const parentBranchName = args.from
                ? args.from.name
                : defaultParentBranchName;
              const parentCommitHash =
                this.refs.getCommit(parentBranchName) ||
                (this.refs.hasCommit(args.from) ? args.from : undefined);
              args.style = args.style || {};
              options = Object.assign({}, options, args, {
                parentCommitHash,
                style: Object.assign({}, options.style, args.style, {
                  label: Object.assign(
                    {},
                    options.style.label,
                    args.style.label,
                  ),
                }),
              });
            }
            const branch = new branch_1.Branch(options);
            this.branches.set(branch.name, branch);
            return branch;
          }
          /**
           * Return commits with data for rendering.
           */
          computeRenderedCommits() {
            const branches = this.getBranches();
            // Commits that are not associated to a branch in `branches`
            // were in a deleted branch. If the latter was merged beforehand
            // they are reachable and are rendered. Others are not
            const reachableUnassociatedCommits = (() => {
              const unassociatedCommits = new Set(
                this.commits.reduce(
                  (commits, { hash }) =>
                    !branches.has(hash) ? [...commits, hash] : commits,
                  [],
                ),
              );
              const tipsOfMergedBranches = this.commits.reduce(
                (tipsOfMergedBranches, commit) =>
                  commit.parents.length > 1
                    ? [
                        ...tipsOfMergedBranches,
                        ...commit.parents
                          .slice(1)
                          .map((parentHash) =>
                            this.commits.find(
                              ({ hash }) => parentHash === hash,
                            ),
                          ),
                      ]
                    : tipsOfMergedBranches,
                [],
              );
              const reachableCommits = new Set();
              tipsOfMergedBranches.forEach((tip) => {
                let currentCommit = tip;
                while (
                  currentCommit &&
                  unassociatedCommits.has(currentCommit.hash)
                ) {
                  reachableCommits.add(currentCommit.hash);
                  currentCommit =
                    currentCommit.parents.length > 0
                      ? this.commits.find(
                          ({ hash }) => currentCommit.parents[0] === hash,
                        )
                      : undefined;
                }
              });
              return reachableCommits;
            })();
            const commitsToRender = this.commits.filter(
              ({ hash }) =>
                branches.has(hash) || reachableUnassociatedCommits.has(hash),
            );
            const commitsWithBranches = commitsToRender.map((commit) =>
              this.withBranches(branches, commit),
            );
            const rows = graph_rows_1.createGraphRows(
              this.mode,
              commitsToRender,
            );
            const branchesOrder = new branches_order_1.BranchesOrder(
              commitsWithBranches,
              this.template.colors,
              this.branchesOrderFunction,
            );
            return (
              commitsWithBranches
                .map((commit) => commit.setRefs(this.refs))
                .map((commit) => this.withPosition(rows, branchesOrder, commit))
                // Fallback commit computed color on branch color.
                .map((commit) =>
                  commit.withDefaultColor(
                    this.getBranchDefaultColor(
                      branchesOrder,
                      commit.branchToDisplay,
                    ),
                  ),
                )
                // Tags need commit style to be computed (with default color).
                .map((commit) =>
                  commit.setTags(
                    this.tags,
                    (name) =>
                      Object.assign(
                        {},
                        this.tagStyles[name],
                        this.template.tag,
                      ),
                    (name) => this.tagRenders[name],
                  ),
                )
            );
          }
          /**
           * Return branches paths with all data required for rendering.
           *
           * @param commits List of commits with rendering data computed
           */
          computeRenderedBranchesPaths(commits) {
            return new branches_paths_1.BranchesPathsCalculator(
              commits,
              this.branches,
              this.template.commit.spacing,
              this.isVertical,
              this.isReverse,
              () =>
                branch_1.createDeletedBranch(this, this.template.branch, () =>
                  this.next(),
                ),
            ).execute();
          }
          /**
           * Set branches colors based on branches paths.
           *
           * @param commits List of graph commits
           * @param branchesPaths Branches paths to be rendered
           */
          computeBranchesColor(commits, branchesPaths) {
            const branchesOrder = new branches_order_1.BranchesOrder(
              commits,
              this.template.colors,
              this.branchesOrderFunction,
            );
            Array.from(branchesPaths).forEach(([branch]) => {
              branch.computedColor =
                branch.style.color ||
                this.getBranchDefaultColor(branchesOrder, branch.name);
            });
          }
          /**
           * Return commit messages X position for rendering.
           *
           * @param branchesPaths Branches paths to be rendered
           */
          computeCommitMessagesX(branchesPaths) {
            const numberOfColumns = Array.from(branchesPaths).length;
            return numberOfColumns * this.template.branch.spacing;
          }
          /**
           * Add `branches` property to commit.
           *
           * @param branches All branches mapped by commit hash
           * @param commit Commit
           */
          withBranches(branches, commit) {
            let commitBranches = Array.from(
              (branches.get(commit.hash) || new Set()).values(),
            );
            if (commitBranches.length === 0) {
              // No branch => branch has been deleted.
              commitBranches = [branch_1.DELETED_BRANCH_NAME];
            }
            return commit.setBranches(commitBranches);
          }
          /**
           * Get all branches from current commits.
           */
          getBranches() {
            const result = new Map();
            const queue = [];
            const branches = this.refs
              .getAllNames()
              .filter((name) => name !== "HEAD");
            branches.forEach((branch) => {
              const commitHash = this.refs.getCommit(branch);
              if (commitHash) {
                queue.push(commitHash);
              }
              while (queue.length > 0) {
                const currentHash = queue.pop();
                const current = this.commits.find(
                  ({ hash }) => hash === currentHash,
                );
                const prevBranches = result.get(currentHash) || new Set();
                prevBranches.add(branch);
                result.set(currentHash, prevBranches);
                if (current && current.parents && current.parents.length > 0) {
                  queue.push(current.parents[0]);
                }
              }
            });
            return result;
          }
          /**
           * Add position to given commit.
           *
           * @param rows Graph rows
           * @param branchesOrder Computed order of branches
           * @param commit Commit to position
           */
          withPosition(rows, branchesOrder, commit) {
            const row = rows.getRowOf(commit.hash);
            const maxRow = rows.getMaxRow();
            const order = branchesOrder.get(commit.branchToDisplay);
            switch (this.orientation) {
              default:
                return commit.setPosition({
                  x:
                    this.initCommitOffsetX +
                    this.template.branch.spacing * order,
                  y:
                    this.initCommitOffsetY +
                    this.template.commit.spacing * (maxRow - row),
                });
              case orientation_1.Orientation.VerticalReverse:
                return commit.setPosition({
                  x:
                    this.initCommitOffsetX +
                    this.template.branch.spacing * order,
                  y:
                    this.initCommitOffsetY + this.template.commit.spacing * row,
                });
              case orientation_1.Orientation.Horizontal:
                return commit.setPosition({
                  x:
                    this.initCommitOffsetX + this.template.commit.spacing * row,
                  y:
                    this.initCommitOffsetY +
                    this.template.branch.spacing * order,
                });
              case orientation_1.Orientation.HorizontalReverse:
                return commit.setPosition({
                  x:
                    this.initCommitOffsetX +
                    this.template.commit.spacing * (maxRow - row),
                  y:
                    this.initCommitOffsetY +
                    this.template.branch.spacing * order,
                });
            }
          }
          /**
           * Return the default color for given branch.
           *
           * @param branchesOrder Computed order of branches
           * @param branchName Name of the branch
           */
          getBranchDefaultColor(branchesOrder, branchName) {
            return branchesOrder.getColorOf(branchName);
          }
          /**
           * Tell each listener something new happened.
           * E.g. a rendering library will know it needs to re-render the graph.
           */
          next() {
            if (this.nextTimeoutId) {
              window.clearTimeout(this.nextTimeoutId);
            }
            // Use setTimeout() with `0` to debounce call to next tick.
            this.nextTimeoutId = window.setTimeout(() => {
              this.listeners.forEach((listener) =>
                listener(this.getRenderedData()),
              );
            }, 0);
          }
        }
        exports.GitgraphCore = GitgraphCore;
      },
      {
        "./branch": 3,
        "./branches-order": 4,
        "./branches-paths": 5,
        "./graph-rows": 10,
        "./mode": 12,
        "./orientation": 13,
        "./refs": 14,
        "./template": 16,
        "./user-api/gitgraph-user-api": 18,
        "./utils": 19,
      },
    ],
    9: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const regular_1 = require("./regular");
        class CompactGraphRows extends regular_1.RegularGraphRows {
          computeRowsFromCommits(commits) {
            commits.forEach((commit, i) => {
              let newRow = i;
              const isFirstCommit = i === 0;
              if (!isFirstCommit) {
                const parentRow = this.getRowOf(commit.parents[0]);
                const historyParent = commits[i - 1];
                newRow = Math.max(
                  parentRow + 1,
                  this.getRowOf(historyParent.hash),
                );
                const isMergeCommit = commit.parents.length > 1;
                if (isMergeCommit) {
                  // Push commit to next row to avoid collision when the branch in which
                  // the merge happens has more commits than the merged branch.
                  const mergeTargetParentRow = this.getRowOf(commit.parents[1]);
                  if (parentRow < mergeTargetParentRow) newRow++;
                }
              }
              this.rows.set(commit.hash, newRow);
            });
          }
        }
        exports.CompactGraphRows = CompactGraphRows;
      },
      { "./regular": 11 },
    ],
    10: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const mode_1 = require("../mode");
        const compact_1 = require("./compact");
        const regular_1 = require("./regular");
        exports.GraphRows = regular_1.RegularGraphRows;
        function createGraphRows(mode, commits) {
          return mode === mode_1.Mode.Compact
            ? new compact_1.CompactGraphRows(commits)
            : new regular_1.RegularGraphRows(commits);
        }
        exports.createGraphRows = createGraphRows;
      },
      { "../mode": 12, "./compact": 9, "./regular": 11 },
    ],
    11: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class RegularGraphRows {
          constructor(commits) {
            this.rows = new Map();
            this.maxRowCache = undefined;
            this.computeRowsFromCommits(commits);
          }
          getRowOf(commitHash) {
            return this.rows.get(commitHash) || 0;
          }
          getMaxRow() {
            if (this.maxRowCache === undefined) {
              this.maxRowCache =
                uniq(Array.from(this.rows.values())).length - 1;
            }
            return this.maxRowCache;
          }
          computeRowsFromCommits(commits) {
            commits.forEach((commit, i) => {
              this.rows.set(commit.hash, i);
            });
            this.maxRowCache = undefined;
          }
        }
        exports.RegularGraphRows = RegularGraphRows;
        /**
         * Creates a duplicate-free version of an array.
         *
         * Don't use lodash's `uniq` as it increased bundlesize a lot for such a
         * simple function.
         * => The way we bundle for browser seems not to work with `lodash-es`.
         * => I didn't to get tree-shaking to work with `lodash` (the CommonJS version).
         *
         * @param array Array of values
         */
        function uniq(array) {
          const set = new Set();
          array.forEach((value) => set.add(value));
          return Array.from(set);
        }
      },
      {},
    ],
    12: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var Mode;
        (function (Mode) {
          Mode["Compact"] = "compact";
        })(Mode || (Mode = {}));
        exports.Mode = Mode;
      },
      {},
    ],
    13: [
      function (require, module, exports) {
        "use strict";
        // Extracted from `gitgraph.ts` because it caused `utils` tests to fail
        // because of circular dependency between `utils` and `template`.
        // It's not clear why (the circular dependency still exist) but `Orientation`
        // was the only one causing issue. Maybe because it's an enum?
        Object.defineProperty(exports, "__esModule", { value: true });
        var Orientation;
        (function (Orientation) {
          Orientation["VerticalReverse"] = "vertical-reverse";
          Orientation["Horizontal"] = "horizontal";
          Orientation["HorizontalReverse"] = "horizontal-reverse";
        })((Orientation = exports.Orientation || (exports.Orientation = {})));
      },
      {},
    ],
    14: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class Refs {
          constructor() {
            this.commitPerName = new Map();
            this.namesPerCommit = new Map();
          }
          /**
           * Set a new reference to a commit hash.
           *
           * @param name Name of the ref (ex: "master", "v1.0")
           * @param commitHash Commit hash
           */
          set(name, commitHash) {
            const prevCommitHash = this.commitPerName.get(name);
            if (prevCommitHash) {
              this.removeNameFrom(prevCommitHash, name);
            }
            this.addNameTo(commitHash, name);
            this.addCommitTo(name, commitHash);
            return this;
          }
          /**
           * Delete a reference
           *
           * @param name Name of the reference
           */
          delete(name) {
            if (this.hasName(name)) {
              this.removeNameFrom(this.getCommit(name), name);
              this.commitPerName.delete(name);
            }
            return this;
          }
          /**
           * Get the commit hash associated with the given reference name.
           *
           * @param name Name of the ref
           */
          getCommit(name) {
            return this.commitPerName.get(name);
          }
          /**
           * Get the list of reference names associated with given commit hash.
           *
           * @param commitHash Commit hash
           */
          getNames(commitHash) {
            return this.namesPerCommit.get(commitHash) || [];
          }
          /**
           * Get all reference names known.
           */
          getAllNames() {
            return Array.from(this.commitPerName.keys());
          }
          /**
           * Returns true if given commit hash is referenced.
           *
           * @param commitHash Commit hash
           */
          hasCommit(commitHash) {
            return this.namesPerCommit.has(commitHash);
          }
          /**
           * Returns true if given reference name exists.
           *
           * @param name Name of the ref
           */
          hasName(name) {
            return this.commitPerName.has(name);
          }
          removeNameFrom(commitHash, nameToRemove) {
            const names = this.namesPerCommit.get(commitHash) || [];
            this.namesPerCommit.set(
              commitHash,
              names.filter((name) => name !== nameToRemove),
            );
          }
          addNameTo(commitHash, nameToAdd) {
            const prevNames = this.namesPerCommit.get(commitHash) || [];
            this.namesPerCommit.set(commitHash, [...prevNames, nameToAdd]);
          }
          addCommitTo(name, commitHashToAdd) {
            this.commitPerName.set(name, commitHashToAdd);
          }
        }
        exports.Refs = Refs;
      },
      {},
    ],
    15: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const template_1 = require("./template");
        const utils_1 = require("./utils");
        class Tag {
          constructor(name, style, render, commitStyle) {
            this.name = name;
            this.tagStyle = style;
            this.commitStyle = commitStyle;
            this.render = render;
          }
          /**
           * Style
           */
          get style() {
            return {
              strokeColor: this.tagStyle.strokeColor || this.commitStyle.color,
              bgColor: this.tagStyle.bgColor || this.commitStyle.color,
              color: this.tagStyle.color || "white",
              font:
                this.tagStyle.font ||
                this.commitStyle.message.font ||
                template_1.DEFAULT_FONT,
              borderRadius: utils_1.numberOptionOr(
                this.tagStyle.borderRadius,
                10,
              ),
              pointerWidth: utils_1.numberOptionOr(
                this.tagStyle.pointerWidth,
                12,
              ),
            };
          }
        }
        exports.Tag = Tag;
      },
      { "./template": 16, "./utils": 19 },
    ],
    16: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const utils_1 = require("./utils");
        /**
         * Branch merge style enum
         */
        var MergeStyle;
        (function (MergeStyle) {
          MergeStyle["Bezier"] = "bezier";
          MergeStyle["Straight"] = "straight";
        })(MergeStyle || (MergeStyle = {}));
        exports.MergeStyle = MergeStyle;
        exports.DEFAULT_FONT = "normal 12pt Calibri";
        /**
         * Gitgraph template
         *
         * Set of design rules for the rendering.
         */
        class Template {
          constructor(options) {
            // Options
            options.branch = options.branch || {};
            options.branch.label = options.branch.label || {};
            options.arrow = options.arrow || {};
            options.commit = options.commit || {};
            options.commit.dot = options.commit.dot || {};
            options.commit.message = options.commit.message || {};
            // One color per column
            this.colors = options.colors || ["#000000"];
            // Branch style
            this.branch = {
              color: options.branch.color,
              lineWidth: options.branch.lineWidth || 2,
              mergeStyle: options.branch.mergeStyle || MergeStyle.Bezier,
              spacing: utils_1.numberOptionOr(options.branch.spacing, 20),
              label: {
                display: utils_1.booleanOptionOr(
                  options.branch.label.display,
                  true,
                ),
                color: options.branch.label.color || options.commit.color,
                strokeColor:
                  options.branch.label.strokeColor || options.commit.color,
                bgColor: options.branch.label.bgColor || "white",
                font:
                  options.branch.label.font ||
                  options.commit.message.font ||
                  exports.DEFAULT_FONT,
                borderRadius: utils_1.numberOptionOr(
                  options.branch.label.borderRadius,
                  10,
                ),
              },
            };
            // Arrow style
            this.arrow = {
              size: options.arrow.size || null,
              color: options.arrow.color || null,
              offset: options.arrow.offset || 2,
            };
            // Commit style
            this.commit = {
              color: options.commit.color,
              spacing: utils_1.numberOptionOr(options.commit.spacing, 25),
              hasTooltipInCompactMode: utils_1.booleanOptionOr(
                options.commit.hasTooltipInCompactMode,
                true,
              ),
              dot: {
                color: options.commit.dot.color || options.commit.color,
                size: options.commit.dot.size || 3,
                strokeWidth: utils_1.numberOptionOr(
                  options.commit.dot.strokeWidth,
                  0,
                ),
                strokeColor: options.commit.dot.strokeColor,
                font:
                  options.commit.dot.font ||
                  options.commit.message.font ||
                  "normal 10pt Calibri",
              },
              message: {
                display: utils_1.booleanOptionOr(
                  options.commit.message.display,
                  true,
                ),
                displayAuthor: utils_1.booleanOptionOr(
                  options.commit.message.displayAuthor,
                  true,
                ),
                displayHash: utils_1.booleanOptionOr(
                  options.commit.message.displayHash,
                  true,
                ),
                color: options.commit.message.color || options.commit.color,
                font: options.commit.message.font || exports.DEFAULT_FONT,
              },
            };
            // Tag style
            // This one is computed in the Tag instance. It needs Commit style
            // that is partially computed at runtime (for colors).
            this.tag = options.tag || {};
          }
        }
        exports.Template = Template;
        /**
         * Black arrow template
         */
        const blackArrowTemplate = new Template({
          colors: ["#6963FF", "#47E8D4", "#6BDB52", "#E84BA5", "#FFA657"],
          branch: {
            color: "#000000",
            lineWidth: 4,
            spacing: 50,
            mergeStyle: MergeStyle.Straight,
          },
          commit: {
            spacing: 60,
            dot: {
              size: 16,
              strokeColor: "#000000",
              strokeWidth: 4,
            },
            message: {
              color: "black",
            },
          },
          arrow: {
            size: 16,
            offset: -1.5,
          },
        });
        exports.blackArrowTemplate = blackArrowTemplate;
        /**
         * Metro template
         */
        const metroTemplate = new Template({
          colors: ["#979797", "#008fb5", "#f1c109"],
          branch: {
            lineWidth: 10,
            spacing: 50,
          },
          commit: {
            spacing: 80,
            dot: {
              size: 14,
            },
            message: {
              font: "normal 14pt Arial",
            },
          },
        });
        exports.metroTemplate = metroTemplate;
        var TemplateName;
        (function (TemplateName) {
          TemplateName["Metro"] = "metro";
          TemplateName["BlackArrow"] = "blackarrow";
        })(TemplateName || (TemplateName = {}));
        exports.TemplateName = TemplateName;
        /**
         * Extend an existing template with new options.
         *
         * @param selectedTemplate Template to extend
         * @param options Template options
         */
        function templateExtend(selectedTemplate, options) {
          const template = getTemplate(selectedTemplate);
          if (!options.branch) options.branch = {};
          if (!options.commit) options.commit = {};
          // This is tedious, but it seems acceptable so we don't need lodash
          // as we want to keep bundlesize small.
          return {
            colors: options.colors || template.colors,
            arrow: Object.assign({}, template.arrow, options.arrow),
            branch: Object.assign({}, template.branch, options.branch, {
              label: Object.assign(
                {},
                template.branch.label,
                options.branch.label,
              ),
            }),
            commit: Object.assign({}, template.commit, options.commit, {
              dot: Object.assign({}, template.commit.dot, options.commit.dot),
              message: Object.assign(
                {},
                template.commit.message,
                options.commit.message,
              ),
            }),
            tag: Object.assign({}, template.tag, options.tag),
          };
        }
        exports.templateExtend = templateExtend;
        /**
         * Resolve the template to use regarding given `template` value.
         *
         * @param template Selected template name, or instance.
         */
        function getTemplate(template) {
          if (!template) return metroTemplate;
          if (typeof template === "string") {
            return {
              [TemplateName.BlackArrow]: blackArrowTemplate,
              [TemplateName.Metro]: metroTemplate,
            }[template];
          }
          return template;
        }
        exports.getTemplate = getTemplate;
      },
      { "./utils": 19 },
    ],
    17: [
      function (require, module, exports) {
        "use strict";
        var __rest =
          (this && this.__rest) ||
          function (s, e) {
            var t = {};
            for (var p in s)
              if (
                Object.prototype.hasOwnProperty.call(s, p) &&
                e.indexOf(p) < 0
              )
                t[p] = s[p];
            if (s != null && typeof Object.getOwnPropertySymbols === "function")
              for (
                var i = 0, p = Object.getOwnPropertySymbols(s);
                i < p.length;
                i++
              ) {
                if (
                  e.indexOf(p[i]) < 0 &&
                  Object.prototype.propertyIsEnumerable.call(s, p[i])
                )
                  t[p[i]] = s[p[i]];
              }
            return t;
          };
        Object.defineProperty(exports, "__esModule", { value: true });
        const commit_1 = require("../commit");
        const branch_1 = require("../branch");
        const utils_1 = require("../utils");
        class BranchUserApi {
          // tslint:enable:variable-name
          constructor(branch, graph, onGraphUpdate) {
            this._branch = branch;
            this.name = branch.name;
            this._graph = graph;
            this._onGraphUpdate = onGraphUpdate;
          }
          branch(args) {
            if (this._branch.isDeleted() && !this._isReferenced()) {
              throw new Error(
                `Cannot branch from the deleted branch "${this.name}"`,
              );
            }
            const options = typeof args === "string" ? { name: args } : args;
            options.from = this;
            return this._graph.createBranch(options).getUserApi();
          }
          commit(options) {
            if (this._branch.isDeleted() && !this._isReferenced()) {
              throw new Error(
                `Cannot commit on the deleted branch "${this.name}"`,
              );
            }
            // Deal with shorter syntax
            if (typeof options === "string") options = { subject: options };
            if (!options) options = {};
            this._commitWithParents(options, []);
            this._onGraphUpdate();
            return this;
          }
          /**
           * Delete the branch (as `git branch -d`)
           */
          delete() {
            // Delete all references to the branch from the graph (graph.branches and graph.refs)
            // and from the commits (commit.refs). Then, make the branch instance a deleted branch.
            // Like in git, the commits and tags in the deleted branch remain in the graph
            if (
              this._graph.refs.getCommit("HEAD") ===
              this._graph.refs.getCommit(this.name)
            ) {
              throw new Error(
                `Cannot delete the checked out branch "${this.name}"`,
              );
            }
            const branchCommits = (function* (graph, branch) {
              const lookupCommit = (graph, commitHash) => {
                return graph.commits.find(({ hash }) => hash === commitHash);
              };
              let currentCommit = lookupCommit(
                graph,
                graph.refs.getCommit(branch.name),
              );
              while (
                currentCommit &&
                currentCommit.hash !== branch.parentCommitHash
              ) {
                yield currentCommit;
                currentCommit = lookupCommit(graph, currentCommit.parents[0]);
              }
              return;
            })(this._graph, this._branch);
            [...branchCommits].forEach((commit) => {
              commit.refs = commit.refs.filter(
                (branchName) => branchName !== this.name,
              );
            });
            this._graph.refs.delete(this.name);
            this._graph.branches.delete(this.name);
            this._branch = branch_1.createDeletedBranch(
              this._graph,
              this._branch.style,
              () => {
                // do nothing
              },
            );
            this._onGraphUpdate();
            return this;
          }
          merge(...args) {
            if (this._branch.isDeleted() && !this._isReferenced()) {
              throw new Error(
                `Cannot merge to the deleted branch "${this.name}"`,
              );
            }
            let options = args[0];
            if (!isBranchMergeOptions(options)) {
              options = {
                branch: args[0],
                fastForward: false,
                commitOptions: { subject: args[1] },
              };
            }
            const { branch, fastForward, commitOptions } = options;
            const branchName =
              typeof branch === "string" ? branch : branch.name;
            const branchLastCommitHash = this._graph.refs.getCommit(branchName);
            if (!branchLastCommitHash) {
              throw new Error(`The branch called "${branchName}" is unknown`);
            }
            let canFastForward = false;
            if (fastForward) {
              const lastCommitHash = this._graph.refs.getCommit(
                this._branch.name,
              );
              if (lastCommitHash) {
                canFastForward = this._areCommitsConnected(
                  lastCommitHash,
                  branchLastCommitHash,
                );
              }
            }
            if (fastForward && canFastForward) {
              this._fastForwardTo(branchLastCommitHash);
            } else {
              this._commitWithParents(
                Object.assign({}, commitOptions, {
                  subject:
                    (commitOptions && commitOptions.subject) ||
                    `Merge branch ${branchName}`,
                }),
                [branchLastCommitHash],
              );
            }
            this._onGraphUpdate();
            return this;
          }
          tag(options) {
            if (this._branch.isDeleted() && !this._isReferenced()) {
              throw new Error(
                `Cannot tag on the deleted branch "${this.name}"`,
              );
            }
            if (typeof options === "string") {
              this._graph
                .getUserApi()
                .tag({ name: options, ref: this._branch.name });
            } else {
              this._graph
                .getUserApi()
                .tag(Object.assign({}, options, { ref: this._branch.name }));
            }
            return this;
          }
          /**
           * Checkout onto this branch and update "HEAD" in refs
           */
          checkout() {
            if (this._branch.isDeleted() && !this._isReferenced()) {
              throw new Error(
                `Cannot checkout the deleted branch "${this.name}"`,
              );
            }
            const target = this._branch;
            const headCommit = this._graph.refs.getCommit(target.name);
            this._graph.currentBranch = target;
            // Update "HEAD" in refs when the target branch is not empty
            if (headCommit) {
              this._graph.refs.set("HEAD", headCommit);
            }
            return this;
          }
          // tslint:disable:variable-name - Prefix `_` = explicitly private for JS users
          _commitWithParents(options, parents) {
            const parentOnSameBranch = this._graph.refs.getCommit(
              this._branch.name,
            );
            if (parentOnSameBranch) {
              parents.unshift(parentOnSameBranch);
            } else if (this._branch.parentCommitHash) {
              parents.unshift(this._branch.parentCommitHash);
            }
            const { tag } = options,
              commitOptions = __rest(options, ["tag"]);
            const commit = new commit_1.Commit(
              Object.assign(
                {
                  hash: this._graph.generateCommitHash(),
                  author:
                    this._branch.commitDefaultOptions.author ||
                    this._graph.author,
                  subject:
                    this._branch.commitDefaultOptions.subject ||
                    this._graph.commitMessage,
                },
                commitOptions,
                { parents, style: this._getCommitStyle(options.style) },
              ),
            );
            if (parentOnSameBranch) {
              // Take all the refs from the parent
              const parentRefs = this._graph.refs.getNames(parentOnSameBranch);
              parentRefs.forEach((ref) =>
                this._graph.refs.set(ref, commit.hash),
              );
            } else {
              // Set the branch ref
              this._graph.refs.set(this._branch.name, commit.hash);
            }
            // Add the new commit
            this._graph.commits.push(commit);
            // Move HEAD on the last commit
            this.checkout();
            // Add a tag to the commit if `option.tag` is provide
            if (tag) this.tag(tag);
          }
          _areCommitsConnected(parentCommitHash, childCommitHash) {
            const childCommit = this._graph.commits.find(
              ({ hash }) => childCommitHash === hash,
            );
            if (!childCommit) return false;
            const isFirstCommitOfGraph = childCommit.parents.length === 0;
            if (isFirstCommitOfGraph) return false;
            if (childCommit.parents.includes(parentCommitHash)) {
              return true;
            }
            // `childCommitHash` is not a direct child of `parentCommitHash`.
            // But maybe one of `childCommitHash` parent is.
            return childCommit.parents.some((directParentHash) =>
              this._areCommitsConnected(parentCommitHash, directParentHash),
            );
          }
          _fastForwardTo(commitHash) {
            this._graph.refs.set(this._branch.name, commitHash);
          }
          _getCommitStyle(style = {}) {
            return Object.assign(
              {},
              utils_1.withoutUndefinedKeys(this._graph.template.commit),
              utils_1.withoutUndefinedKeys(
                this._branch.commitDefaultOptions.style,
              ),
              style,
              {
                message: Object.assign(
                  {},
                  utils_1.withoutUndefinedKeys(
                    this._graph.template.commit.message,
                  ),
                  utils_1.withoutUndefinedKeys(
                    this._branch.commitDefaultOptions.style.message,
                  ),
                  style.message,
                  utils_1.withoutUndefinedKeys({
                    display:
                      this._graph.shouldDisplayCommitMessage && undefined,
                  }),
                ),
                dot: Object.assign(
                  {},
                  utils_1.withoutUndefinedKeys(this._graph.template.commit.dot),
                  utils_1.withoutUndefinedKeys(
                    this._branch.commitDefaultOptions.style.dot,
                  ),
                  style.dot,
                ),
              },
            );
          }
          _isReferenced() {
            return (
              this._graph.branches.has(this.name) ||
              this._graph.refs.hasName(this.name) ||
              this._graph.commits
                .reduce((allNames, { refs }) => [...allNames, ...refs], [])
                .includes(this.name)
            );
          }
        }
        exports.BranchUserApi = BranchUserApi;
        function isBranchMergeOptions(options) {
          return (
            typeof options === "object" && !(options instanceof BranchUserApi)
          );
        }
      },
      { "../branch": 3, "../commit": 7, "../utils": 19 },
    ],
    18: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const commit_1 = require("../commit");
        const branch_1 = require("../branch");
        const refs_1 = require("../refs");
        class GitgraphUserApi {
          // tslint:enable:variable-name
          constructor(graph, onGraphUpdate) {
            this._graph = graph;
            this._onGraphUpdate = onGraphUpdate;
          }
          /**
           * Clear everything (as `rm -rf .git && git init`).
           */
          clear() {
            this._graph.refs = new refs_1.Refs();
            this._graph.tags = new refs_1.Refs();
            this._graph.commits = [];
            this._graph.branches = new Map();
            this._graph.currentBranch = this._graph.createBranch("master");
            this._onGraphUpdate();
            return this;
          }
          commit(options) {
            this._graph.currentBranch.getUserApi().commit(options);
            return this;
          }
          branch(args) {
            return this._graph.createBranch(args).getUserApi();
          }
          tag(...args) {
            // Deal with shorter syntax
            let name;
            let ref;
            let style;
            let render;
            if (typeof args[0] === "string") {
              name = args[0];
              ref = args[1];
            } else {
              name = args[0].name;
              ref = args[0].ref;
              style = args[0].style;
              render = args[0].render;
            }
            if (!ref) {
              const head = this._graph.refs.getCommit("HEAD");
              if (!head) return this;
              ref = head;
            }
            let commitHash;
            if (this._graph.refs.hasCommit(ref)) {
              // `ref` is a `Commit["hash"]`
              commitHash = ref;
            }
            if (this._graph.refs.hasName(ref)) {
              // `ref` is a `Branch["name"]`
              commitHash = this._graph.refs.getCommit(ref);
            }
            if (!commitHash) {
              throw new Error(`The ref "${ref}" does not exist`);
            }
            this._graph.tags.set(name, commitHash);
            this._graph.tagStyles[name] = style;
            this._graph.tagRenders[name] = render;
            this._onGraphUpdate();
            return this;
          }
          /**
           * Import a JSON.
           *
           * Data can't be typed since it comes from a JSON.
           * We validate input format and throw early if something is invalid.
           *
           * @experimental
           * @param data JSON from `git2json` output
           */
          import(data) {
            const invalidData = new Error(
              "Only `git2json` format is supported for imported data.",
            );
            // We manually validate input data instead of using a lib like yup.
            // => this is to keep bundlesize small.
            if (!Array.isArray(data)) {
              throw invalidData;
            }
            const areDataValid = data.every((options) => {
              return (
                typeof options === "object" &&
                typeof options.author === "object" &&
                Array.isArray(options.refs)
              );
            });
            if (!areDataValid) {
              throw invalidData;
            }
            const commitOptionsList = data
              .map((options) =>
                Object.assign({}, options, {
                  style: Object.assign({}, this._graph.template.commit, {
                    message: Object.assign(
                      {},
                      this._graph.template.commit.message,
                      { display: this._graph.shouldDisplayCommitMessage },
                    ),
                  }),
                  author: `${options.author.name} <${options.author.email}>`,
                }),
              )
              // Git2json outputs is reverse-chronological.
              // We need to commit it chronological order.
              .reverse();
            // Use validated `value`.
            this.clear();
            this._graph.commits = commitOptionsList.map(
              (options) => new commit_1.Commit(options),
            );
            // Create tags & refs.
            commitOptionsList.forEach(({ refs, hash }) => {
              if (!refs) return;
              if (!hash) return;
              const TAG_PREFIX = "tag: ";
              const tags = refs
                .map((ref) => ref.split(TAG_PREFIX))
                .map(([_, tag]) => tag)
                .filter((tag) => typeof tag === "string");
              tags.forEach((tag) => this._graph.tags.set(tag, hash));
              refs
                .filter((ref) => !ref.startsWith(TAG_PREFIX))
                .forEach((ref) => this._graph.refs.set(ref, hash));
            });
            // Create branches.
            const branches = this._getBranches();
            this._graph.commits
              .map((commit) => this._withBranches(branches, commit))
              .reduce((mem, commit) => {
                if (!commit.branches) return mem;
                commit.branches.forEach((branch) => mem.add(branch));
                return mem;
              }, new Set())
              .forEach((branch) => this.branch(branch));
            this._onGraphUpdate();
            return this;
          }
          // tslint:disable:variable-name - Prefix `_` = explicitly private for JS users
          // TODO: get rid of these duplicated private methods.
          //
          // These belong to Gitgraph. It is duplicated because of `import()`.
          // `import()` should use regular user API instead.
          _withBranches(branches, commit) {
            let commitBranches = Array.from(
              (branches.get(commit.hash) || new Set()).values(),
            );
            if (commitBranches.length === 0) {
              // No branch => branch has been deleted.
              commitBranches = [branch_1.DELETED_BRANCH_NAME];
            }
            return commit.setBranches(commitBranches);
          }
          _getBranches() {
            const result = new Map();
            const queue = [];
            const branches = this._graph.refs
              .getAllNames()
              .filter((name) => name !== "HEAD");
            branches.forEach((branch) => {
              const commitHash = this._graph.refs.getCommit(branch);
              if (commitHash) {
                queue.push(commitHash);
              }
              while (queue.length > 0) {
                const currentHash = queue.pop();
                const current = this._graph.commits.find(
                  ({ hash }) => hash === currentHash,
                );
                const prevBranches = result.get(currentHash) || new Set();
                prevBranches.add(branch);
                result.set(currentHash, prevBranches);
                if (current && current.parents && current.parents.length > 0) {
                  queue.push(current.parents[0]);
                }
              }
            });
            return result;
          }
        }
        exports.GitgraphUserApi = GitgraphUserApi;
      },
      { "../branch": 3, "../commit": 7, "../refs": 14 },
    ],
    19: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const orientation_1 = require("./orientation");
        /**
         * Provide a default value to a boolean.
         * @param value
         * @param defaultValue
         */
        function booleanOptionOr(value, defaultValue) {
          return typeof value === "boolean" ? value : defaultValue;
        }
        exports.booleanOptionOr = booleanOptionOr;
        /**
         * Provide a default value to a number.
         * @param value
         * @param defaultValue
         */
        function numberOptionOr(value, defaultValue) {
          return typeof value === "number" ? value : defaultValue;
        }
        exports.numberOptionOr = numberOptionOr;
        /**
         * Creates an object composed of the picked object properties.
         * @param obj The source object
         * @param paths The property paths to pick
         */
        function pick(obj, paths) {
          return Object.assign(
            {},
            paths.reduce(
              (mem, key) => Object.assign({}, mem, { [key]: obj[key] }),
              {},
            ),
          );
        }
        exports.pick = pick;
        /**
         * Print a light version of commits into the console.
         * @param commits List of commits
         * @param paths The property paths to pick
         */
        function debug(commits, paths) {
          // tslint:disable-next-line:no-console
          console.log(
            JSON.stringify(
              commits.map((commit) => pick(commit, paths)),
              null,
              2,
            ),
          );
        }
        exports.debug = debug;
        /**
         * Return true if is undefined.
         *
         * @param obj
         */
        function isUndefined(obj) {
          return obj === undefined;
        }
        exports.isUndefined = isUndefined;
        /**
         * Return a version of the object without any undefined keys.
         *
         * @param obj
         */
        function withoutUndefinedKeys(obj = {}) {
          return Object.keys(obj).reduce(
            (mem, key) =>
              isUndefined(obj[key])
                ? mem
                : Object.assign({}, mem, { [key]: obj[key] }),
            {},
          );
        }
        exports.withoutUndefinedKeys = withoutUndefinedKeys;
        /**
         * Return a string ready to use in `svg.path.d` to draw an arrow from params.
         *
         * @param graph Graph context
         * @param parent Parent commit of the target commit
         * @param commit Target commit
         */
        function arrowSvgPath(graph, parent, commit) {
          const commitRadius = commit.style.dot.size;
          const size = graph.template.arrow.size;
          const h = commitRadius + graph.template.arrow.offset;
          // Delta between left & right (radian)
          const delta = Math.PI / 7;
          // Alpha angle between parent & commit (radian)
          const alpha = getAlpha(graph, parent, commit);
          // Top
          const x1 = h * Math.cos(alpha);
          const y1 = h * Math.sin(alpha);
          // Bottom right
          const x2 = (h + size) * Math.cos(alpha - delta);
          const y2 = (h + size) * Math.sin(alpha - delta);
          // Bottom center
          const x3 = (h + size / 2) * Math.cos(alpha);
          const y3 = (h + size / 2) * Math.sin(alpha);
          // Bottom left
          const x4 = (h + size) * Math.cos(alpha + delta);
          const y4 = (h + size) * Math.sin(alpha + delta);
          return `M${x1},${y1} L${x2},${y2} Q${x3},${y3} ${x4},${y4} L${x4},${y4}`;
        }
        exports.arrowSvgPath = arrowSvgPath;
        function getAlpha(graph, parent, commit) {
          const deltaX = parent.x - commit.x;
          const deltaY = parent.y - commit.y;
          const commitSpacing = graph.template.commit.spacing;
          let alphaY;
          let alphaX;
          // Angle usually start from previous commit Y position:
          //
          // o
          // ↑ ↖ ︎
          // o  |  <-- path is straight until last commit Y position
          // ↑  o
          // | ↗︎
          // o
          //
          // So we can to default to commit spacing.
          // For horizontal orientation => same with commit X position.
          switch (graph.orientation) {
            case orientation_1.Orientation.Horizontal:
              alphaY = deltaY;
              alphaX = -commitSpacing;
              break;
            case orientation_1.Orientation.HorizontalReverse:
              alphaY = deltaY;
              alphaX = commitSpacing;
              break;
            case orientation_1.Orientation.VerticalReverse:
              alphaY = -commitSpacing;
              alphaX = deltaX;
              break;
            default:
              alphaY = commitSpacing;
              alphaX = deltaX;
              break;
          }
          // If commit is distant from its parent, there should be no angle.
          //
          //    o ︎
          //    ↑  <-- arrow is like previous commit was on same X position
          // o  |
          // | /
          // o
          //
          // For horizontal orientation => same with commit Y position.
          if (graph.isVertical) {
            if (Math.abs(deltaY) > commitSpacing) alphaX = 0;
          } else {
            if (Math.abs(deltaX) > commitSpacing) alphaY = 0;
          }
          if (graph.reverseArrow) {
            alphaY *= -1;
            alphaX *= -1;
          }
          return Math.atan2(alphaY, alphaX);
        }
      },
      { "./orientation": 13 },
    ],
    20: [
      function (require, module, exports) {
        (function (global, factory) {
          typeof exports === "object" && typeof module !== "undefined"
            ? factory(exports, require("react"), require("@gitgraph/core"))
            : typeof define === "function" && define.amd
            ? define(["exports", "react", "@gitgraph/core"], factory)
            : factory(
                (global.GitgraphReact = {}),
                global.React,
                global.gitgraph.core,
              );
        })(this, function (exports, React, core) {
          "use strict";

          function DefaultBranchLabel(_a) {
            var branch = _a.branch,
              commit = _a.commit;
            var _b = React.useState({
                textWidth: 0,
                textHeight: 0,
              }),
              textSizing = _b[0],
              setTextSizing = _b[1];
            var getSizing = React.useCallback(function (node) {
              if (!node) return;
              var box = node.getBBox();
              setTextSizing({ textWidth: box.width, textHeight: box.height });
            }, []);
            var boxWidth = textSizing.textWidth + 2 * BranchLabel.paddingX;
            var boxHeight = textSizing.textHeight + 2 * BranchLabel.paddingY;
            return React.createElement(
              "g",
              null,
              React.createElement("rect", {
                stroke: branch.style.label.strokeColor || commit.style.color,
                fill: branch.style.label.bgColor,
                rx: branch.style.label.borderRadius,
                width: boxWidth,
                height: boxHeight,
              }),
              React.createElement(
                "text",
                {
                  ref: getSizing,
                  fill: branch.style.label.color || commit.style.color,
                  style: { font: branch.style.label.font },
                  alignmentBaseline: "middle",
                  dominantBaseline: "middle",
                  x: BranchLabel.paddingX,
                  y: boxHeight / 2,
                },
                branch.name,
              ),
            );
          }
          var BranchLabel = React.forwardRef(function (props, ref) {
            var branch = props.branch,
              commit = props.commit,
              branchLabelX = props.branchLabelX;
            if (!branch.style.label.display) return null;
            if (!props.gitgraph.branchLabelOnEveryCommit) {
              var commitHash = props.gitgraph.refs.getCommit(branch.name);
              if (commit.hash !== commitHash) return null;
            }
            // For the moment, we don't handle multiple branch labels.
            // To do so, we'd need to reposition each of them appropriately.
            if (commit.branchToDisplay !== branch.name) return null;
            var branchLabel = branch.renderLabel
              ? branch.renderLabel(branch)
              : React.createElement(DefaultBranchLabel, {
                  branch: branch,
                  commit: commit,
                });
            if (props.gitgraph.isVertical) {
              return React.createElement(
                "g",
                {
                  ref: ref,
                  transform: "translate(" + (branchLabelX || 0) + ", 0)",
                },
                branchLabel,
              );
            } else {
              var commitDotSize = commit.style.dot.size * 2;
              var horizontalMarginTop = 10;
              var y = commitDotSize + horizontalMarginTop;
              return React.createElement(
                "g",
                {
                  ref: ref,
                  transform: "translate(" + commit.x + ", " + y + ")",
                },
                branchLabel,
              );
            }
          });
          BranchLabel.paddingX = 10;
          BranchLabel.paddingY = 5;

          var __extends$1 =
            (undefined && undefined.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          var Tooltip = /** @class */ (function (_super) {
            __extends$1(Tooltip, _super);
            function Tooltip() {
              var _this =
                (_super !== null && _super.apply(this, arguments)) || this;
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
                "Q " +
                  offset +
                  "," +
                  boxHeight / 2 +
                  " " +
                  (offset + radius) +
                  "," +
                  boxHeight / 2,
                "H " + (boxWidth - radius),
                "Q " +
                  boxWidth +
                  "," +
                  boxHeight / 2 +
                  " " +
                  boxWidth +
                  "," +
                  (boxHeight / 2 - radius),
                "V -" + (boxHeight / 2 - radius),
                "Q " +
                  boxWidth +
                  ",-" +
                  boxHeight / 2 +
                  " " +
                  (boxWidth - radius) +
                  ",-" +
                  boxHeight / 2,
                "H " + (offset + radius),
                "Q " +
                  offset +
                  ",-" +
                  boxHeight / 2 +
                  " " +
                  offset +
                  ",-" +
                  (boxHeight / 2 - radius),
                "V -" + offset,
                "z",
              ].join(" ");
              return React.createElement(
                "g",
                {
                  transform:
                    "translate(" + commitSize + ", " + commitSize / 2 + ")",
                },
                React.createElement("path", { d: path, fill: "#EEE" }),
                React.createElement(
                  "text",
                  {
                    ref: this.$text,
                    x: offset + padding,
                    y: 0,
                    alignmentBaseline: "central",
                    fill: "#333",
                  },
                  this.props.children,
                ),
              );
            };
            Tooltip.padding = 10;
            return Tooltip;
          })(React.Component);

          var Dot = function (_a) {
            var commit = _a.commit,
              onMouseOver = _a.onMouseOver,
              onMouseOut = _a.onMouseOut;
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
              React.createElement(
                React.Fragment,
                null,
                React.createElement(
                  "defs",
                  null,
                  React.createElement("circle", {
                    id: commit.hash,
                    cx: commit.style.dot.size,
                    cy: commit.style.dot.size,
                    r: commit.style.dot.size,
                    fill: commit.style.dot.color,
                  }),
                  React.createElement(
                    "clipPath",
                    { id: "clip-" + commit.hash },
                    React.createElement("use", {
                      xlinkHref: "#" + commit.hash,
                    }),
                  ),
                ),
                React.createElement(
                  "g",
                  {
                    onClick: commit.onClick,
                    onMouseOver: onMouseOver,
                    onMouseOut: onMouseOut,
                  },
                  React.createElement("use", {
                    xlinkHref: "#" + commit.hash,
                    clipPath: "url(#clip-" + commit.hash + ")",
                    stroke: commit.style.dot.strokeColor,
                    strokeWidth:
                      commit.style.dot.strokeWidth &&
                      commit.style.dot.strokeWidth * 2,
                  }),
                  commit.dotText &&
                    React.createElement(
                      "text",
                      {
                        alignmentBaseline: "central",
                        textAnchor: "middle",
                        x: commit.style.dot.size,
                        y: commit.style.dot.size,
                        style: { font: commit.style.dot.font },
                      },
                      commit.dotText,
                    ),
                ),
              )
            );
          };

          var __extends$2 =
            (undefined && undefined.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          var Arrow = /** @class */ (function (_super) {
            __extends$2(Arrow, _super);
            function Arrow() {
              return (_super !== null && _super.apply(this, arguments)) || this;
            }
            Arrow.prototype.render = function () {
              var _this = this;
              var parent = this.props.commits.find(function (_a) {
                var hash = _a.hash;
                return hash === _this.props.parentHash;
              });
              if (!parent) return null;
              // Starting point, relative to commit
              var origin = this.props.gitgraph.reverseArrow
                ? {
                    x:
                      this.props.commitRadius +
                      (parent.x - this.props.commit.x),
                    y:
                      this.props.commitRadius +
                      (parent.y - this.props.commit.y),
                  }
                : { x: this.props.commitRadius, y: this.props.commitRadius };
              return React.createElement(
                "g",
                { transform: "translate(" + origin.x + ", " + origin.y + ")" },
                React.createElement("path", {
                  d: core.arrowSvgPath(
                    this.props.gitgraph,
                    parent,
                    this.props.commit,
                  ),
                  fill: this.props.gitgraph.template.arrow.color,
                }),
              );
            };
            return Arrow;
          })(React.Component);

          var Message = React.forwardRef(function (props, ref) {
            var commit = props.commit,
              messageX = props.messageX;
            if (commit.renderMessage) {
              return React.createElement(
                "g",
                { ref: ref, transform: "translate(" + messageX + ", 0)" },
                commit.renderMessage(commit),
              );
            }
            var body = null;
            if (commit.body) {
              body = React.createElement(
                "foreignObject",
                { width: "600", x: "10" },
                React.createElement("p", null, commit.body),
              );
            }
            // Use commit dot radius to align text with the middle of the dot.
            var y = commit.style.dot.size;
            return React.createElement(
              "g",
              { ref: ref, transform: "translate(" + messageX + ", " + y + ")" },
              React.createElement(
                "text",
                {
                  alignmentBaseline: "central",
                  fill: commit.style.message.color,
                  style: { font: commit.style.message.font },
                  onClick: commit.onMessageClick,
                },
                commit.message,
              ),
              body,
            );
          });

          var TAG_PADDING_X = 10;
          var TAG_PADDING_Y = 5;
          function DefaultTag(props) {
            var _a = React.useState({ textWidth: 0, textHeight: 0 }),
              state = _a[0],
              setState = _a[1];
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
              "Q " +
                offset +
                "," +
                boxHeight / 2 +
                " " +
                (offset + radius) +
                "," +
                boxHeight / 2,
              "H " + (boxWidth - radius),
              "Q " +
                boxWidth +
                "," +
                boxHeight / 2 +
                " " +
                boxWidth +
                "," +
                (boxHeight / 2 - radius),
              "V " + -(boxHeight / 2 - radius),
              "Q " +
                boxWidth +
                ",-" +
                boxHeight / 2 +
                " " +
                (boxWidth - radius) +
                ",-" +
                boxHeight / 2,
              "H " + (offset + radius),
              "Q " +
                offset +
                ",-" +
                boxHeight / 2 +
                " " +
                offset +
                ",-" +
                boxHeight / 2,
              "V -" + boxHeight / 2,
              "z",
            ].join(" ");
            return React.createElement(
              "g",
              null,
              React.createElement("path", {
                d: path,
                fill: tag.style.bgColor,
                stroke: tag.style.strokeColor,
              }),
              React.createElement(
                "text",
                {
                  ref: $text,
                  fill: tag.style.color,
                  style: { font: tag.style.font },
                  alignmentBaseline: "middle",
                  dominantBaseline: "middle",
                  x: offset + TAG_PADDING_X,
                  y: 0,
                },
                tag.name,
              ),
            );
          }
          var Tag = React.forwardRef(function (props, ref) {
            var tag = props.tag,
              commit = props.commit,
              tagX = props.tagX;
            return React.createElement(
              "g",
              {
                ref: ref,
                transform:
                  "translate(" +
                  (tagX || 0) +
                  ", " +
                  commit.style.dot.size +
                  ")",
              },
              tag.render
                ? tag.render(tag.name, tag.style)
                : React.createElement(DefaultTag, { tag: tag }),
            );
          });

          var Commit = function (props) {
            var commit = props.commit,
              commits = props.commits,
              gitgraph = props.gitgraph,
              commitMessagesX = props.commitMessagesX;
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
            var _a = React.useState(0),
              branchLabelX = _a[0],
              setBranchLabelX = _a[1];
            var _b = React.useState([]),
              tagXs = _b[0],
              setTagXs = _b[1];
            var _c = React.useState(0),
              messageX = _c[0],
              setMessageX = _c[1];
            var arrows = React.useMemo(
              function () {
                if (!gitgraph.template.arrow.size) return null;
                var commitRadius = commit.style.dot.size;
                return commit.parents.map(function (parentHash) {
                  return React.createElement(Arrow, {
                    key: parentHash,
                    commits: commits,
                    commit: commit,
                    gitgraph: gitgraph,
                    parentHash: parentHash,
                    commitRadius: commitRadius,
                  });
                });
              },
              [commits, commit, gitgraph],
            );
            var branchLabels = React.useMemo(
              function () {
                // @gitgraph/core could compute branch labels into commits directly.
                // That will make it easier to retrieve them, just like tags.
                var branches = Array.from(gitgraph.branches.values());
                return branches.map(function (branch) {
                  return React.createElement(BranchLabel, {
                    key: branch.name,
                    gitgraph: gitgraph,
                    branch: branch,
                    commit: commit,
                    ref: branchLabelRef,
                    branchLabelX: branchLabelX,
                  });
                });
              },
              [gitgraph, commit, branchLabelX],
            );
            var tags = React.useMemo(
              function () {
                tagRefs.current = [];
                if (!commit.tags) return null;
                if (gitgraph.isHorizontal) return null;
                return commit.tags.map(function (tag, i) {
                  return React.createElement(Tag, {
                    key: commit.hashAbbrev + "-" + tag.name,
                    commit: commit,
                    tag: tag,
                    ref: function (r) {
                      return (tagRefs.current[i] = r);
                    },
                    tagX: tagXs[i] || 0,
                  });
                });
              },
              [commit, gitgraph, tagXs],
            );
            var _d = props.getWithCommitOffset(commit),
              x = _d.x,
              y = _d.y;
            // positionCommitsElements
            React.useLayoutEffect(
              function () {
                if (gitgraph.isHorizontal) {
                  // Elements don't appear on horizontal mode, yet.
                  return;
                }
                var padding = 10;
                var translateX = commitMessagesX;
                if (branchLabelRef.current) {
                  setBranchLabelX(translateX);
                  // For some reason, one paddingX is missing in BBox width.
                  var branchLabelWidth =
                    branchLabelRef.current.getBBox().width +
                    BranchLabel.paddingX;
                  translateX += branchLabelWidth + padding;
                }
                var allTagXs = tagRefs.current.map(function (tag) {
                  if (!tag) return 0;
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
              },
              [tagRefs, gitgraph, commitMessagesX],
            );
            var shouldRenderTooltip =
              props.currentCommitOver === commit &&
              (props.gitgraph.isHorizontal ||
                (props.gitgraph.mode === core.Mode.Compact &&
                  commit.style.hasTooltipInCompactMode));
            if (shouldRenderTooltip) {
              props.setTooltip(
                React.createElement(
                  "g",
                  { transform: "translate(" + x + ", " + y + ")" },
                  React.createElement(
                    Tooltip,
                    { commit: commit },
                    commit.hashAbbrev,
                    " - ",
                    commit.subject,
                  ),
                ),
              );
            }
            return React.createElement(
              "g",
              { transform: "translate(" + x + ", " + y + ")" },
              React.createElement(Dot, {
                commit: commit,
                onMouseOver: function () {
                  props.setCurrentCommitOver(commit);
                  commit.onMouseOver();
                },
                onMouseOut: function () {
                  props.setCurrentCommitOver(null);
                  props.setTooltip(null);
                  commit.onMouseOut();
                },
              }),
              arrows,
              React.createElement(
                "g",
                { transform: "translate(" + -x + ", 0)" },
                commit.style.message.display &&
                  React.createElement(Message, {
                    commit: commit,
                    ref: messageRef,
                    messageX: messageX,
                  }),
                branchLabels,
                tags,
              ),
            );
          };

          var __extends$3 =
            (undefined && undefined.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
              };
            })();
          var BranchPath = /** @class */ (function (_super) {
            __extends$3(BranchPath, _super);
            function BranchPath() {
              return (_super !== null && _super.apply(this, arguments)) || this;
            }
            BranchPath.prototype.render = function () {
              var _this = this;
              return React.createElement("path", {
                d: core.toSvgPath(
                  this.props.coordinates.map(function (a) {
                    return a.map(function (b) {
                      return _this.props.getWithCommitOffset(b);
                    });
                  }),
                  this.props.isBezier,
                  this.props.gitgraph.isVertical,
                ),
                fill: "none",
                stroke: this.props.branch.computedColor,
                strokeWidth: this.props.branch.style.lineWidth,
                transform:
                  "translate(" +
                  this.props.offset +
                  ", " +
                  this.props.offset +
                  ")",
              });
            };
            return BranchPath;
          })(React.Component);

          var __extends =
            (undefined && undefined.__extends) ||
            (function () {
              var extendStatics = function (d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                      d.__proto__ = b;
                    }) ||
                  function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                  };
                return extendStatics(d, b);
              };
              return function (d, b) {
                extendStatics(d, b);
                function __() {
                  this.constructor = d;
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
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
                var commits = data.commits,
                  branchesPaths = data.branchesPaths,
                  commitMessagesX = data.commitMessagesX;
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
              return React.createElement(
                "svg",
                { ref: this.$graph },
                React.createElement(
                  "g",
                  {
                    transform:
                      "translate(" +
                      BranchLabel.paddingX +
                      ", " +
                      Tooltip.padding +
                      ")",
                  },
                  this.renderBranchesPaths(),
                  React.createElement(
                    "g",
                    { ref: this.$commits },
                    this.state.commits.map(function (commit) {
                      return React.createElement(Commit, {
                        key: commit.hash,
                        commits: _this.state.commits,
                        commit: commit,
                        currentCommitOver: _this.state.currentCommitOver,
                        setCurrentCommitOver: _this.setCurrentCommitOver.bind(
                          _this,
                        ),
                        gitgraph: _this.gitgraph,
                        getWithCommitOffset: _this.getWithCommitOffset.bind(
                          _this,
                        ),
                        setTooltip: _this.setTooltip.bind(_this),
                        commitMessagesX: _this.state.commitMessagesX,
                      });
                    }),
                  ),
                  this.$tooltip,
                ),
              );
            };
            Gitgraph.prototype.componentDidMount = function () {
              if (isPropsWithGraph(this.props)) return;
              this.props.children(this.gitgraph.getUserApi());
            };
            Gitgraph.prototype.componentDidUpdate = function () {
              if (this.$graph.current) {
                var _a = this.$graph.current.getBBox(),
                  height = _a.height,
                  width = _a.width;
                this.$graph.current.setAttribute(
                  "width",
                  // Add `Tooltip.padding` so we don't crop the tooltip text.
                  // Add `BranchLabel.paddingX` so we don't cut branch label.
                  (width + Tooltip.padding + BranchLabel.paddingX).toString(),
                );
                this.$graph.current.setAttribute(
                  "height",
                  // Add `Tooltip.padding` so we don't crop tooltip text
                  // Add `BranchLabel.paddingY` so we don't crop branch label.
                  (height + Tooltip.padding + BranchLabel.paddingY).toString(),
                );
              }
              if (!this.state.shouldRecomputeOffsets) return;
              if (!this.$commits.current) return;
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
              var isBezier =
                this.gitgraph.template.branch.mergeStyle ===
                core.MergeStyle.Bezier;
              return Array.from(this.state.branchesPaths).map(function (_a) {
                var branch = _a[0],
                  coordinates = _a[1];
                return React.createElement(BranchPath, {
                  key: branch.name,
                  gitgraph: _this.gitgraph,
                  branch: branch,
                  coordinates: coordinates,
                  getWithCommitOffset: _this.getWithCommitOffset.bind(_this),
                  isBezier: isBezier,
                  offset: offset,
                });
              });
            };
            Gitgraph.prototype.computeOffsets = function (commits) {
              var totalOffsetY = 0;
              // In VerticalReverse orientation, commits are in the same order in the DOM.
              var orientedCommits =
                this.gitgraph.orientation === core.Orientation.VerticalReverse
                  ? commits
                  : commits.reverse();
              return orientedCommits.reduce(function (newOffsets, commit) {
                var commitY = parseInt(
                  commit.getAttribute("transform").split(",")[1].slice(0, -1),
                  10,
                );
                var firstForeignObject = commit.getElementsByTagName(
                  "foreignObject",
                )[0];
                var customHtmlMessage =
                  firstForeignObject && firstForeignObject.firstElementChild;
                var messageHeight = 0;
                if (customHtmlMessage) {
                  var height = customHtmlMessage.getBoundingClientRect().height;
                  var marginTopInPx =
                    window.getComputedStyle(customHtmlMessage).marginTop ||
                    "0px";
                  var marginTop = parseInt(marginTopInPx.replace("px", ""), 10);
                  messageHeight = height + marginTop;
                }
                // Force the height of the foreignObject (browser issue)
                if (firstForeignObject) {
                  firstForeignObject.setAttribute(
                    "height",
                    messageHeight + "px",
                  );
                }
                newOffsets[commitY] = commitY + totalOffsetY;
                // Increment total offset after setting the offset
                // => offset next commits accordingly.
                totalOffsetY += messageHeight;
                return newOffsets;
              }, {});
            };
            Gitgraph.prototype.getWithCommitOffset = function (_a) {
              var x = _a.x,
                y = _a.y;
              return { x: x, y: this.state.commitYWithOffsets[y] || y };
            };
            Gitgraph.defaultProps = {
              options: {},
            };
            return Gitgraph;
          })(React.Component);

          exports.Gitgraph = Gitgraph;
          exports.TemplateName = core.TemplateName;
          exports.templateExtend = core.templateExtend;
          exports.MergeStyle = core.MergeStyle;
          exports.Mode = core.Mode;
          exports.Orientation = core.Orientation;

          Object.defineProperty(exports, "__esModule", { value: true });
        });
      },
      { "@gitgraph/core": 6, react: 25 },
    ],
    21: [
      function (require, module, exports) {
        (function (process) {
          /**
           * Copyright (c) 2013-present, Facebook, Inc.
           *
           * This source code is licensed under the MIT license found in the
           * LICENSE file in the root directory of this source tree.
           */

          "use strict";

          var printWarning = function () {};

          if (process.env.NODE_ENV !== "production") {
            var ReactPropTypesSecret = require("./lib/ReactPropTypesSecret");
            var loggedTypeFailures = {};

            printWarning = function (text) {
              var message = "Warning: " + text;
              if (typeof console !== "undefined") {
                console.error(message);
              }
              try {
                // --- Welcome to debugging React ---
                // This error was thrown as a convenience so that you can use this stack
                // to find the callsite that caused this warning to fire.
                throw new Error(message);
              } catch (x) {}
            };
          }

          /**
           * Assert that the values match with the type specs.
           * Error messages are memorized and will only be shown once.
           *
           * @param {object} typeSpecs Map of name to a ReactPropType
           * @param {object} values Runtime values that need to be type-checked
           * @param {string} location e.g. "prop", "context", "child context"
           * @param {string} componentName Name of the component for error messages.
           * @param {?Function} getStack Returns the component stack.
           * @private
           */
          function checkPropTypes(
            typeSpecs,
            values,
            location,
            componentName,
            getStack,
          ) {
            if (process.env.NODE_ENV !== "production") {
              for (var typeSpecName in typeSpecs) {
                if (typeSpecs.hasOwnProperty(typeSpecName)) {
                  var error;
                  // Prop type validation may throw. In case they do, we don't want to
                  // fail the render phase where it didn't fail before. So we log it.
                  // After these have been cleaned up, we'll let them throw.
                  try {
                    // This is intentionally an invariant that gets caught. It's the same
                    // behavior as without this statement except with a better message.
                    if (typeof typeSpecs[typeSpecName] !== "function") {
                      var err = Error(
                        (componentName || "React class") +
                          ": " +
                          location +
                          " type `" +
                          typeSpecName +
                          "` is invalid; " +
                          "it must be a function, usually from the `prop-types` package, but received `" +
                          typeof typeSpecs[typeSpecName] +
                          "`.",
                      );
                      err.name = "Invariant Violation";
                      throw err;
                    }
                    error = typeSpecs[typeSpecName](
                      values,
                      typeSpecName,
                      componentName,
                      location,
                      null,
                      ReactPropTypesSecret,
                    );
                  } catch (ex) {
                    error = ex;
                  }
                  if (error && !(error instanceof Error)) {
                    printWarning(
                      (componentName || "React class") +
                        ": type specification of " +
                        location +
                        " `" +
                        typeSpecName +
                        "` is invalid; the type checker " +
                        "function must return `null` or an `Error` but returned a " +
                        typeof error +
                        ". " +
                        "You may have forgotten to pass an argument to the type checker " +
                        "creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and " +
                        "shape all require an argument).",
                    );
                  }
                  if (
                    error instanceof Error &&
                    !(error.message in loggedTypeFailures)
                  ) {
                    // Only monitor this failure once because there tends to be a lot of the
                    // same error.
                    loggedTypeFailures[error.message] = true;

                    var stack = getStack ? getStack() : "";

                    printWarning(
                      "Failed " +
                        location +
                        " type: " +
                        error.message +
                        (stack != null ? stack : ""),
                    );
                  }
                }
              }
            }
          }

          module.exports = checkPropTypes;
        }.call(this, require("_process")));
      },
      { "./lib/ReactPropTypesSecret": 22, _process: 2 },
    ],
    22: [
      function (require, module, exports) {
        /**
         * Copyright (c) 2013-present, Facebook, Inc.
         *
         * This source code is licensed under the MIT license found in the
         * LICENSE file in the root directory of this source tree.
         */

        "use strict";

        var ReactPropTypesSecret =
          "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";

        module.exports = ReactPropTypesSecret;
      },
      {},
    ],
    23: [
      function (require, module, exports) {
        (function (process) {
          /** @license React v16.8.4
           * react.development.js
           *
           * Copyright (c) Facebook, Inc. and its affiliates.
           *
           * This source code is licensed under the MIT license found in the
           * LICENSE file in the root directory of this source tree.
           */

          "use strict";

          if (process.env.NODE_ENV !== "production") {
            (function () {
              "use strict";

              var _assign = require("object-assign");
              var checkPropTypes = require("prop-types/checkPropTypes");

              // TODO: this is special because it gets imported during build.

              var ReactVersion = "16.8.4";

              // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
              // nor polyfill, then a plain number is used for performance.
              var hasSymbol = typeof Symbol === "function" && Symbol.for;

              var REACT_ELEMENT_TYPE = hasSymbol
                ? Symbol.for("react.element")
                : 0xeac7;
              var REACT_PORTAL_TYPE = hasSymbol
                ? Symbol.for("react.portal")
                : 0xeaca;
              var REACT_FRAGMENT_TYPE = hasSymbol
                ? Symbol.for("react.fragment")
                : 0xeacb;
              var REACT_STRICT_MODE_TYPE = hasSymbol
                ? Symbol.for("react.strict_mode")
                : 0xeacc;
              var REACT_PROFILER_TYPE = hasSymbol
                ? Symbol.for("react.profiler")
                : 0xead2;
              var REACT_PROVIDER_TYPE = hasSymbol
                ? Symbol.for("react.provider")
                : 0xeacd;
              var REACT_CONTEXT_TYPE = hasSymbol
                ? Symbol.for("react.context")
                : 0xeace;

              var REACT_CONCURRENT_MODE_TYPE = hasSymbol
                ? Symbol.for("react.concurrent_mode")
                : 0xeacf;
              var REACT_FORWARD_REF_TYPE = hasSymbol
                ? Symbol.for("react.forward_ref")
                : 0xead0;
              var REACT_SUSPENSE_TYPE = hasSymbol
                ? Symbol.for("react.suspense")
                : 0xead1;
              var REACT_MEMO_TYPE = hasSymbol
                ? Symbol.for("react.memo")
                : 0xead3;
              var REACT_LAZY_TYPE = hasSymbol
                ? Symbol.for("react.lazy")
                : 0xead4;

              var MAYBE_ITERATOR_SYMBOL =
                typeof Symbol === "function" && Symbol.iterator;
              var FAUX_ITERATOR_SYMBOL = "@@iterator";

              function getIteratorFn(maybeIterable) {
                if (
                  maybeIterable === null ||
                  typeof maybeIterable !== "object"
                ) {
                  return null;
                }
                var maybeIterator =
                  (MAYBE_ITERATOR_SYMBOL &&
                    maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
                  maybeIterable[FAUX_ITERATOR_SYMBOL];
                if (typeof maybeIterator === "function") {
                  return maybeIterator;
                }
                return null;
              }

              /**
               * Use invariant() to assert state which your program assumes to be true.
               *
               * Provide sprintf-style format (only %s is supported) and arguments
               * to provide information about what broke and what you were
               * expecting.
               *
               * The invariant message will be stripped in production, but the invariant
               * will remain to ensure logic does not differ in production.
               */

              var validateFormat = function () {};

              {
                validateFormat = function (format) {
                  if (format === undefined) {
                    throw new Error(
                      "invariant requires an error message argument",
                    );
                  }
                };
              }

              function invariant(condition, format, a, b, c, d, e, f) {
                validateFormat(format);

                if (!condition) {
                  var error = void 0;
                  if (format === undefined) {
                    error = new Error(
                      "Minified exception occurred; use the non-minified dev environment " +
                        "for the full error message and additional helpful warnings.",
                    );
                  } else {
                    var args = [a, b, c, d, e, f];
                    var argIndex = 0;
                    error = new Error(
                      format.replace(/%s/g, function () {
                        return args[argIndex++];
                      }),
                    );
                    error.name = "Invariant Violation";
                  }

                  error.framesToPop = 1; // we don't care about invariant's own frame
                  throw error;
                }
              }

              // Relying on the `invariant()` implementation lets us
              // preserve the format and params in the www builds.

              /**
               * Forked from fbjs/warning:
               * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
               *
               * Only change is we use console.warn instead of console.error,
               * and do nothing when 'console' is not supported.
               * This really simplifies the code.
               * ---
               * Similar to invariant but only logs a warning if the condition is not met.
               * This can be used to log issues in development environments in critical
               * paths. Removing the logging code for production environments will keep the
               * same logic and follow the same code paths.
               */

              var lowPriorityWarning = function () {};

              {
                var printWarning = function (format) {
                  for (
                    var _len = arguments.length,
                      args = Array(_len > 1 ? _len - 1 : 0),
                      _key = 1;
                    _key < _len;
                    _key++
                  ) {
                    args[_key - 1] = arguments[_key];
                  }

                  var argIndex = 0;
                  var message =
                    "Warning: " +
                    format.replace(/%s/g, function () {
                      return args[argIndex++];
                    });
                  if (typeof console !== "undefined") {
                    console.warn(message);
                  }
                  try {
                    // --- Welcome to debugging React ---
                    // This error was thrown as a convenience so that you can use this stack
                    // to find the callsite that caused this warning to fire.
                    throw new Error(message);
                  } catch (x) {}
                };

                lowPriorityWarning = function (condition, format) {
                  if (format === undefined) {
                    throw new Error(
                      "`lowPriorityWarning(condition, format, ...args)` requires a warning " +
                        "message argument",
                    );
                  }
                  if (!condition) {
                    for (
                      var _len2 = arguments.length,
                        args = Array(_len2 > 2 ? _len2 - 2 : 0),
                        _key2 = 2;
                      _key2 < _len2;
                      _key2++
                    ) {
                      args[_key2 - 2] = arguments[_key2];
                    }

                    printWarning.apply(undefined, [format].concat(args));
                  }
                };
              }

              var lowPriorityWarning$1 = lowPriorityWarning;

              /**
               * Similar to invariant but only logs a warning if the condition is not met.
               * This can be used to log issues in development environments in critical
               * paths. Removing the logging code for production environments will keep the
               * same logic and follow the same code paths.
               */

              var warningWithoutStack = function () {};

              {
                warningWithoutStack = function (condition, format) {
                  for (
                    var _len = arguments.length,
                      args = Array(_len > 2 ? _len - 2 : 0),
                      _key = 2;
                    _key < _len;
                    _key++
                  ) {
                    args[_key - 2] = arguments[_key];
                  }

                  if (format === undefined) {
                    throw new Error(
                      "`warningWithoutStack(condition, format, ...args)` requires a warning " +
                        "message argument",
                    );
                  }
                  if (args.length > 8) {
                    // Check before the condition to catch violations early.
                    throw new Error(
                      "warningWithoutStack() currently supports at most 8 arguments.",
                    );
                  }
                  if (condition) {
                    return;
                  }
                  if (typeof console !== "undefined") {
                    var argsWithFormat = args.map(function (item) {
                      return "" + item;
                    });
                    argsWithFormat.unshift("Warning: " + format);

                    // We intentionally don't use spread (or .apply) directly because it
                    // breaks IE9: https://github.com/facebook/react/issues/13610
                    Function.prototype.apply.call(
                      console.error,
                      console,
                      argsWithFormat,
                    );
                  }
                  try {
                    // --- Welcome to debugging React ---
                    // This error was thrown as a convenience so that you can use this stack
                    // to find the callsite that caused this warning to fire.
                    var argIndex = 0;
                    var message =
                      "Warning: " +
                      format.replace(/%s/g, function () {
                        return args[argIndex++];
                      });
                    throw new Error(message);
                  } catch (x) {}
                };
              }

              var warningWithoutStack$1 = warningWithoutStack;

              var didWarnStateUpdateForUnmountedComponent = {};

              function warnNoop(publicInstance, callerName) {
                {
                  var _constructor = publicInstance.constructor;
                  var componentName =
                    (_constructor &&
                      (_constructor.displayName || _constructor.name)) ||
                    "ReactClass";
                  var warningKey = componentName + "." + callerName;
                  if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
                    return;
                  }
                  warningWithoutStack$1(
                    false,
                    "Can't call %s on a component that is not yet mounted. " +
                      "This is a no-op, but it might indicate a bug in your application. " +
                      "Instead, assign to `this.state` directly or define a `state = {};` " +
                      "class property with the desired state in the %s component.",
                    callerName,
                    componentName,
                  );
                  didWarnStateUpdateForUnmountedComponent[warningKey] = true;
                }
              }

              /**
               * This is the abstract API for an update queue.
               */
              var ReactNoopUpdateQueue = {
                /**
                 * Checks whether or not this composite component is mounted.
                 * @param {ReactClass} publicInstance The instance we want to test.
                 * @return {boolean} True if mounted, false otherwise.
                 * @protected
                 * @final
                 */
                isMounted: function (publicInstance) {
                  return false;
                },

                /**
                 * Forces an update. This should only be invoked when it is known with
                 * certainty that we are **not** in a DOM transaction.
                 *
                 * You may want to call this when you know that some deeper aspect of the
                 * component's state has changed but `setState` was not called.
                 *
                 * This will not invoke `shouldComponentUpdate`, but it will invoke
                 * `componentWillUpdate` and `componentDidUpdate`.
                 *
                 * @param {ReactClass} publicInstance The instance that should rerender.
                 * @param {?function} callback Called after component is updated.
                 * @param {?string} callerName name of the calling function in the public API.
                 * @internal
                 */
                enqueueForceUpdate: function (
                  publicInstance,
                  callback,
                  callerName,
                ) {
                  warnNoop(publicInstance, "forceUpdate");
                },

                /**
                 * Replaces all of the state. Always use this or `setState` to mutate state.
                 * You should treat `this.state` as immutable.
                 *
                 * There is no guarantee that `this.state` will be immediately updated, so
                 * accessing `this.state` after calling this method may return the old value.
                 *
                 * @param {ReactClass} publicInstance The instance that should rerender.
                 * @param {object} completeState Next state.
                 * @param {?function} callback Called after component is updated.
                 * @param {?string} callerName name of the calling function in the public API.
                 * @internal
                 */
                enqueueReplaceState: function (
                  publicInstance,
                  completeState,
                  callback,
                  callerName,
                ) {
                  warnNoop(publicInstance, "replaceState");
                },

                /**
                 * Sets a subset of the state. This only exists because _pendingState is
                 * internal. This provides a merging strategy that is not available to deep
                 * properties which is confusing. TODO: Expose pendingState or don't use it
                 * during the merge.
                 *
                 * @param {ReactClass} publicInstance The instance that should rerender.
                 * @param {object} partialState Next partial state to be merged with state.
                 * @param {?function} callback Called after component is updated.
                 * @param {?string} Name of the calling function in the public API.
                 * @internal
                 */
                enqueueSetState: function (
                  publicInstance,
                  partialState,
                  callback,
                  callerName,
                ) {
                  warnNoop(publicInstance, "setState");
                },
              };

              var emptyObject = {};
              {
                Object.freeze(emptyObject);
              }

              /**
               * Base class helpers for the updating state of a component.
               */
              function Component(props, context, updater) {
                this.props = props;
                this.context = context;
                // If a component has string refs, we will assign a different object later.
                this.refs = emptyObject;
                // We initialize the default updater but the real one gets injected by the
                // renderer.
                this.updater = updater || ReactNoopUpdateQueue;
              }

              Component.prototype.isReactComponent = {};

              /**
               * Sets a subset of the state. Always use this to mutate
               * state. You should treat `this.state` as immutable.
               *
               * There is no guarantee that `this.state` will be immediately updated, so
               * accessing `this.state` after calling this method may return the old value.
               *
               * There is no guarantee that calls to `setState` will run synchronously,
               * as they may eventually be batched together.  You can provide an optional
               * callback that will be executed when the call to setState is actually
               * completed.
               *
               * When a function is provided to setState, it will be called at some point in
               * the future (not synchronously). It will be called with the up to date
               * component arguments (state, props, context). These values can be different
               * from this.* because your function may be called after receiveProps but before
               * shouldComponentUpdate, and this new state, props, and context will not yet be
               * assigned to this.
               *
               * @param {object|function} partialState Next partial state or function to
               *        produce next partial state to be merged with current state.
               * @param {?function} callback Called after state is updated.
               * @final
               * @protected
               */
              Component.prototype.setState = function (partialState, callback) {
                !(
                  typeof partialState === "object" ||
                  typeof partialState === "function" ||
                  partialState == null
                )
                  ? invariant(
                      false,
                      "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
                    )
                  : void 0;
                this.updater.enqueueSetState(
                  this,
                  partialState,
                  callback,
                  "setState",
                );
              };

              /**
               * Forces an update. This should only be invoked when it is known with
               * certainty that we are **not** in a DOM transaction.
               *
               * You may want to call this when you know that some deeper aspect of the
               * component's state has changed but `setState` was not called.
               *
               * This will not invoke `shouldComponentUpdate`, but it will invoke
               * `componentWillUpdate` and `componentDidUpdate`.
               *
               * @param {?function} callback Called after update is complete.
               * @final
               * @protected
               */
              Component.prototype.forceUpdate = function (callback) {
                this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
              };

              /**
               * Deprecated APIs. These APIs used to exist on classic React classes but since
               * we would like to deprecate them, we're not going to move them over to this
               * modern base class. Instead, we define a getter that warns if it's accessed.
               */
              {
                var deprecatedAPIs = {
                  isMounted: [
                    "isMounted",
                    "Instead, make sure to clean up subscriptions and pending requests in " +
                      "componentWillUnmount to prevent memory leaks.",
                  ],
                  replaceState: [
                    "replaceState",
                    "Refactor your code to use setState instead (see " +
                      "https://github.com/facebook/react/issues/3236).",
                  ],
                };
                var defineDeprecationWarning = function (methodName, info) {
                  Object.defineProperty(Component.prototype, methodName, {
                    get: function () {
                      lowPriorityWarning$1(
                        false,
                        "%s(...) is deprecated in plain JavaScript React classes. %s",
                        info[0],
                        info[1],
                      );
                      return undefined;
                    },
                  });
                };
                for (var fnName in deprecatedAPIs) {
                  if (deprecatedAPIs.hasOwnProperty(fnName)) {
                    defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
                  }
                }
              }

              function ComponentDummy() {}
              ComponentDummy.prototype = Component.prototype;

              /**
               * Convenience component with default shallow equality check for sCU.
               */
              function PureComponent(props, context, updater) {
                this.props = props;
                this.context = context;
                // If a component has string refs, we will assign a different object later.
                this.refs = emptyObject;
                this.updater = updater || ReactNoopUpdateQueue;
              }

              var pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
              pureComponentPrototype.constructor = PureComponent;
              // Avoid an extra prototype jump for these methods.
              _assign(pureComponentPrototype, Component.prototype);
              pureComponentPrototype.isPureReactComponent = true;

              // an immutable object with a single mutable value
              function createRef() {
                var refObject = {
                  current: null,
                };
                {
                  Object.seal(refObject);
                }
                return refObject;
              }

              /**
               * Keeps track of the current dispatcher.
               */
              var ReactCurrentDispatcher = {
                /**
                 * @internal
                 * @type {ReactComponent}
                 */
                current: null,
              };

              /**
               * Keeps track of the current owner.
               *
               * The current owner is the component who should own any components that are
               * currently being constructed.
               */
              var ReactCurrentOwner = {
                /**
                 * @internal
                 * @type {ReactComponent}
                 */
                current: null,
              };

              var BEFORE_SLASH_RE = /^(.*)[\\\/]/;

              var describeComponentFrame = function (name, source, ownerName) {
                var sourceInfo = "";
                if (source) {
                  var path = source.fileName;
                  var fileName = path.replace(BEFORE_SLASH_RE, "");
                  {
                    // In DEV, include code for a common special case:
                    // prefer "folder/index.js" instead of just "index.js".
                    if (/^index\./.test(fileName)) {
                      var match = path.match(BEFORE_SLASH_RE);
                      if (match) {
                        var pathBeforeSlash = match[1];
                        if (pathBeforeSlash) {
                          var folderName = pathBeforeSlash.replace(
                            BEFORE_SLASH_RE,
                            "",
                          );
                          fileName = folderName + "/" + fileName;
                        }
                      }
                    }
                  }
                  sourceInfo =
                    " (at " + fileName + ":" + source.lineNumber + ")";
                } else if (ownerName) {
                  sourceInfo = " (created by " + ownerName + ")";
                }
                return "\n    in " + (name || "Unknown") + sourceInfo;
              };

              var Resolved = 1;

              function refineResolvedLazyComponent(lazyComponent) {
                return lazyComponent._status === Resolved
                  ? lazyComponent._result
                  : null;
              }

              function getWrappedName(outerType, innerType, wrapperName) {
                var functionName =
                  innerType.displayName || innerType.name || "";
                return (
                  outerType.displayName ||
                  (functionName !== ""
                    ? wrapperName + "(" + functionName + ")"
                    : wrapperName)
                );
              }

              function getComponentName(type) {
                if (type == null) {
                  // Host root, text node or just invalid type.
                  return null;
                }
                {
                  if (typeof type.tag === "number") {
                    warningWithoutStack$1(
                      false,
                      "Received an unexpected object in getComponentName(). " +
                        "This is likely a bug in React. Please file an issue.",
                    );
                  }
                }
                if (typeof type === "function") {
                  return type.displayName || type.name || null;
                }
                if (typeof type === "string") {
                  return type;
                }
                switch (type) {
                  case REACT_CONCURRENT_MODE_TYPE:
                    return "ConcurrentMode";
                  case REACT_FRAGMENT_TYPE:
                    return "Fragment";
                  case REACT_PORTAL_TYPE:
                    return "Portal";
                  case REACT_PROFILER_TYPE:
                    return "Profiler";
                  case REACT_STRICT_MODE_TYPE:
                    return "StrictMode";
                  case REACT_SUSPENSE_TYPE:
                    return "Suspense";
                }
                if (typeof type === "object") {
                  switch (type.$$typeof) {
                    case REACT_CONTEXT_TYPE:
                      return "Context.Consumer";
                    case REACT_PROVIDER_TYPE:
                      return "Context.Provider";
                    case REACT_FORWARD_REF_TYPE:
                      return getWrappedName(type, type.render, "ForwardRef");
                    case REACT_MEMO_TYPE:
                      return getComponentName(type.type);
                    case REACT_LAZY_TYPE: {
                      var thenable = type;
                      var resolvedThenable = refineResolvedLazyComponent(
                        thenable,
                      );
                      if (resolvedThenable) {
                        return getComponentName(resolvedThenable);
                      }
                    }
                  }
                }
                return null;
              }

              var ReactDebugCurrentFrame = {};

              var currentlyValidatingElement = null;

              function setCurrentlyValidatingElement(element) {
                {
                  currentlyValidatingElement = element;
                }
              }

              {
                // Stack implementation injected by the current renderer.
                ReactDebugCurrentFrame.getCurrentStack = null;

                ReactDebugCurrentFrame.getStackAddendum = function () {
                  var stack = "";

                  // Add an extra top frame while an element is being validated
                  if (currentlyValidatingElement) {
                    var name = getComponentName(
                      currentlyValidatingElement.type,
                    );
                    var owner = currentlyValidatingElement._owner;
                    stack += describeComponentFrame(
                      name,
                      currentlyValidatingElement._source,
                      owner && getComponentName(owner.type),
                    );
                  }

                  // Delegate to the injected renderer-specific implementation
                  var impl = ReactDebugCurrentFrame.getCurrentStack;
                  if (impl) {
                    stack += impl() || "";
                  }

                  return stack;
                };
              }

              var ReactSharedInternals = {
                ReactCurrentDispatcher: ReactCurrentDispatcher,
                ReactCurrentOwner: ReactCurrentOwner,
                // Used by renderers to avoid bundling object-assign twice in UMD bundles:
                assign: _assign,
              };

              {
                _assign(ReactSharedInternals, {
                  // These should not be included in production.
                  ReactDebugCurrentFrame: ReactDebugCurrentFrame,
                  // Shim for React DOM 16.0.0 which still destructured (but not used) this.
                  // TODO: remove in React 17.0.
                  ReactComponentTreeHook: {},
                });
              }

              /**
               * Similar to invariant but only logs a warning if the condition is not met.
               * This can be used to log issues in development environments in critical
               * paths. Removing the logging code for production environments will keep the
               * same logic and follow the same code paths.
               */

              var warning = warningWithoutStack$1;

              {
                warning = function (condition, format) {
                  if (condition) {
                    return;
                  }
                  var ReactDebugCurrentFrame =
                    ReactSharedInternals.ReactDebugCurrentFrame;
                  var stack = ReactDebugCurrentFrame.getStackAddendum();
                  // eslint-disable-next-line react-internal/warning-and-invariant-args

                  for (
                    var _len = arguments.length,
                      args = Array(_len > 2 ? _len - 2 : 0),
                      _key = 2;
                    _key < _len;
                    _key++
                  ) {
                    args[_key - 2] = arguments[_key];
                  }

                  warningWithoutStack$1.apply(
                    undefined,
                    [false, format + "%s"].concat(args, [stack]),
                  );
                };
              }

              var warning$1 = warning;

              var hasOwnProperty = Object.prototype.hasOwnProperty;

              var RESERVED_PROPS = {
                key: true,
                ref: true,
                __self: true,
                __source: true,
              };

              var specialPropKeyWarningShown = void 0;
              var specialPropRefWarningShown = void 0;

              function hasValidRef(config) {
                {
                  if (hasOwnProperty.call(config, "ref")) {
                    var getter = Object.getOwnPropertyDescriptor(config, "ref")
                      .get;
                    if (getter && getter.isReactWarning) {
                      return false;
                    }
                  }
                }
                return config.ref !== undefined;
              }

              function hasValidKey(config) {
                {
                  if (hasOwnProperty.call(config, "key")) {
                    var getter = Object.getOwnPropertyDescriptor(config, "key")
                      .get;
                    if (getter && getter.isReactWarning) {
                      return false;
                    }
                  }
                }
                return config.key !== undefined;
              }

              function defineKeyPropWarningGetter(props, displayName) {
                var warnAboutAccessingKey = function () {
                  if (!specialPropKeyWarningShown) {
                    specialPropKeyWarningShown = true;
                    warningWithoutStack$1(
                      false,
                      "%s: `key` is not a prop. Trying to access it will result " +
                        "in `undefined` being returned. If you need to access the same " +
                        "value within the child component, you should pass it as a different " +
                        "prop. (https://fb.me/react-special-props)",
                      displayName,
                    );
                  }
                };
                warnAboutAccessingKey.isReactWarning = true;
                Object.defineProperty(props, "key", {
                  get: warnAboutAccessingKey,
                  configurable: true,
                });
              }

              function defineRefPropWarningGetter(props, displayName) {
                var warnAboutAccessingRef = function () {
                  if (!specialPropRefWarningShown) {
                    specialPropRefWarningShown = true;
                    warningWithoutStack$1(
                      false,
                      "%s: `ref` is not a prop. Trying to access it will result " +
                        "in `undefined` being returned. If you need to access the same " +
                        "value within the child component, you should pass it as a different " +
                        "prop. (https://fb.me/react-special-props)",
                      displayName,
                    );
                  }
                };
                warnAboutAccessingRef.isReactWarning = true;
                Object.defineProperty(props, "ref", {
                  get: warnAboutAccessingRef,
                  configurable: true,
                });
              }

              /**
               * Factory method to create a new React element. This no longer adheres to
               * the class pattern, so do not use new to call it. Also, no instanceof check
               * will work. Instead test $$typeof field against Symbol.for('react.element') to check
               * if something is a React Element.
               *
               * @param {*} type
               * @param {*} key
               * @param {string|object} ref
               * @param {*} self A *temporary* helper to detect places where `this` is
               * different from the `owner` when React.createElement is called, so that we
               * can warn. We want to get rid of owner and replace string `ref`s with arrow
               * functions, and as long as `this` and owner are the same, there will be no
               * change in behavior.
               * @param {*} source An annotation object (added by a transpiler or otherwise)
               * indicating filename, line number, and/or other information.
               * @param {*} owner
               * @param {*} props
               * @internal
               */
              var ReactElement = function (
                type,
                key,
                ref,
                self,
                source,
                owner,
                props,
              ) {
                var element = {
                  // This tag allows us to uniquely identify this as a React Element
                  $$typeof: REACT_ELEMENT_TYPE,

                  // Built-in properties that belong on the element
                  type: type,
                  key: key,
                  ref: ref,
                  props: props,

                  // Record the component responsible for creating this element.
                  _owner: owner,
                };

                {
                  // The validation flag is currently mutative. We put it on
                  // an external backing store so that we can freeze the whole object.
                  // This can be replaced with a WeakMap once they are implemented in
                  // commonly used development environments.
                  element._store = {};

                  // To make comparing ReactElements easier for testing purposes, we make
                  // the validation flag non-enumerable (where possible, which should
                  // include every environment we run tests in), so the test framework
                  // ignores it.
                  Object.defineProperty(element._store, "validated", {
                    configurable: false,
                    enumerable: false,
                    writable: true,
                    value: false,
                  });
                  // self and source are DEV only properties.
                  Object.defineProperty(element, "_self", {
                    configurable: false,
                    enumerable: false,
                    writable: false,
                    value: self,
                  });
                  // Two elements created in two different places should be considered
                  // equal for testing purposes and therefore we hide it from enumeration.
                  Object.defineProperty(element, "_source", {
                    configurable: false,
                    enumerable: false,
                    writable: false,
                    value: source,
                  });
                  if (Object.freeze) {
                    Object.freeze(element.props);
                    Object.freeze(element);
                  }
                }

                return element;
              };

              /**
               * Create and return a new ReactElement of the given type.
               * See https://reactjs.org/docs/react-api.html#createelement
               */
              function createElement(type, config, children) {
                var propName = void 0;

                // Reserved names are extracted
                var props = {};

                var key = null;
                var ref = null;
                var self = null;
                var source = null;

                if (config != null) {
                  if (hasValidRef(config)) {
                    ref = config.ref;
                  }
                  if (hasValidKey(config)) {
                    key = "" + config.key;
                  }

                  self = config.__self === undefined ? null : config.__self;
                  source =
                    config.__source === undefined ? null : config.__source;
                  // Remaining properties are added to a new props object
                  for (propName in config) {
                    if (
                      hasOwnProperty.call(config, propName) &&
                      !RESERVED_PROPS.hasOwnProperty(propName)
                    ) {
                      props[propName] = config[propName];
                    }
                  }
                }

                // Children can be more than one argument, and those are transferred onto
                // the newly allocated props object.
                var childrenLength = arguments.length - 2;
                if (childrenLength === 1) {
                  props.children = children;
                } else if (childrenLength > 1) {
                  var childArray = Array(childrenLength);
                  for (var i = 0; i < childrenLength; i++) {
                    childArray[i] = arguments[i + 2];
                  }
                  {
                    if (Object.freeze) {
                      Object.freeze(childArray);
                    }
                  }
                  props.children = childArray;
                }

                // Resolve default props
                if (type && type.defaultProps) {
                  var defaultProps = type.defaultProps;
                  for (propName in defaultProps) {
                    if (props[propName] === undefined) {
                      props[propName] = defaultProps[propName];
                    }
                  }
                }
                {
                  if (key || ref) {
                    var displayName =
                      typeof type === "function"
                        ? type.displayName || type.name || "Unknown"
                        : type;
                    if (key) {
                      defineKeyPropWarningGetter(props, displayName);
                    }
                    if (ref) {
                      defineRefPropWarningGetter(props, displayName);
                    }
                  }
                }
                return ReactElement(
                  type,
                  key,
                  ref,
                  self,
                  source,
                  ReactCurrentOwner.current,
                  props,
                );
              }

              /**
               * Return a function that produces ReactElements of a given type.
               * See https://reactjs.org/docs/react-api.html#createfactory
               */

              function cloneAndReplaceKey(oldElement, newKey) {
                var newElement = ReactElement(
                  oldElement.type,
                  newKey,
                  oldElement.ref,
                  oldElement._self,
                  oldElement._source,
                  oldElement._owner,
                  oldElement.props,
                );

                return newElement;
              }

              /**
               * Clone and return a new ReactElement using element as the starting point.
               * See https://reactjs.org/docs/react-api.html#cloneelement
               */
              function cloneElement(element, config, children) {
                !!(element === null || element === undefined)
                  ? invariant(
                      false,
                      "React.cloneElement(...): The argument must be a React element, but you passed %s.",
                      element,
                    )
                  : void 0;

                var propName = void 0;

                // Original props are copied
                var props = _assign({}, element.props);

                // Reserved names are extracted
                var key = element.key;
                var ref = element.ref;
                // Self is preserved since the owner is preserved.
                var self = element._self;
                // Source is preserved since cloneElement is unlikely to be targeted by a
                // transpiler, and the original source is probably a better indicator of the
                // true owner.
                var source = element._source;

                // Owner will be preserved, unless ref is overridden
                var owner = element._owner;

                if (config != null) {
                  if (hasValidRef(config)) {
                    // Silently steal the ref from the parent.
                    ref = config.ref;
                    owner = ReactCurrentOwner.current;
                  }
                  if (hasValidKey(config)) {
                    key = "" + config.key;
                  }

                  // Remaining properties override existing props
                  var defaultProps = void 0;
                  if (element.type && element.type.defaultProps) {
                    defaultProps = element.type.defaultProps;
                  }
                  for (propName in config) {
                    if (
                      hasOwnProperty.call(config, propName) &&
                      !RESERVED_PROPS.hasOwnProperty(propName)
                    ) {
                      if (
                        config[propName] === undefined &&
                        defaultProps !== undefined
                      ) {
                        // Resolve default props
                        props[propName] = defaultProps[propName];
                      } else {
                        props[propName] = config[propName];
                      }
                    }
                  }
                }

                // Children can be more than one argument, and those are transferred onto
                // the newly allocated props object.
                var childrenLength = arguments.length - 2;
                if (childrenLength === 1) {
                  props.children = children;
                } else if (childrenLength > 1) {
                  var childArray = Array(childrenLength);
                  for (var i = 0; i < childrenLength; i++) {
                    childArray[i] = arguments[i + 2];
                  }
                  props.children = childArray;
                }

                return ReactElement(
                  element.type,
                  key,
                  ref,
                  self,
                  source,
                  owner,
                  props,
                );
              }

              /**
               * Verifies the object is a ReactElement.
               * See https://reactjs.org/docs/react-api.html#isvalidelement
               * @param {?object} object
               * @return {boolean} True if `object` is a ReactElement.
               * @final
               */
              function isValidElement(object) {
                return (
                  typeof object === "object" &&
                  object !== null &&
                  object.$$typeof === REACT_ELEMENT_TYPE
                );
              }

              var SEPARATOR = ".";
              var SUBSEPARATOR = ":";

              /**
               * Escape and wrap key so it is safe to use as a reactid
               *
               * @param {string} key to be escaped.
               * @return {string} the escaped key.
               */
              function escape(key) {
                var escapeRegex = /[=:]/g;
                var escaperLookup = {
                  "=": "=0",
                  ":": "=2",
                };
                var escapedString = ("" + key).replace(
                  escapeRegex,
                  function (match) {
                    return escaperLookup[match];
                  },
                );

                return "$" + escapedString;
              }

              /**
               * TODO: Test that a single child and an array with one item have the same key
               * pattern.
               */

              var didWarnAboutMaps = false;

              var userProvidedKeyEscapeRegex = /\/+/g;
              function escapeUserProvidedKey(text) {
                return ("" + text).replace(userProvidedKeyEscapeRegex, "$&/");
              }

              var POOL_SIZE = 10;
              var traverseContextPool = [];
              function getPooledTraverseContext(
                mapResult,
                keyPrefix,
                mapFunction,
                mapContext,
              ) {
                if (traverseContextPool.length) {
                  var traverseContext = traverseContextPool.pop();
                  traverseContext.result = mapResult;
                  traverseContext.keyPrefix = keyPrefix;
                  traverseContext.func = mapFunction;
                  traverseContext.context = mapContext;
                  traverseContext.count = 0;
                  return traverseContext;
                } else {
                  return {
                    result: mapResult,
                    keyPrefix: keyPrefix,
                    func: mapFunction,
                    context: mapContext,
                    count: 0,
                  };
                }
              }

              function releaseTraverseContext(traverseContext) {
                traverseContext.result = null;
                traverseContext.keyPrefix = null;
                traverseContext.func = null;
                traverseContext.context = null;
                traverseContext.count = 0;
                if (traverseContextPool.length < POOL_SIZE) {
                  traverseContextPool.push(traverseContext);
                }
              }

              /**
               * @param {?*} children Children tree container.
               * @param {!string} nameSoFar Name of the key path so far.
               * @param {!function} callback Callback to invoke with each child found.
               * @param {?*} traverseContext Used to pass information throughout the traversal
               * process.
               * @return {!number} The number of children in this subtree.
               */
              function traverseAllChildrenImpl(
                children,
                nameSoFar,
                callback,
                traverseContext,
              ) {
                var type = typeof children;

                if (type === "undefined" || type === "boolean") {
                  // All of the above are perceived as null.
                  children = null;
                }

                var invokeCallback = false;

                if (children === null) {
                  invokeCallback = true;
                } else {
                  switch (type) {
                    case "string":
                    case "number":
                      invokeCallback = true;
                      break;
                    case "object":
                      switch (children.$$typeof) {
                        case REACT_ELEMENT_TYPE:
                        case REACT_PORTAL_TYPE:
                          invokeCallback = true;
                      }
                  }
                }

                if (invokeCallback) {
                  callback(
                    traverseContext,
                    children,
                    // If it's the only child, treat the name as if it was wrapped in an array
                    // so that it's consistent if the number of children grows.
                    nameSoFar === ""
                      ? SEPARATOR + getComponentKey(children, 0)
                      : nameSoFar,
                  );
                  return 1;
                }

                var child = void 0;
                var nextName = void 0;
                var subtreeCount = 0; // Count of children found in the current subtree.
                var nextNamePrefix =
                  nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;

                if (Array.isArray(children)) {
                  for (var i = 0; i < children.length; i++) {
                    child = children[i];
                    nextName = nextNamePrefix + getComponentKey(child, i);
                    subtreeCount += traverseAllChildrenImpl(
                      child,
                      nextName,
                      callback,
                      traverseContext,
                    );
                  }
                } else {
                  var iteratorFn = getIteratorFn(children);
                  if (typeof iteratorFn === "function") {
                    {
                      // Warn about using Maps as children
                      if (iteratorFn === children.entries) {
                        !didWarnAboutMaps
                          ? warning$1(
                              false,
                              "Using Maps as children is unsupported and will likely yield " +
                                "unexpected results. Convert it to a sequence/iterable of keyed " +
                                "ReactElements instead.",
                            )
                          : void 0;
                        didWarnAboutMaps = true;
                      }
                    }

                    var iterator = iteratorFn.call(children);
                    var step = void 0;
                    var ii = 0;
                    while (!(step = iterator.next()).done) {
                      child = step.value;
                      nextName = nextNamePrefix + getComponentKey(child, ii++);
                      subtreeCount += traverseAllChildrenImpl(
                        child,
                        nextName,
                        callback,
                        traverseContext,
                      );
                    }
                  } else if (type === "object") {
                    var addendum = "";
                    {
                      addendum =
                        " If you meant to render a collection of children, use an array " +
                        "instead." +
                        ReactDebugCurrentFrame.getStackAddendum();
                    }
                    var childrenString = "" + children;
                    invariant(
                      false,
                      "Objects are not valid as a React child (found: %s).%s",
                      childrenString === "[object Object]"
                        ? "object with keys {" +
                            Object.keys(children).join(", ") +
                            "}"
                        : childrenString,
                      addendum,
                    );
                  }
                }

                return subtreeCount;
              }

              /**
               * Traverses children that are typically specified as `props.children`, but
               * might also be specified through attributes:
               *
               * - `traverseAllChildren(this.props.children, ...)`
               * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
               *
               * The `traverseContext` is an optional argument that is passed through the
               * entire traversal. It can be used to store accumulations or anything else that
               * the callback might find relevant.
               *
               * @param {?*} children Children tree object.
               * @param {!function} callback To invoke upon traversing each child.
               * @param {?*} traverseContext Context for traversal.
               * @return {!number} The number of children in this subtree.
               */
              function traverseAllChildren(
                children,
                callback,
                traverseContext,
              ) {
                if (children == null) {
                  return 0;
                }

                return traverseAllChildrenImpl(
                  children,
                  "",
                  callback,
                  traverseContext,
                );
              }

              /**
               * Generate a key string that identifies a component within a set.
               *
               * @param {*} component A component that could contain a manual key.
               * @param {number} index Index that is used if a manual key is not provided.
               * @return {string}
               */
              function getComponentKey(component, index) {
                // Do some typechecking here since we call this blindly. We want to ensure
                // that we don't block potential future ES APIs.
                if (
                  typeof component === "object" &&
                  component !== null &&
                  component.key != null
                ) {
                  // Explicit key
                  return escape(component.key);
                }
                // Implicit key determined by the index in the set
                return index.toString(36);
              }

              function forEachSingleChild(bookKeeping, child, name) {
                var func = bookKeeping.func,
                  context = bookKeeping.context;

                func.call(context, child, bookKeeping.count++);
              }

              /**
               * Iterates through children that are typically specified as `props.children`.
               *
               * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
               *
               * The provided forEachFunc(child, index) will be called for each
               * leaf child.
               *
               * @param {?*} children Children tree container.
               * @param {function(*, int)} forEachFunc
               * @param {*} forEachContext Context for forEachContext.
               */
              function forEachChildren(children, forEachFunc, forEachContext) {
                if (children == null) {
                  return children;
                }
                var traverseContext = getPooledTraverseContext(
                  null,
                  null,
                  forEachFunc,
                  forEachContext,
                );
                traverseAllChildren(
                  children,
                  forEachSingleChild,
                  traverseContext,
                );
                releaseTraverseContext(traverseContext);
              }

              function mapSingleChildIntoContext(bookKeeping, child, childKey) {
                var result = bookKeeping.result,
                  keyPrefix = bookKeeping.keyPrefix,
                  func = bookKeeping.func,
                  context = bookKeeping.context;

                var mappedChild = func.call(
                  context,
                  child,
                  bookKeeping.count++,
                );
                if (Array.isArray(mappedChild)) {
                  mapIntoWithKeyPrefixInternal(
                    mappedChild,
                    result,
                    childKey,
                    function (c) {
                      return c;
                    },
                  );
                } else if (mappedChild != null) {
                  if (isValidElement(mappedChild)) {
                    mappedChild = cloneAndReplaceKey(
                      mappedChild,
                      // Keep both the (mapped) and old keys if they differ, just as
                      // traverseAllChildren used to do for objects as children
                      keyPrefix +
                        (mappedChild.key &&
                        (!child || child.key !== mappedChild.key)
                          ? escapeUserProvidedKey(mappedChild.key) + "/"
                          : "") +
                        childKey,
                    );
                  }
                  result.push(mappedChild);
                }
              }

              function mapIntoWithKeyPrefixInternal(
                children,
                array,
                prefix,
                func,
                context,
              ) {
                var escapedPrefix = "";
                if (prefix != null) {
                  escapedPrefix = escapeUserProvidedKey(prefix) + "/";
                }
                var traverseContext = getPooledTraverseContext(
                  array,
                  escapedPrefix,
                  func,
                  context,
                );
                traverseAllChildren(
                  children,
                  mapSingleChildIntoContext,
                  traverseContext,
                );
                releaseTraverseContext(traverseContext);
              }

              /**
               * Maps children that are typically specified as `props.children`.
               *
               * See https://reactjs.org/docs/react-api.html#reactchildrenmap
               *
               * The provided mapFunction(child, key, index) will be called for each
               * leaf child.
               *
               * @param {?*} children Children tree container.
               * @param {function(*, int)} func The map function.
               * @param {*} context Context for mapFunction.
               * @return {object} Object containing the ordered map of results.
               */
              function mapChildren(children, func, context) {
                if (children == null) {
                  return children;
                }
                var result = [];
                mapIntoWithKeyPrefixInternal(
                  children,
                  result,
                  null,
                  func,
                  context,
                );
                return result;
              }

              /**
               * Count the number of children that are typically specified as
               * `props.children`.
               *
               * See https://reactjs.org/docs/react-api.html#reactchildrencount
               *
               * @param {?*} children Children tree container.
               * @return {number} The number of children.
               */
              function countChildren(children) {
                return traverseAllChildren(
                  children,
                  function () {
                    return null;
                  },
                  null,
                );
              }

              /**
               * Flatten a children object (typically specified as `props.children`) and
               * return an array with appropriately re-keyed children.
               *
               * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
               */
              function toArray(children) {
                var result = [];
                mapIntoWithKeyPrefixInternal(
                  children,
                  result,
                  null,
                  function (child) {
                    return child;
                  },
                );
                return result;
              }

              /**
               * Returns the first child in a collection of children and verifies that there
               * is only one child in the collection.
               *
               * See https://reactjs.org/docs/react-api.html#reactchildrenonly
               *
               * The current implementation of this function assumes that a single child gets
               * passed without a wrapper, but the purpose of this helper function is to
               * abstract away the particular structure of children.
               *
               * @param {?object} children Child collection structure.
               * @return {ReactElement} The first and only `ReactElement` contained in the
               * structure.
               */
              function onlyChild(children) {
                !isValidElement(children)
                  ? invariant(
                      false,
                      "React.Children.only expected to receive a single React element child.",
                    )
                  : void 0;
                return children;
              }

              function createContext(defaultValue, calculateChangedBits) {
                if (calculateChangedBits === undefined) {
                  calculateChangedBits = null;
                } else {
                  {
                    !(
                      calculateChangedBits === null ||
                      typeof calculateChangedBits === "function"
                    )
                      ? warningWithoutStack$1(
                          false,
                          "createContext: Expected the optional second argument to be a " +
                            "function. Instead received: %s",
                          calculateChangedBits,
                        )
                      : void 0;
                  }
                }

                var context = {
                  $$typeof: REACT_CONTEXT_TYPE,
                  _calculateChangedBits: calculateChangedBits,
                  // As a workaround to support multiple concurrent renderers, we categorize
                  // some renderers as primary and others as secondary. We only expect
                  // there to be two concurrent renderers at most: React Native (primary) and
                  // Fabric (secondary); React DOM (primary) and React ART (secondary).
                  // Secondary renderers store their context values on separate fields.
                  _currentValue: defaultValue,
                  _currentValue2: defaultValue,
                  // Used to track how many concurrent renderers this context currently
                  // supports within in a single renderer. Such as parallel server rendering.
                  _threadCount: 0,
                  // These are circular
                  Provider: null,
                  Consumer: null,
                };

                context.Provider = {
                  $$typeof: REACT_PROVIDER_TYPE,
                  _context: context,
                };

                var hasWarnedAboutUsingNestedContextConsumers = false;
                var hasWarnedAboutUsingConsumerProvider = false;

                {
                  // A separate object, but proxies back to the original context object for
                  // backwards compatibility. It has a different $$typeof, so we can properly
                  // warn for the incorrect usage of Context as a Consumer.
                  var Consumer = {
                    $$typeof: REACT_CONTEXT_TYPE,
                    _context: context,
                    _calculateChangedBits: context._calculateChangedBits,
                  };
                  // $FlowFixMe: Flow complains about not setting a value, which is intentional here
                  Object.defineProperties(Consumer, {
                    Provider: {
                      get: function () {
                        if (!hasWarnedAboutUsingConsumerProvider) {
                          hasWarnedAboutUsingConsumerProvider = true;
                          warning$1(
                            false,
                            "Rendering <Context.Consumer.Provider> is not supported and will be removed in " +
                              "a future major release. Did you mean to render <Context.Provider> instead?",
                          );
                        }
                        return context.Provider;
                      },
                      set: function (_Provider) {
                        context.Provider = _Provider;
                      },
                    },
                    _currentValue: {
                      get: function () {
                        return context._currentValue;
                      },
                      set: function (_currentValue) {
                        context._currentValue = _currentValue;
                      },
                    },
                    _currentValue2: {
                      get: function () {
                        return context._currentValue2;
                      },
                      set: function (_currentValue2) {
                        context._currentValue2 = _currentValue2;
                      },
                    },
                    _threadCount: {
                      get: function () {
                        return context._threadCount;
                      },
                      set: function (_threadCount) {
                        context._threadCount = _threadCount;
                      },
                    },
                    Consumer: {
                      get: function () {
                        if (!hasWarnedAboutUsingNestedContextConsumers) {
                          hasWarnedAboutUsingNestedContextConsumers = true;
                          warning$1(
                            false,
                            "Rendering <Context.Consumer.Consumer> is not supported and will be removed in " +
                              "a future major release. Did you mean to render <Context.Consumer> instead?",
                          );
                        }
                        return context.Consumer;
                      },
                    },
                  });
                  // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty
                  context.Consumer = Consumer;
                }

                {
                  context._currentRenderer = null;
                  context._currentRenderer2 = null;
                }

                return context;
              }

              function lazy(ctor) {
                var lazyType = {
                  $$typeof: REACT_LAZY_TYPE,
                  _ctor: ctor,
                  // React uses these fields to store the result.
                  _status: -1,
                  _result: null,
                };

                {
                  // In production, this would just set it on the object.
                  var defaultProps = void 0;
                  var propTypes = void 0;
                  Object.defineProperties(lazyType, {
                    defaultProps: {
                      configurable: true,
                      get: function () {
                        return defaultProps;
                      },
                      set: function (newDefaultProps) {
                        warning$1(
                          false,
                          "React.lazy(...): It is not supported to assign `defaultProps` to " +
                            "a lazy component import. Either specify them where the component " +
                            "is defined, or create a wrapping component around it.",
                        );
                        defaultProps = newDefaultProps;
                        // Match production behavior more closely:
                        Object.defineProperty(lazyType, "defaultProps", {
                          enumerable: true,
                        });
                      },
                    },
                    propTypes: {
                      configurable: true,
                      get: function () {
                        return propTypes;
                      },
                      set: function (newPropTypes) {
                        warning$1(
                          false,
                          "React.lazy(...): It is not supported to assign `propTypes` to " +
                            "a lazy component import. Either specify them where the component " +
                            "is defined, or create a wrapping component around it.",
                        );
                        propTypes = newPropTypes;
                        // Match production behavior more closely:
                        Object.defineProperty(lazyType, "propTypes", {
                          enumerable: true,
                        });
                      },
                    },
                  });
                }

                return lazyType;
              }

              function forwardRef(render) {
                {
                  if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
                    warningWithoutStack$1(
                      false,
                      "forwardRef requires a render function but received a `memo` " +
                        "component. Instead of forwardRef(memo(...)), use " +
                        "memo(forwardRef(...)).",
                    );
                  } else if (typeof render !== "function") {
                    warningWithoutStack$1(
                      false,
                      "forwardRef requires a render function but was given %s.",
                      render === null ? "null" : typeof render,
                    );
                  } else {
                    !(
                      // Do not warn for 0 arguments because it could be due to usage of the 'arguments' object
                      (render.length === 0 || render.length === 2)
                    )
                      ? warningWithoutStack$1(
                          false,
                          "forwardRef render functions accept exactly two parameters: props and ref. %s",
                          render.length === 1
                            ? "Did you forget to use the ref parameter?"
                            : "Any additional parameter will be undefined.",
                        )
                      : void 0;
                  }

                  if (render != null) {
                    !(render.defaultProps == null && render.propTypes == null)
                      ? warningWithoutStack$1(
                          false,
                          "forwardRef render functions do not support propTypes or defaultProps. " +
                            "Did you accidentally pass a React component?",
                        )
                      : void 0;
                  }
                }

                return {
                  $$typeof: REACT_FORWARD_REF_TYPE,
                  render: render,
                };
              }

              function isValidElementType(type) {
                return (
                  typeof type === "string" ||
                  typeof type === "function" ||
                  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
                  type === REACT_FRAGMENT_TYPE ||
                  type === REACT_CONCURRENT_MODE_TYPE ||
                  type === REACT_PROFILER_TYPE ||
                  type === REACT_STRICT_MODE_TYPE ||
                  type === REACT_SUSPENSE_TYPE ||
                  (typeof type === "object" &&
                    type !== null &&
                    (type.$$typeof === REACT_LAZY_TYPE ||
                      type.$$typeof === REACT_MEMO_TYPE ||
                      type.$$typeof === REACT_PROVIDER_TYPE ||
                      type.$$typeof === REACT_CONTEXT_TYPE ||
                      type.$$typeof === REACT_FORWARD_REF_TYPE))
                );
              }

              function memo(type, compare) {
                {
                  if (!isValidElementType(type)) {
                    warningWithoutStack$1(
                      false,
                      "memo: The first argument must be a component. Instead " +
                        "received: %s",
                      type === null ? "null" : typeof type,
                    );
                  }
                }
                return {
                  $$typeof: REACT_MEMO_TYPE,
                  type: type,
                  compare: compare === undefined ? null : compare,
                };
              }

              function resolveDispatcher() {
                var dispatcher = ReactCurrentDispatcher.current;
                !(dispatcher !== null)
                  ? invariant(
                      false,
                      "Hooks can only be called inside the body of a function component. (https://fb.me/react-invalid-hook-call)",
                    )
                  : void 0;
                return dispatcher;
              }

              function useContext(Context, unstable_observedBits) {
                var dispatcher = resolveDispatcher();
                {
                  !(unstable_observedBits === undefined)
                    ? warning$1(
                        false,
                        "useContext() second argument is reserved for future " +
                          "use in React. Passing it is not supported. " +
                          "You passed: %s.%s",
                        unstable_observedBits,
                        typeof unstable_observedBits === "number" &&
                          Array.isArray(arguments[2])
                          ? "\n\nDid you call array.map(useContext)? " +
                              "Calling Hooks inside a loop is not supported. " +
                              "Learn more at https://fb.me/rules-of-hooks"
                          : "",
                      )
                    : void 0;

                  // TODO: add a more generic warning for invalid values.
                  if (Context._context !== undefined) {
                    var realContext = Context._context;
                    // Don't deduplicate because this legitimately causes bugs
                    // and nobody should be using this in existing code.
                    if (realContext.Consumer === Context) {
                      warning$1(
                        false,
                        "Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be " +
                          "removed in a future major release. Did you mean to call useContext(Context) instead?",
                      );
                    } else if (realContext.Provider === Context) {
                      warning$1(
                        false,
                        "Calling useContext(Context.Provider) is not supported. " +
                          "Did you mean to call useContext(Context) instead?",
                      );
                    }
                  }
                }
                return dispatcher.useContext(Context, unstable_observedBits);
              }

              function useState(initialState) {
                var dispatcher = resolveDispatcher();
                return dispatcher.useState(initialState);
              }

              function useReducer(reducer, initialArg, init) {
                var dispatcher = resolveDispatcher();
                return dispatcher.useReducer(reducer, initialArg, init);
              }

              function useRef(initialValue) {
                var dispatcher = resolveDispatcher();
                return dispatcher.useRef(initialValue);
              }

              function useEffect(create, inputs) {
                var dispatcher = resolveDispatcher();
                return dispatcher.useEffect(create, inputs);
              }

              function useLayoutEffect(create, inputs) {
                var dispatcher = resolveDispatcher();
                return dispatcher.useLayoutEffect(create, inputs);
              }

              function useCallback(callback, inputs) {
                var dispatcher = resolveDispatcher();
                return dispatcher.useCallback(callback, inputs);
              }

              function useMemo(create, inputs) {
                var dispatcher = resolveDispatcher();
                return dispatcher.useMemo(create, inputs);
              }

              function useImperativeHandle(ref, create, inputs) {
                var dispatcher = resolveDispatcher();
                return dispatcher.useImperativeHandle(ref, create, inputs);
              }

              function useDebugValue(value, formatterFn) {
                {
                  var dispatcher = resolveDispatcher();
                  return dispatcher.useDebugValue(value, formatterFn);
                }
              }

              /**
               * ReactElementValidator provides a wrapper around a element factory
               * which validates the props passed to the element. This is intended to be
               * used only in DEV and could be replaced by a static type checker for languages
               * that support it.
               */

              var propTypesMisspellWarningShown = void 0;

              {
                propTypesMisspellWarningShown = false;
              }

              function getDeclarationErrorAddendum() {
                if (ReactCurrentOwner.current) {
                  var name = getComponentName(ReactCurrentOwner.current.type);
                  if (name) {
                    return "\n\nCheck the render method of `" + name + "`.";
                  }
                }
                return "";
              }

              function getSourceInfoErrorAddendum(elementProps) {
                if (
                  elementProps !== null &&
                  elementProps !== undefined &&
                  elementProps.__source !== undefined
                ) {
                  var source = elementProps.__source;
                  var fileName = source.fileName.replace(/^.*[\\\/]/, "");
                  var lineNumber = source.lineNumber;
                  return (
                    "\n\nCheck your code at " +
                    fileName +
                    ":" +
                    lineNumber +
                    "."
                  );
                }
                return "";
              }

              /**
               * Warn if there's no key explicitly set on dynamic arrays of children or
               * object keys are not valid. This allows us to keep track of children between
               * updates.
               */
              var ownerHasKeyUseWarning = {};

              function getCurrentComponentErrorInfo(parentType) {
                var info = getDeclarationErrorAddendum();

                if (!info) {
                  var parentName =
                    typeof parentType === "string"
                      ? parentType
                      : parentType.displayName || parentType.name;
                  if (parentName) {
                    info =
                      "\n\nCheck the top-level render call using <" +
                      parentName +
                      ">.";
                  }
                }
                return info;
              }

              /**
               * Warn if the element doesn't have an explicit key assigned to it.
               * This element is in an array. The array could grow and shrink or be
               * reordered. All children that haven't already been validated are required to
               * have a "key" property assigned to it. Error statuses are cached so a warning
               * will only be shown once.
               *
               * @internal
               * @param {ReactElement} element Element that requires a key.
               * @param {*} parentType element's parent's type.
               */
              function validateExplicitKey(element, parentType) {
                if (
                  !element._store ||
                  element._store.validated ||
                  element.key != null
                ) {
                  return;
                }
                element._store.validated = true;

                var currentComponentErrorInfo = getCurrentComponentErrorInfo(
                  parentType,
                );
                if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
                  return;
                }
                ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

                // Usually the current owner is the offender, but if it accepts children as a
                // property, it may be the creator of the child that's responsible for
                // assigning it a key.
                var childOwner = "";
                if (
                  element &&
                  element._owner &&
                  element._owner !== ReactCurrentOwner.current
                ) {
                  // Give the component that originally created this child.
                  childOwner =
                    " It was passed a child from " +
                    getComponentName(element._owner.type) +
                    ".";
                }

                setCurrentlyValidatingElement(element);
                {
                  warning$1(
                    false,
                    'Each child in a list should have a unique "key" prop.' +
                      "%s%s See https://fb.me/react-warning-keys for more information.",
                    currentComponentErrorInfo,
                    childOwner,
                  );
                }
                setCurrentlyValidatingElement(null);
              }

              /**
               * Ensure that every element either is passed in a static location, in an
               * array with an explicit keys property defined, or in an object literal
               * with valid key property.
               *
               * @internal
               * @param {ReactNode} node Statically passed child of any type.
               * @param {*} parentType node's parent's type.
               */
              function validateChildKeys(node, parentType) {
                if (typeof node !== "object") {
                  return;
                }
                if (Array.isArray(node)) {
                  for (var i = 0; i < node.length; i++) {
                    var child = node[i];
                    if (isValidElement(child)) {
                      validateExplicitKey(child, parentType);
                    }
                  }
                } else if (isValidElement(node)) {
                  // This element was passed in a valid location.
                  if (node._store) {
                    node._store.validated = true;
                  }
                } else if (node) {
                  var iteratorFn = getIteratorFn(node);
                  if (typeof iteratorFn === "function") {
                    // Entry iterators used to provide implicit keys,
                    // but now we print a separate warning for them later.
                    if (iteratorFn !== node.entries) {
                      var iterator = iteratorFn.call(node);
                      var step = void 0;
                      while (!(step = iterator.next()).done) {
                        if (isValidElement(step.value)) {
                          validateExplicitKey(step.value, parentType);
                        }
                      }
                    }
                  }
                }
              }

              /**
               * Given an element, validate that its props follow the propTypes definition,
               * provided by the type.
               *
               * @param {ReactElement} element
               */
              function validatePropTypes(element) {
                var type = element.type;
                if (
                  type === null ||
                  type === undefined ||
                  typeof type === "string"
                ) {
                  return;
                }
                var name = getComponentName(type);
                var propTypes = void 0;
                if (typeof type === "function") {
                  propTypes = type.propTypes;
                } else if (
                  typeof type === "object" &&
                  (type.$$typeof === REACT_FORWARD_REF_TYPE ||
                    // Note: Memo only checks outer props here.
                    // Inner props are checked in the reconciler.
                    type.$$typeof === REACT_MEMO_TYPE)
                ) {
                  propTypes = type.propTypes;
                } else {
                  return;
                }
                if (propTypes) {
                  setCurrentlyValidatingElement(element);
                  checkPropTypes(
                    propTypes,
                    element.props,
                    "prop",
                    name,
                    ReactDebugCurrentFrame.getStackAddendum,
                  );
                  setCurrentlyValidatingElement(null);
                } else if (
                  type.PropTypes !== undefined &&
                  !propTypesMisspellWarningShown
                ) {
                  propTypesMisspellWarningShown = true;
                  warningWithoutStack$1(
                    false,
                    "Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",
                    name || "Unknown",
                  );
                }
                if (typeof type.getDefaultProps === "function") {
                  !type.getDefaultProps.isReactClassApproved
                    ? warningWithoutStack$1(
                        false,
                        "getDefaultProps is only used on classic React.createClass " +
                          "definitions. Use a static property named `defaultProps` instead.",
                      )
                    : void 0;
                }
              }

              /**
               * Given a fragment, validate that it can only be provided with fragment props
               * @param {ReactElement} fragment
               */
              function validateFragmentProps(fragment) {
                setCurrentlyValidatingElement(fragment);

                var keys = Object.keys(fragment.props);
                for (var i = 0; i < keys.length; i++) {
                  var key = keys[i];
                  if (key !== "children" && key !== "key") {
                    warning$1(
                      false,
                      "Invalid prop `%s` supplied to `React.Fragment`. " +
                        "React.Fragment can only have `key` and `children` props.",
                      key,
                    );
                    break;
                  }
                }

                if (fragment.ref !== null) {
                  warning$1(
                    false,
                    "Invalid attribute `ref` supplied to `React.Fragment`.",
                  );
                }

                setCurrentlyValidatingElement(null);
              }

              function createElementWithValidation(type, props, children) {
                var validType = isValidElementType(type);

                // We warn in this case but don't throw. We expect the element creation to
                // succeed and there will likely be errors in render.
                if (!validType) {
                  var info = "";
                  if (
                    type === undefined ||
                    (typeof type === "object" &&
                      type !== null &&
                      Object.keys(type).length === 0)
                  ) {
                    info +=
                      " You likely forgot to export your component from the file " +
                      "it's defined in, or you might have mixed up default and named imports.";
                  }

                  var sourceInfo = getSourceInfoErrorAddendum(props);
                  if (sourceInfo) {
                    info += sourceInfo;
                  } else {
                    info += getDeclarationErrorAddendum();
                  }

                  var typeString = void 0;
                  if (type === null) {
                    typeString = "null";
                  } else if (Array.isArray(type)) {
                    typeString = "array";
                  } else if (
                    type !== undefined &&
                    type.$$typeof === REACT_ELEMENT_TYPE
                  ) {
                    typeString =
                      "<" + (getComponentName(type.type) || "Unknown") + " />";
                    info =
                      " Did you accidentally export a JSX literal instead of a component?";
                  } else {
                    typeString = typeof type;
                  }

                  warning$1(
                    false,
                    "React.createElement: type is invalid -- expected a string (for " +
                      "built-in components) or a class/function (for composite " +
                      "components) but got: %s.%s",
                    typeString,
                    info,
                  );
                }

                var element = createElement.apply(this, arguments);

                // The result can be nullish if a mock or a custom function is used.
                // TODO: Drop this when these are no longer allowed as the type argument.
                if (element == null) {
                  return element;
                }

                // Skip key warning if the type isn't valid since our key validation logic
                // doesn't expect a non-string/function type and can throw confusing errors.
                // We don't want exception behavior to differ between dev and prod.
                // (Rendering will throw with a helpful message and as soon as the type is
                // fixed, the key warnings will appear.)
                if (validType) {
                  for (var i = 2; i < arguments.length; i++) {
                    validateChildKeys(arguments[i], type);
                  }
                }

                if (type === REACT_FRAGMENT_TYPE) {
                  validateFragmentProps(element);
                } else {
                  validatePropTypes(element);
                }

                return element;
              }

              function createFactoryWithValidation(type) {
                var validatedFactory = createElementWithValidation.bind(
                  null,
                  type,
                );
                validatedFactory.type = type;
                // Legacy hook: remove it
                {
                  Object.defineProperty(validatedFactory, "type", {
                    enumerable: false,
                    get: function () {
                      lowPriorityWarning$1(
                        false,
                        "Factory.type is deprecated. Access the class directly " +
                          "before passing it to createFactory.",
                      );
                      Object.defineProperty(this, "type", {
                        value: type,
                      });
                      return type;
                    },
                  });
                }

                return validatedFactory;
              }

              function cloneElementWithValidation(element, props, children) {
                var newElement = cloneElement.apply(this, arguments);
                for (var i = 2; i < arguments.length; i++) {
                  validateChildKeys(arguments[i], newElement.type);
                }
                validatePropTypes(newElement);
                return newElement;
              }

              // Helps identify side effects in begin-phase lifecycle hooks and setState reducers:

              // In some cases, StrictMode should also double-render lifecycles.
              // This can be confusing for tests though,
              // And it can be bad for performance in production.
              // This feature flag can be used to control the behavior:

              // To preserve the "Pause on caught exceptions" behavior of the debugger, we
              // replay the begin phase of a failed component inside invokeGuardedCallback.

              // Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:

              // Gather advanced timing metrics for Profiler subtrees.

              // Trace which interactions trigger each commit.

              // Only used in www builds.
              // TODO: true? Here it might just be false.

              // Only used in www builds.

              // Only used in www builds.

              // React Fire: prevent the value and checked attributes from syncing
              // with their related DOM properties

              // These APIs will no longer be "unstable" in the upcoming 16.7 release,
              // Control this behavior with a flag to support 16.6 minor releases in the meanwhile.
              var enableStableConcurrentModeAPIs = false;

              var React = {
                Children: {
                  map: mapChildren,
                  forEach: forEachChildren,
                  count: countChildren,
                  toArray: toArray,
                  only: onlyChild,
                },

                createRef: createRef,
                Component: Component,
                PureComponent: PureComponent,

                createContext: createContext,
                forwardRef: forwardRef,
                lazy: lazy,
                memo: memo,

                useCallback: useCallback,
                useContext: useContext,
                useEffect: useEffect,
                useImperativeHandle: useImperativeHandle,
                useDebugValue: useDebugValue,
                useLayoutEffect: useLayoutEffect,
                useMemo: useMemo,
                useReducer: useReducer,
                useRef: useRef,
                useState: useState,

                Fragment: REACT_FRAGMENT_TYPE,
                StrictMode: REACT_STRICT_MODE_TYPE,
                Suspense: REACT_SUSPENSE_TYPE,

                createElement: createElementWithValidation,
                cloneElement: cloneElementWithValidation,
                createFactory: createFactoryWithValidation,
                isValidElement: isValidElement,

                version: ReactVersion,

                unstable_ConcurrentMode: REACT_CONCURRENT_MODE_TYPE,
                unstable_Profiler: REACT_PROFILER_TYPE,

                __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals,
              };

              // Note: some APIs are added with feature flags.
              // Make sure that stable builds for open source
              // don't modify the React object to avoid deopts.
              // Also let's not expose their names in stable builds.

              if (enableStableConcurrentModeAPIs) {
                React.ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
                React.Profiler = REACT_PROFILER_TYPE;
                React.unstable_ConcurrentMode = undefined;
                React.unstable_Profiler = undefined;
              }

              var React$2 = Object.freeze({
                default: React,
              });

              var React$3 = (React$2 && React) || React$2;

              // TODO: decide on the top-level export form.
              // This is hacky but makes it work with both Rollup and Jest.
              var react = React$3.default || React$3;

              module.exports = react;
            })();
          }
        }.call(this, require("_process")));
      },
      { _process: 2, "object-assign": 1, "prop-types/checkPropTypes": 21 },
    ],
    24: [
      function (require, module, exports) {
        /** @license React v16.8.4
         * react.production.min.js
         *
         * Copyright (c) Facebook, Inc. and its affiliates.
         *
         * This source code is licensed under the MIT license found in the
         * LICENSE file in the root directory of this source tree.
         */

        "use strict";
        var k = require("object-assign"),
          n = "function" === typeof Symbol && Symbol.for,
          p = n ? Symbol.for("react.element") : 60103,
          q = n ? Symbol.for("react.portal") : 60106,
          r = n ? Symbol.for("react.fragment") : 60107,
          t = n ? Symbol.for("react.strict_mode") : 60108,
          u = n ? Symbol.for("react.profiler") : 60114,
          v = n ? Symbol.for("react.provider") : 60109,
          w = n ? Symbol.for("react.context") : 60110,
          x = n ? Symbol.for("react.concurrent_mode") : 60111,
          y = n ? Symbol.for("react.forward_ref") : 60112,
          z = n ? Symbol.for("react.suspense") : 60113,
          aa = n ? Symbol.for("react.memo") : 60115,
          ba = n ? Symbol.for("react.lazy") : 60116,
          A = "function" === typeof Symbol && Symbol.iterator;
        function ca(a, b, d, c, e, g, h, f) {
          if (!a) {
            a = void 0;
            if (void 0 === b)
              a = Error(
                "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.",
              );
            else {
              var l = [d, c, e, g, h, f],
                m = 0;
              a = Error(
                b.replace(/%s/g, function () {
                  return l[m++];
                }),
              );
              a.name = "Invariant Violation";
            }
            a.framesToPop = 1;
            throw a;
          }
        }
        function B(a) {
          for (
            var b = arguments.length - 1,
              d = "https://reactjs.org/docs/error-decoder.html?invariant=" + a,
              c = 0;
            c < b;
            c++
          )
            d += "&args[]=" + encodeURIComponent(arguments[c + 1]);
          ca(
            !1,
            "Minified React error #" +
              a +
              "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",
            d,
          );
        }
        var C = {
            isMounted: function () {
              return !1;
            },
            enqueueForceUpdate: function () {},
            enqueueReplaceState: function () {},
            enqueueSetState: function () {},
          },
          D = {};
        function E(a, b, d) {
          this.props = a;
          this.context = b;
          this.refs = D;
          this.updater = d || C;
        }
        E.prototype.isReactComponent = {};
        E.prototype.setState = function (a, b) {
          "object" !== typeof a && "function" !== typeof a && null != a
            ? B("85")
            : void 0;
          this.updater.enqueueSetState(this, a, b, "setState");
        };
        E.prototype.forceUpdate = function (a) {
          this.updater.enqueueForceUpdate(this, a, "forceUpdate");
        };
        function F() {}
        F.prototype = E.prototype;
        function G(a, b, d) {
          this.props = a;
          this.context = b;
          this.refs = D;
          this.updater = d || C;
        }
        var H = (G.prototype = new F());
        H.constructor = G;
        k(H, E.prototype);
        H.isPureReactComponent = !0;
        var I = { current: null },
          J = { current: null },
          K = Object.prototype.hasOwnProperty,
          L = { key: !0, ref: !0, __self: !0, __source: !0 };
        function M(a, b, d) {
          var c = void 0,
            e = {},
            g = null,
            h = null;
          if (null != b)
            for (c in (void 0 !== b.ref && (h = b.ref),
            void 0 !== b.key && (g = "" + b.key),
            b))
              K.call(b, c) && !L.hasOwnProperty(c) && (e[c] = b[c]);
          var f = arguments.length - 2;
          if (1 === f) e.children = d;
          else if (1 < f) {
            for (var l = Array(f), m = 0; m < f; m++) l[m] = arguments[m + 2];
            e.children = l;
          }
          if (a && a.defaultProps)
            for (c in ((f = a.defaultProps), f))
              void 0 === e[c] && (e[c] = f[c]);
          return {
            $$typeof: p,
            type: a,
            key: g,
            ref: h,
            props: e,
            _owner: J.current,
          };
        }
        function da(a, b) {
          return {
            $$typeof: p,
            type: a.type,
            key: b,
            ref: a.ref,
            props: a.props,
            _owner: a._owner,
          };
        }
        function N(a) {
          return "object" === typeof a && null !== a && a.$$typeof === p;
        }
        function escape(a) {
          var b = { "=": "=0", ":": "=2" };
          return (
            "$" +
            ("" + a).replace(/[=:]/g, function (a) {
              return b[a];
            })
          );
        }
        var O = /\/+/g,
          P = [];
        function Q(a, b, d, c) {
          if (P.length) {
            var e = P.pop();
            e.result = a;
            e.keyPrefix = b;
            e.func = d;
            e.context = c;
            e.count = 0;
            return e;
          }
          return { result: a, keyPrefix: b, func: d, context: c, count: 0 };
        }
        function R(a) {
          a.result = null;
          a.keyPrefix = null;
          a.func = null;
          a.context = null;
          a.count = 0;
          10 > P.length && P.push(a);
        }
        function S(a, b, d, c) {
          var e = typeof a;
          if ("undefined" === e || "boolean" === e) a = null;
          var g = !1;
          if (null === a) g = !0;
          else
            switch (e) {
              case "string":
              case "number":
                g = !0;
                break;
              case "object":
                switch (a.$$typeof) {
                  case p:
                  case q:
                    g = !0;
                }
            }
          if (g) return d(c, a, "" === b ? "." + T(a, 0) : b), 1;
          g = 0;
          b = "" === b ? "." : b + ":";
          if (Array.isArray(a))
            for (var h = 0; h < a.length; h++) {
              e = a[h];
              var f = b + T(e, h);
              g += S(e, f, d, c);
            }
          else if (
            (null === a || "object" !== typeof a
              ? (f = null)
              : ((f = (A && a[A]) || a["@@iterator"]),
                (f = "function" === typeof f ? f : null)),
            "function" === typeof f)
          )
            for (a = f.call(a), h = 0; !(e = a.next()).done; )
              (e = e.value), (f = b + T(e, h++)), (g += S(e, f, d, c));
          else
            "object" === e &&
              ((d = "" + a),
              B(
                "31",
                "[object Object]" === d
                  ? "object with keys {" + Object.keys(a).join(", ") + "}"
                  : d,
                "",
              ));
          return g;
        }
        function U(a, b, d) {
          return null == a ? 0 : S(a, "", b, d);
        }
        function T(a, b) {
          return "object" === typeof a && null !== a && null != a.key
            ? escape(a.key)
            : b.toString(36);
        }
        function ea(a, b) {
          a.func.call(a.context, b, a.count++);
        }
        function fa(a, b, d) {
          var c = a.result,
            e = a.keyPrefix;
          a = a.func.call(a.context, b, a.count++);
          Array.isArray(a)
            ? V(a, c, d, function (a) {
                return a;
              })
            : null != a &&
              (N(a) &&
                (a = da(
                  a,
                  e +
                    (!a.key || (b && b.key === a.key)
                      ? ""
                      : ("" + a.key).replace(O, "$&/") + "/") +
                    d,
                )),
              c.push(a));
        }
        function V(a, b, d, c, e) {
          var g = "";
          null != d && (g = ("" + d).replace(O, "$&/") + "/");
          b = Q(b, g, c, e);
          U(a, fa, b);
          R(b);
        }
        function W() {
          var a = I.current;
          null === a ? B("307") : void 0;
          return a;
        }
        var X = {
            Children: {
              map: function (a, b, d) {
                if (null == a) return a;
                var c = [];
                V(a, c, null, b, d);
                return c;
              },
              forEach: function (a, b, d) {
                if (null == a) return a;
                b = Q(null, null, b, d);
                U(a, ea, b);
                R(b);
              },
              count: function (a) {
                return U(
                  a,
                  function () {
                    return null;
                  },
                  null,
                );
              },
              toArray: function (a) {
                var b = [];
                V(a, b, null, function (a) {
                  return a;
                });
                return b;
              },
              only: function (a) {
                N(a) ? void 0 : B("143");
                return a;
              },
            },
            createRef: function () {
              return { current: null };
            },
            Component: E,
            PureComponent: G,
            createContext: function (a, b) {
              void 0 === b && (b = null);
              a = {
                $$typeof: w,
                _calculateChangedBits: b,
                _currentValue: a,
                _currentValue2: a,
                _threadCount: 0,
                Provider: null,
                Consumer: null,
              };
              a.Provider = { $$typeof: v, _context: a };
              return (a.Consumer = a);
            },
            forwardRef: function (a) {
              return { $$typeof: y, render: a };
            },
            lazy: function (a) {
              return { $$typeof: ba, _ctor: a, _status: -1, _result: null };
            },
            memo: function (a, b) {
              return {
                $$typeof: aa,
                type: a,
                compare: void 0 === b ? null : b,
              };
            },
            useCallback: function (a, b) {
              return W().useCallback(a, b);
            },
            useContext: function (a, b) {
              return W().useContext(a, b);
            },
            useEffect: function (a, b) {
              return W().useEffect(a, b);
            },
            useImperativeHandle: function (a, b, d) {
              return W().useImperativeHandle(a, b, d);
            },
            useDebugValue: function () {},
            useLayoutEffect: function (a, b) {
              return W().useLayoutEffect(a, b);
            },
            useMemo: function (a, b) {
              return W().useMemo(a, b);
            },
            useReducer: function (a, b, d) {
              return W().useReducer(a, b, d);
            },
            useRef: function (a) {
              return W().useRef(a);
            },
            useState: function (a) {
              return W().useState(a);
            },
            Fragment: r,
            StrictMode: t,
            Suspense: z,
            createElement: M,
            cloneElement: function (a, b, d) {
              null === a || void 0 === a ? B("267", a) : void 0;
              var c = void 0,
                e = k({}, a.props),
                g = a.key,
                h = a.ref,
                f = a._owner;
              if (null != b) {
                void 0 !== b.ref && ((h = b.ref), (f = J.current));
                void 0 !== b.key && (g = "" + b.key);
                var l = void 0;
                a.type && a.type.defaultProps && (l = a.type.defaultProps);
                for (c in b)
                  K.call(b, c) &&
                    !L.hasOwnProperty(c) &&
                    (e[c] = void 0 === b[c] && void 0 !== l ? l[c] : b[c]);
              }
              c = arguments.length - 2;
              if (1 === c) e.children = d;
              else if (1 < c) {
                l = Array(c);
                for (var m = 0; m < c; m++) l[m] = arguments[m + 2];
                e.children = l;
              }
              return {
                $$typeof: p,
                type: a.type,
                key: g,
                ref: h,
                props: e,
                _owner: f,
              };
            },
            createFactory: function (a) {
              var b = M.bind(null, a);
              b.type = a;
              return b;
            },
            isValidElement: N,
            version: "16.8.4",
            unstable_ConcurrentMode: x,
            unstable_Profiler: u,
            __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
              ReactCurrentDispatcher: I,
              ReactCurrentOwner: J,
              assign: k,
            },
          },
          Y = { default: X },
          Z = (Y && X) || Y;
        module.exports = Z.default || Z;
      },
      { "object-assign": 1 },
    ],
    25: [
      function (require, module, exports) {
        (function (process) {
          "use strict";

          if (process.env.NODE_ENV === "production") {
            module.exports = require("./cjs/react.production.min.js");
          } else {
            module.exports = require("./cjs/react.development.js");
          }
        }.call(this, require("_process")));
      },
      {
        "./cjs/react.development.js": 23,
        "./cjs/react.production.min.js": 24,
        _process: 2,
      },
    ],
  },
  {},
  [20],
);
