/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "28a42cd0671f097486d7";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "openassessment-editor-tinymce";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./openassessment/xblock/static/js/src/lms/editors/oa_editor_tinymce.js")(__webpack_require__.s = "./openassessment/xblock/static/js/src/lms/editors/oa_editor_tinymce.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./openassessment/xblock/static/js/src/lms/editors/oa_editor_tinymce.js":
/*!******************************************************************************!*\
  !*** ./openassessment/xblock/static/js/src/lms/editors/oa_editor_tinymce.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n/**\n Handles Response Editor of tinymce type.\n * */\n\n(function (define) {\n  var dependencies = [];\n\n  // Create a flag to determine if we are in lms\n  var isLMS = typeof window.LmsRuntime !== 'undefined';\n\n  // Determine which css file should be loaded to style text in the editor\n  var baseUrl = '/static/studio/js/vendor/tinymce/js/tinymce/';\n  if (isLMS) {\n    baseUrl = '/static/js/vendor/tinymce/js/tinymce/';\n  }\n  if (typeof window.tinymce === 'undefined') {\n    // If tinymce is not available, we need to load it\n    dependencies.push('tinymce');\n    dependencies.push('jquery.tinymce');\n  }\n  define(dependencies, function () {\n    var EditorTinymce = /*#__PURE__*/function () {\n      function EditorTinymce() {\n        _classCallCheck(this, EditorTinymce);\n        _defineProperty(this, \"editorInstances\", []);\n      }\n      return _createClass(EditorTinymce, [{\n        key: \"getTinyMCEConfig\",\n        value:\n        /**\n         Build and return TinyMCE Configuration.\n         * */\n        function getTinyMCEConfig(readonly) {\n          var config = {\n            menubar: false,\n            statusbar: false,\n            base_url: baseUrl,\n            theme: 'silver',\n            skin: 'studio-tmce5',\n            content_css: 'studio-tmce5',\n            contextmenu: false,\n            height: '300',\n            schema: 'html5',\n            plugins: 'code image link lists',\n            toolbar: 'formatselect | bold italic underline | link blockquote image | numlist bullist outdent indent | strikethrough | code | undo redo'\n          };\n\n          // if readonly hide toolbar, menubar and statusbar\n          if (readonly) {\n            config = Object.assign(config, {\n              toolbar: false,\n              readonly: 1\n            });\n          }\n          return config;\n        }\n\n        /**\n         Loads TinyMCE editor.\n         Args:\n         elements (object): editor elements selected by jQuery\n         * */\n      }, {\n        key: \"load\",\n        value: function load(elements) {\n          this.elements = elements;\n          var ctrl = this;\n          return Promise.all(this.elements.map(function () {\n            var _this = this;\n            // check if it's readonly\n            var disabled = $(this).attr('disabled');\n\n            // In LMS with multiple Unit containing ORA Block with tinyMCE enabled,\n            // We need to destroy if any previously intialized editor exists for current element.\n            var id = $(this).attr('id');\n            if (id !== undefined) {\n              var existingEditor = tinymce.get(id); // eslint-disable-line\n              if (existingEditor) {\n                existingEditor.destroy();\n              }\n            }\n            var config = ctrl.getTinyMCEConfig(disabled);\n            return new Promise(function (resolve) {\n              config.setup = function (editor) {\n                return editor.on('init', function () {\n                  ctrl.editorInstances.push(editor);\n                  resolve();\n                });\n              };\n              $(_this).tinymce(config);\n            });\n          }));\n        }\n\n        /**\n         Set on change listener to the editor.\n         Args:\n         handler (Function)\n         * */\n      }, {\n        key: \"setOnChangeListener\",\n        value: function setOnChangeListener(handler) {\n          var _this2 = this;\n          ['change', 'keyup', 'drop', 'paste'].forEach(function (eventName) {\n            _this2.editorInstances.forEach(function (editor) {\n              editor.on(eventName, handler);\n            });\n          });\n        }\n\n        /**\n         Set the response texts.\n         Retrieve the response texts.\n         Args:\n         texts (array of strings): If specified, the texts to set for the response.\n         Returns:\n         array of strings: The current response texts.\n         * */\n        /* eslint-disable-next-line consistent-return */\n      }, {\n        key: \"response\",\n        value: function response(texts) {\n          if (typeof texts === 'undefined') {\n            return this.editorInstances.map(function (editor) {\n              return editor.getContent();\n            });\n          }\n          this.editorInstances.forEach(function (editor, index) {\n            editor.setContent(texts[index]);\n          });\n        }\n      }]);\n    }(); // return a function, to be able to create new instance every time.\n    return function () {\n      return new EditorTinymce();\n    };\n  });\n}).call(window, window.define || window.RequireJS.define);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9vcGVuYXNzZXNzbWVudC94YmxvY2svc3RhdGljL2pzL3NyYy9sbXMvZWRpdG9ycy9vYV9lZGl0b3JfdGlueW1jZS5qcz82MmZhIl0sIm5hbWVzIjpbImRlZmluZSIsImRlcGVuZGVuY2llcyIsImlzTE1TIiwid2luZG93IiwiTG1zUnVudGltZSIsImJhc2VVcmwiLCJ0aW55bWNlIiwicHVzaCIsIkVkaXRvclRpbnltY2UiLCJfY2xhc3NDYWxsQ2hlY2siLCJfZGVmaW5lUHJvcGVydHkiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsImdldFRpbnlNQ0VDb25maWciLCJyZWFkb25seSIsImNvbmZpZyIsIm1lbnViYXIiLCJzdGF0dXNiYXIiLCJiYXNlX3VybCIsInRoZW1lIiwic2tpbiIsImNvbnRlbnRfY3NzIiwiY29udGV4dG1lbnUiLCJoZWlnaHQiLCJzY2hlbWEiLCJwbHVnaW5zIiwidG9vbGJhciIsIk9iamVjdCIsImFzc2lnbiIsImxvYWQiLCJlbGVtZW50cyIsImN0cmwiLCJQcm9taXNlIiwiYWxsIiwibWFwIiwiX3RoaXMiLCJkaXNhYmxlZCIsIiQiLCJhdHRyIiwiaWQiLCJ1bmRlZmluZWQiLCJleGlzdGluZ0VkaXRvciIsImdldCIsImRlc3Ryb3kiLCJyZXNvbHZlIiwic2V0dXAiLCJlZGl0b3IiLCJvbiIsImVkaXRvckluc3RhbmNlcyIsInNldE9uQ2hhbmdlTGlzdGVuZXIiLCJoYW5kbGVyIiwiX3RoaXMyIiwiZm9yRWFjaCIsImV2ZW50TmFtZSIsInJlc3BvbnNlIiwidGV4dHMiLCJnZXRDb250ZW50IiwiaW5kZXgiLCJzZXRDb250ZW50IiwiY2FsbCIsIlJlcXVpcmVKUyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLFVBQVVBLE1BQU0sRUFBRTtFQUNqQixJQUFNQyxZQUFZLEdBQUcsRUFBRTs7RUFFdkI7RUFDQSxJQUFNQyxLQUFLLEdBQUcsT0FBT0MsTUFBTSxDQUFD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QVMsQ0FBQzdELE1BQU0sQ0FBQyIsImZpbGUiOiIuL29wZW5hc3Nlc3NtZW50L3hibG9jay9zdGF0aWMvanMvc3JjL2xtcy9lZGl0b3JzL29hX2VkaXRvcl90aW55bWNlLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gSGFuZGxlcyBSZXNwb25zZSBFZGl0b3Igb2YgdGlueW1jZSB0eXBlLlxuICogKi9cblxuKGZ1bmN0aW9uIChkZWZpbmUpIHtcbiAgY29uc3QgZGVwZW5kZW5jaWVzID0gW107XG5cbiAgLy8gQ3JlYXRlIGEgZmxhZyB0byBkZXRlcm1pbmUgaWYgd2UgYXJlIGluIGxtc1xuICBjb25zdCBpc0xNUyA9IHR5cGVvZiB3aW5kb3cuTG1zUnVudGltZSAhPT0gJ3VuZGVmaW5lZCc7XG5cbiAgLy8gRGV0ZXJtaW5lIHdoaWNoIGNzcyBmaWxlIHNob3VsZCBiZSBsb2FkZWQgdG8gc3R5bGUgdGV4dCBpbiB0aGUgZWRpdG9yXG4gIGxldCBiYXNlVXJsID0gJy9zdGF0aWMvc3R1ZGlvL2pzL3ZlbmRvci90aW55bWNlL2pzL3RpbnltY2UvJztcbiAgaWYgKGlzTE1TKSB7XG4gICAgYmFzZVVybCA9ICcvc3RhdGljL2pzL3ZlbmRvci90aW55bWNlL2pzL3RpbnltY2UvJztcbiAgfVxuXG4gIGlmICh0eXBlb2Ygd2luZG93LnRpbnltY2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gSWYgdGlueW1jZSBpcyBub3QgYXZhaWxhYmxlLCB3ZSBuZWVkIHRvIGxvYWQgaXRcbiAgICBkZXBlbmRlbmNpZXMucHVzaCgndGlueW1jZScpO1xuICAgIGRlcGVuZGVuY2llcy5wdXNoKCdqcXVlcnkudGlueW1jZScpO1xuICB9XG5cbiAgZGVmaW5lKGRlcGVuZGVuY2llcywgKCkgPT4ge1xuICAgIGNsYXNzIEVkaXRvclRpbnltY2Uge1xuICAgICAgZWRpdG9ySW5zdGFuY2VzID0gW107XG5cbiAgICAgIC8qKlxuICAgICAgIEJ1aWxkIGFuZCByZXR1cm4gVGlueU1DRSBDb25maWd1cmF0aW9uLlxuICAgICAgICogKi9cbiAgICAgIGdldFRpbnlNQ0VDb25maWcocmVhZG9ubHkpIHtcbiAgICAgICAgbGV0IGNvbmZpZyA9IHtcbiAgICAgICAgICBtZW51YmFyOiBmYWxzZSxcbiAgICAgICAgICBzdGF0dXNiYXI6IGZhbHNlLFxuICAgICAgICAgIGJhc2VfdXJsOiBiYXNlVXJsLFxuICAgICAgICAgIHRoZW1lOiAnc2lsdmVyJyxcbiAgICAgICAgICBza2luOiAnc3R1ZGlvLXRtY2U1JyxcbiAgICAgICAgICBjb250ZW50X2NzczogJ3N0dWRpby10bWNlNScsXG4gICAgICAgICAgY29udGV4dG1lbnU6IGZhbHNlLFxuICAgICAgICAgIGhlaWdodDogJzMwMCcsXG4gICAgICAgICAgc2NoZW1hOiAnaHRtbDUnLFxuICAgICAgICAgIHBsdWdpbnM6ICdjb2RlIGltYWdlIGxpbmsgbGlzdHMnLFxuICAgICAgICAgIHRvb2xiYXI6ICdmb3JtYXRzZWxlY3QgfCBib2xkIGl0YWxpYyB1bmRlcmxpbmUgfCBsaW5rIGJsb2NrcXVvdGUgaW1hZ2UgfCBudW1saXN0IGJ1bGxpc3Qgb3V0ZGVudCBpbmRlbnQgfCBzdHJpa2V0aHJvdWdoIHwgY29kZSB8IHVuZG8gcmVkbycsXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gaWYgcmVhZG9ubHkgaGlkZSB0b29sYmFyLCBtZW51YmFyIGFuZCBzdGF0dXNiYXJcbiAgICAgICAgaWYgKHJlYWRvbmx5KSB7XG4gICAgICAgICAgY29uZmlnID0gT2JqZWN0LmFzc2lnbihjb25maWcsIHtcbiAgICAgICAgICAgIHRvb2xiYXI6IGZhbHNlLFxuICAgICAgICAgICAgcmVhZG9ubHk6IDEsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICBMb2FkcyBUaW55TUNFIGVkaXRvci5cbiAgICAgICBBcmdzOlxuICAgICAgIGVsZW1lbnRzIChvYmplY3QpOiBlZGl0b3IgZWxlbWVudHMgc2VsZWN0ZWQgYnkgalF1ZXJ5XG4gICAgICAgKiAqL1xuICAgICAgbG9hZChlbGVtZW50cykge1xuICAgICAgICB0aGlzLmVsZW1lbnRzID0gZWxlbWVudHM7XG5cbiAgICAgICAgY29uc3QgY3RybCA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHRoaXMuZWxlbWVudHMubWFwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBjaGVjayBpZiBpdCdzIHJlYWRvbmx5XG4gICAgICAgICAgY29uc3QgZGlzYWJsZWQgPSAkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJyk7XG5cbiAgICAgICAgICAvLyBJbiBMTVMgd2l0aCBtdWx0aXBsZSBVbml0IGNvbnRhaW5pbmcgT1JBIEJsb2NrIHdpdGggdGlueU1DRSBlbmFibGVkLFxuICAgICAgICAgIC8vIFdlIG5lZWQgdG8gZGVzdHJveSBpZiBhbnkgcHJldmlvdXNseSBpbnRpYWxpemVkIGVkaXRvciBleGlzdHMgZm9yIGN1cnJlbnQgZWxlbWVudC5cbiAgICAgICAgICBjb25zdCBpZCA9ICQodGhpcykuYXR0cignaWQnKTtcbiAgICAgICAgICBpZiAoaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdFZGl0b3IgPSB0aW55bWNlLmdldChpZCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICAgIGlmIChleGlzdGluZ0VkaXRvcikge1xuICAgICAgICAgICAgICBleGlzdGluZ0VkaXRvci5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgY29uZmlnID0gY3RybC5nZXRUaW55TUNFQ29uZmlnKGRpc2FibGVkKTtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBjb25maWcuc2V0dXAgPSBlZGl0b3IgPT4gZWRpdG9yLm9uKCdpbml0JywgKCkgPT4ge1xuICAgICAgICAgICAgICBjdHJsLmVkaXRvckluc3RhbmNlcy5wdXNoKGVkaXRvcik7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCh0aGlzKS50aW55bWNlKGNvbmZpZyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgU2V0IG9uIGNoYW5nZSBsaXN0ZW5lciB0byB0aGUgZWRpdG9yLlxuICAgICAgIEFyZ3M6XG4gICAgICAgaGFuZGxlciAoRnVuY3Rpb24pXG4gICAgICAgKiAqL1xuICAgICAgc2V0T25DaGFuZ2VMaXN0ZW5lcihoYW5kbGVyKSB7XG4gICAgICAgIFsnY2hhbmdlJywgJ2tleXVwJywgJ2Ryb3AnLCAncGFzdGUnXS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgICAgdGhpcy5lZGl0b3JJbnN0YW5jZXMuZm9yRWFjaChlZGl0b3IgPT4ge1xuICAgICAgICAgICAgZWRpdG9yLm9uKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICBTZXQgdGhlIHJlc3BvbnNlIHRleHRzLlxuICAgICAgIFJldHJpZXZlIHRoZSByZXNwb25zZSB0ZXh0cy5cbiAgICAgICBBcmdzOlxuICAgICAgIHRleHRzIChhcnJheSBvZiBzdHJpbmdzKTogSWYgc3BlY2lmaWVkLCB0aGUgdGV4dHMgdG8gc2V0IGZvciB0aGUgcmVzcG9uc2UuXG4gICAgICAgUmV0dXJuczpcbiAgICAgICBhcnJheSBvZiBzdHJpbmdzOiBUaGUgY3VycmVudCByZXNwb25zZSB0ZXh0cy5cbiAgICAgICAqICovXG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm4gKi9cbiAgICAgIHJlc3BvbnNlKHRleHRzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGV4dHMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZWRpdG9ySW5zdGFuY2VzLm1hcChlZGl0b3IgPT4gZWRpdG9yLmdldENvbnRlbnQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lZGl0b3JJbnN0YW5jZXMuZm9yRWFjaCgoZWRpdG9yLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGVkaXRvci5zZXRDb250ZW50KHRleHRzW2luZGV4XSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJldHVybiBhIGZ1bmN0aW9uLCB0byBiZSBhYmxlIHRvIGNyZWF0ZSBuZXcgaW5zdGFuY2UgZXZlcnkgdGltZS5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5ldyBFZGl0b3JUaW55bWNlKCk7XG4gICAgfTtcbiAgfSk7XG59KS5jYWxsKHdpbmRvdywgd2luZG93LmRlZmluZSB8fCB3aW5kb3cuUmVxdWlyZUpTLmRlZmluZSk7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./openassessment/xblock/static/js/src/lms/editors/oa_editor_tinymce.js\n");

/***/ })

/******/ });