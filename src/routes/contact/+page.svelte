<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchContact, fetchGlobal, postContactMessage } from '../../lib-wrapper/useAxios';
	import Page from '../../layouts/pagebuilder/pagebuilder.svelte';
	import type { StrapiGlobalConfig, StrapiPage } from '../../lib-wrapper/types';
	import Text from '../../components/text/text.svelte';
	import './contact.scss';
	import Button from '../../components/button/button.svelte';
	import ContactBanner from '../../layouts/contact-banner/contact-banner.svelte';

	let global: StrapiGlobalConfig;
	$: global;
	let pageData: StrapiPage;
	$: pageData;

	let mapUrl: string;
	$: mapUrl;

	let name: HTMLInputElement;
	$: name;

	let phone: HTMLInputElement;
	$: phone;

	let message: HTMLTextAreaElement;
	$: message;

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		const res = await postContactMessage(name.value, phone.value, message.value);
		name.value = '';
		phone.value = '';
		message.value = '';

		alert('Thankyou for leaving a message! We will contact you as soon as possible!');
	};

	onMount(async () => {
		global = await fetchGlobal();
		pageData = await fetchContact();
		mapUrl = pageData.page[0].map;
	});
</script>

<Page {pageData} onlySEO />

<div class="contact">
	<div class="vspace vspace--small" />
	<Text text="Contact Us" style="l-bold" />
	<div class="vspace vspace--small" />	

	<div class="wrapper">
		<form
			action="POST"
			on:submit={(e) => {
				handleSubmit(e);
			}}
		>
			<div class="formrow">
				<div class="formitem">
					<Text text="Name" style="s-medium" />
					<input type="text" bind:this={name} required />
				</div>

				<div class="formitem">
					<Text text="Phone" style="s-medium" />
					<input
						type="text"
						bind:this={phone}
						required
						pattern="[0-9]*"
						minlength="10"
						maxlength="10"
					/>
				</div>
			</div>

			<div class="formitem">
				<Text text="Message" style="s-medium" />
				<textarea bind:this={message} rows="4" required />
			</div>

			<div class="vspace vspace--small" />
			<div class="formitem">
				<Button text="Submit" style="m-medium" filled />
			</div>
		</form>

		<div class="map">
			<iframe
				title="map"
				src={mapUrl}
				style="border:0;"
				allowfullscreen={false}
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
			/>
		</div>
	</div>
</div>
