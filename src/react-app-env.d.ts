/// <reference types="react-scripts" />

declare namespace NodeJS {
	interface ProcessEnv {
		REACT_APP_CHEC_PUBLIC_KEY: string,
		REACT_APP_STRIPE_PUBLIC_KEY: string,
	}
}

declare module '*.module.scss' {
	const className: {[name: string]: string};
	export default className;
}

