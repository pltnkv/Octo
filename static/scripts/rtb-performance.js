(function () {
	var performance = {
		getWatchers: function (root) {
			root = angular.element(root || document.documentElement);

			function getElemWatchers(element) {
				var isolateWatchers = getWatchersFromScope(element.data().$isolateScope);
				var scopeWatchers = getWatchersFromScope(element.data().$scope);
				var watchers = scopeWatchers.concat(isolateWatchers);
				angular.forEach(element.children(), function (childElement) {
					watchers = watchers.concat(getElemWatchers(angular.element(childElement)));
				});
				return watchers;
			}

			function getWatchersFromScope(scope) {
				if (scope) {
					return scope.$$watchers || [];
				} else {
					return [];
				}
			}

			return getElemWatchers(root);
		},

		getWatchersCount: function (root) {
			return this.getWatchers(root).length;
		},

		getApplyTime: function () {
			var root = angular.element(document);
			console.time('$apply');
			root.data().$scope.$apply();
			console.timeEnd('$apply');
		}
	};

	window.rtbPerformance = performance;
})();



