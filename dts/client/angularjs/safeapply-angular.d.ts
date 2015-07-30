declare module ng {
    interface IScope {
		safeApply(): any;
		safeApply(exp: string): any;
		safeApply(exp: (scope: IScope) => any): any;
    }
}
