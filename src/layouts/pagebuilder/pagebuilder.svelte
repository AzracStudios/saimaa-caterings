<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '../../components/button/button.svelte';
	import Interactable from '../../components/interactable.svelte';
	import Text from '../../components/text/text.svelte';
	import Image from '../../components/image/image.svelte';
	import { BACKEND_URL } from '../../env';
	import './pagebuilder.scss';
	import Intersectable from '../../components/intersectable/intersectable.svelte';
	import Card from '../card/card.svelte';
	import ComplexCard from '../complex-card/complex-card.svelte';
	import Desktoponly from '../../components/conditionalview/desktoponly.svelte';
	import Mobileonly from '../../components/conditionalview/mobileonly.svelte';
	import type { StrapiGlobalConfig } from '../../lib-wrapper/types';

	export let pageData: { page: any[]; seo: any[] } | undefined;
	$: pageData;

	export let onlySEO: boolean = false;

	export let global: StrapiGlobalConfig | undefined = undefined;
	$: global;
</script>

<svelte:head>
	{#if pageData?.seo}
		{#each pageData.seo as element}
			{#if element.__component == 'seo.title'}
				<title>{element.title}</title>
				<meta name="og:title" property="og:title" content={element.title} />
			{/if}
			{#if element.__component == 'seo.description'}
				<meta name="description" property="description" content={element.description} />
				<meta name="og:description" property="og:description" content={element.description} />
			{/if}
			{#if element.__component == 'seo.url'}
				<meta name="url" property="url" content={element.url} />
				<meta name="og:url" property="og:url" content={element.url} />
			{/if}
		{/each}
	{/if}
</svelte:head>

{#if pageData?.page && !onlySEO}
	<div class="page">
		{#each pageData.page as element}
			<Intersectable once>
				<div class="page__element">
					{#if element.__component == 'content.button'}
						<div
							class="element__button"
							style={element.centered ? 'width:fit-content;margin-inline: auto;' : ''}
						>
							<Interactable
								onclick={() => {
									goto(element.url);
								}}
							>
								<Button text={element.text} style="m-medium" />
							</Interactable>
						</div>
					{/if}
					{#if element.__component == 'content.action-section'}
						<div class="element__action-section">
							<div
								class="element__paragraph-wrapper element__paragraph-wrapper--{element.paragraph
									.image_placement}"
							>
								<Image
									src={`${BACKEND_URL}${element.paragraph.image.data.attributes.url}`}
									alt={element.paragraph.image.data.attributes.name}
									style={element.paragraph.image_size ? `width: ${element.paragraph.image_size}` : ''}
								/>

								<div class="text__wrapper">
									<Text
										text={element.title.text}
										style="{element.title.size}-{element.title.style}"
										fancy={element.title.fancy}
										alignment={element.title.centered ? 'centered' : ''}
									/>
									<Text text={element.paragraph.paragraph} style="s-medium" />
									<div
										class="element__button"
										style={element.button.centered ? 'width:fit-content;margin-inline: auto;' : ''}
									>
										<Interactable
											onclick={() => {
												goto(element.button.url);
											}}
										>
											<Button text={element.button.text} style="m-medium" />
										</Interactable>
									</div>
								</div>
								<div class="element__clear" />
							</div>
						</div>
					{/if}
					{#if element.__component == 'content.image'}
						<div class="element__image {element.centered ? 'center' : ''}">
							<Image
								src={`${BACKEND_URL}${element.image.data.attributes.url}`}
								alt={element.description}
								style="max-width: {element.width || '100%'}; margin-block: 1rem;"
							/>
						</div>
					{/if}
					{#if element.__component == 'content.link'}
						<div class="element__link">
							<Text text={element.display_name} url={element.url} />
						</div>
					{/if}
					{#if element.__component == 'content.paragraph'}
						<div class="element__paragraph" style="margin-bottom: 2.5rem;">
							<Text text={element.paragraph} style="s-medium" />
						</div>
					{/if}
					{#if element.__component == 'content.text'}
						<div class="element__text {element.centered ? 'center' : ''} {element.size == "l" ? 'title' : ''}">
							<Text
								text={element.text}
								style="{element.size}-{element.style}"
								fancy={element.fancy}
								alignment={element.centered ? 'centered' : ''}
							/>
						</div>
					{/if}
					{#if element.__component == 'content.title'}
						<div class="element__title page__title">
							<Text text={element.title} style="l-bold" />
						</div>
					{/if}
					{#if element.__component == 'content.seperator'}
						<div class="vspace vspace--{element.size}" />
					{/if}
					{#if element.__component == 'content.paragraph-with-image'}
						<div
							class="element__paragraph-wrapper element__paragraph-wrapper--{element.image_placement}"
						>
							<Image
								src={`${BACKEND_URL}${element.image.data.attributes.url}`}
								alt={element.image.data.attributes.name}
								style="width:{element.image_size || '25%'};"
							/>
							{#each element.paragraph.split('\n') as sec}
								<Text text={sec} style="s-medium" />
								<div class="vspace vspace--small" />
							{/each}
							<div class="element__clear" />
						</div>
					{/if}
					{#if element.__component == 'content.video-url'}
						<div class="element__video">
							<iframe
								src={element.url}
								title={element.title}
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowfullscreen
							/>
						</div>
					{/if}
					{#if element.__component == 'content.card-container'}
						<div class="element__card-container">
							{#each element.cards as card}
								<div class="clickable_card" style="cursor: pointer">
									<Interactable
										onclick={() => {
											goto(card.url);
										}}
									>
										<Card image="{BACKEND_URL}{card.image.data.attributes.url}" text={card.title} />
									</Interactable>
								</div>
							{/each}
						</div>
					{/if}
					{#if element.__component == 'content.complex-card-container'}
						<Desktoponly>
							<div class="element__complex-card-container">
								{#each element.cards as card}
									<ComplexCard
										image="{BACKEND_URL}{card.image.data.attributes.url}"
										title={card.title}
										quote={card.quote}
										description={card.description}
									/>
								{/each}
							</div>
						</Desktoponly>

						<Mobileonly>
							<div class="element__complex-card-container element__complex-card-container--mobile">
								{#each element.cards as card}
									<ComplexCard
										image="{BACKEND_URL}{card.image.data.attributes.url}"
										title={card.title}
										quote={card.quote}
										description={card.description}
									/>
								{/each}
							</div>
						</Mobileonly>
					{/if}

					{#if element.__component == 'content.testimoinal-container'}
						<div class="element__testimonial-container">
							{#each element.testimonial as testimonial}
								<div class="element__testimonial">
									<Text text={testimonial.name} style="m-bold" />
									<Text text={testimonial.statement} style="s-medium" />
								</div>
							{/each}
						</div>
					{/if}

					{#if element.__component == 'contact.contact-card-container'}
						<div class="element__contact-card-container">
							{#each element.contacts as contact}
								<Interactable
									onclick={() => {
										goto(
											`https://api.whatsapp.com/send?phone=${contact.phone
												.replace('+', '')
												.replace(' ', '')}`
										);
									}}
								>
									<div class="contact-card">
										<Text text={contact.name} style="m-bold" alignment="center" />
										<Text text={contact.phone} style="m-regular" alignment="center" />
									</div>
								</Interactable>
							{/each}
						</div>
						<!-- <div class="vspace vspace--medium" /> -->
					{/if}
				</div>
			</Intersectable>
		{/each}
	</div>
{/if}
