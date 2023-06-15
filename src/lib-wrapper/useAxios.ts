import axios from 'axios';
import { BACKEND_URL } from '../env';
import type {
	StrapiBanner,
	StrapiGlobalConfig,
	StrapiImage,
	StrapiImageLOD,
	StrapiNavLink,
	StrapiPage
} from './types';
import { fakeData } from './fakeData';

export const fetchBanners = async (): Promise<StrapiBanner[]> => {
	const data = await axios.get(`${BACKEND_URL}/api/banners?populate=*`);
	return [
		...data.data.data.map((e: any): StrapiBanner => {
			return {
				callToAction: e.attributes.call_to_action,
				actionButtons: e.attributes.action_button,
				image: `${BACKEND_URL}${e.attributes.image.data.attributes.url}`,
				horizontal: e.attributes.horizontal_alignment,
				vertical: e.attributes.vertical_alignment
			};
		})
	];
};

export const fetchGallery = async (): Promise<StrapiPage> => {
	const data = await axios.get(`${BACKEND_URL}/api/gallery?populate[0]=images&populate[1]=seo`);
	return {
		page: [
			...data.data.data.attributes.images.data.map((e: any): StrapiImageLOD => {
				return {
					high: { src: `${BACKEND_URL}${e.attributes.url}` },
					low: { src: `${BACKEND_URL}${e.attributes.formats.small.url}` }
				};
			})
		],
		seo: data.data.data.attributes.seo
	};
};

export const fetchGlobal = async (): Promise<StrapiGlobalConfig> => {
	const data = await axios.get(
		`${BACKEND_URL}/api/global-config?populate[logo][populate][0]=*&populate[socials][populate][1]=icon&populate[phone][populate][2]=*`
	);

	return {
		logo: `${BACKEND_URL}${data.data.data.attributes.logo.data.attributes.url}`,
		phone: data.data.data.attributes.phone,
		socials: data.data.data.attributes.socials,
		address: data.data.data.attributes.address,
		email: data.data.data.attributes.email
	};
};

export const fetchNavLinks = async (): Promise<StrapiNavLink[]> => {
	const data = await axios.get(`${BACKEND_URL}/api/navigation-link?populate=*`);
	return [
		...data.data.data.attributes.links.map((e: any): StrapiNavLink => {
			return { name: e.display_name, url: e.url };
		})
	];
};

export const fetchEvents = async (name: string): Promise<any> => {
	const data = await axios.get(
		`${BACKEND_URL}/api/services?populate=*&filters[event_name][$eq]=${name}`
	);
	return data.data.data[0].attributes;
};

export const fetchHome = async (): Promise<StrapiPage> => {
	const data = await axios.get(
		`${BACKEND_URL}/api/home?populate[home][populate][0]=cards.image&populate[home][populate][1]=image&populate[home][populate][2]=paragraph.image&populate[home][populate][3]=button&populate[home][populate][4]=testimonial&populate[seo][populate][5]=*&populate[home][populate][6]=title&populate[home][populate][7]=cards`
	);
	return { page: data.data.data.attributes.home, seo: data.data.data.attributes.seo };
};

export const fetchAbout = async (): Promise<StrapiPage> => {
	const data = await axios.get(
		`${BACKEND_URL}/api/about-page?populate[about][populate][0]=image&populate[seo][populate][1]=*`
	);
	return { page: data.data.data.attributes.about, seo: data.data.data.attributes.seo };
};

export const fetchDhinabojanam = async (): Promise<StrapiPage> => {
	const data = await axios.get(
		`${BACKEND_URL}/api/dhinabojanam-page?populate[dhinabojanam][populate][0]=cards.image&populate[dhinabojanam][populate][1]=image&populate[seo][populate][2]=*&populate[dhinabojanam][populate][3]=contacts.phone`
	);
	return { page: data.data.data.attributes.dhinabojanam, seo: data.data.data.attributes.seo };
};

export const fetchServices = async (): Promise<StrapiPage> => {
	const data = await axios.get(
		`${BACKEND_URL}/api/services-page?populate[services][populate][0]=cards.image&populate[seo][populate][1]=*`
	);
	return { page: data.data.data.attributes.services, seo: data.data.data.attributes.seo };
};

export const fetchContact = async (): Promise<StrapiPage> => {
	const data = await axios.get(`${BACKEND_URL}/api/contact?populate[seo][populate]=*`);
	return { page: [{ map: data.data.data.attributes.map_url }], seo: data.data.data.attributes.seo };
};

export const postContactMessage = async (
	name: string,
	phone: string,
	message: string
): Promise<any> => {
	const data = await axios.post(`${BACKEND_URL}/api/messages`, {
		data: {
			name: name,
			phone: phone,
			message: message
		}
	});

	return data.data.error;
};

////  FORM ////

export async function loadForm() {
	const form = { repeatable: <any>[], once: <any>[] };
	let data: any = await axios.get(`${BACKEND_URL}/api/menus?populate[form]=*`);

	data = data.data.data;

	for (let i = 0; i < data.length; i++) {
		let toPush = { title: data[i].attributes.title, sections: <any>[] };

		for (let j = 0; j < data[i].attributes.form.length; j++) {
			const element = data[i].attributes.form[j];
			toPush.sections.push({
				title: element.title,
				options: [
					...element.items.split('\n').map((e: any) => {
						return { value: e, selected: false };
					})
				]
			});
		}

		(data[i].attributes.repeat ? form.repeatable : form.once).push(toPush);
	}

	return form;
}

export async function pushForm(formData: any) {
	// let formData = fakeData;
	let data: any = "";
	data += `
	Customer Name:, ${formData.customerInfo.name}
	Customer Phone:, ${formData.customerInfo.phone}
	Event:, ${formData.customerInfo.eventType}
	Venue:, ${formData.customerInfo.eventVenue}
	=====,=====`
	

	console.log(formData)
}
