// Type definitions for JS-Signals
// Project: http://millermedeiros.github.io/js-signals/
// Definitions by: Diullei Gomes <https://github.com/diullei>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module signals {
	interface SignalBinding<T> {
		active: boolean;
		context: any;
		params: any;
		detach();
		execute(paramsArr);
		getListener(): T;
		getSignal(): Signal<T>;
		isBound(): boolean;
		isOnce(): boolean;
	}

	class Signal<T> {
		/**
		 * If Signal is active and should broadcast events.
		 */
		active:boolean;

		/**
		 * If Signal should keep record of previously dispatched parameters and automatically
		 * execute listener during add()/addOnce() if Signal was already dispatched before.
		 */
		memorize:boolean;

		/**
		 * Signals Version Number
		 */
		VERSION:string;

		/**
		 * Add a listener to the signal.
		 *
		 * @param listener Signal handler function.
		 * @param listenercontext Context on which listener will be executed (object that should represent the `this` variable inside listener function).
		 * @param priority The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
		 */
		add(listener:T, listenerContext?:any, priority?:number):SignalBinding<T>;

		/**
		 * Add listener to the signal that should be removed after first execution (will be executed only once).
		 *
		 * @param listener Signal handler function.
		 * @param listenercontext Context on which listener will be executed (object that should represent the `this` variable inside listener function).
		 * @param priority The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
		 */
		addOnce(listener:T, listenerContext?:any, priority?:number):SignalBinding<T>;

		/**
		 * Dispatch/Broadcast Signal to all listeners added to the queue.
		 *
		 * @param params Parameters that should be passed to each handler.
		 */
		dispatch(...params:any[]);

		/**
		 * Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
		 */
		dispose();

		/**
		 * Forget memorized arguments.
		 */
		forget();

		/**
		 * Returns a number of listeners attached to the Signal.
		 */
		getNumListeners():number;

		/**
		 * Stop propagation of the event, blocking the dispatch to next listeners on the queue.
		 */
		halt();

		/**
		 * Check if listener was attached to Signal.
		 */
		has(listener:T, context?:any):boolean;

		/**
		 * Remove a single listener from the dispatch queue.
		 */
		remove(listener:T, context?:any):T;

		removeAll();
	}
}
