interface AutosizeOptions {
	className?: string;
	append?: string;
	callback?: Function;
}

interface Autosize {
	(): JQuery;
	(options: AutosizeOptions): JQuery;
}

interface JQuery {
	autosize: Autosize;
}