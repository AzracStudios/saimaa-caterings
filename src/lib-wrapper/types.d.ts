export interface StrapiBanner {
	callToAction: string;
	actionButtons: any[];
	image: string;
	horizontal: string;
	vertical: string;
}

export interface StrapiPhone {
	name: string;
	phone: string;
}

export interface StrapiSocials {
	name: string;
	url: string;
	icon: any;
}

export interface StrapiImage {
	src: string;
}

export interface StrapiImageLOD {
	high: StrapiImage;
	low: StrapiImage;
}

export interface StrapiNavLink {
	name: string;
	url: string;
}

export interface StrapiPage {
	page: any[];
	seo: any[];
}

export interface StrapiGlobalConfig {
	logo: string;
	phone: StrapiPhone[];
	socials: StrapiSocials[];
	address: string;
	email: string;
}

export type BannerGradientDirection =
	| 'top-left'
	| 'top-right'
	| 'top-center'
	| 'bottom-left'
	| 'bottom-right'
	| 'bottom-center';
