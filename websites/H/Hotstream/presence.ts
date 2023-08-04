const buildPresenceData = (details: string, imageKey: string, buttonLabel: string, buttonUrl: string): PresenceData => {
	const presenceData: PresenceData = {};

	presenceData.details = details;
	presenceData.largeImageKey = imageKey;
	presenceData.buttons = [
		{
			label: buttonLabel,
			url: buttonUrl,
		},
		{
			label: "🗨️ — Rejoindre le Discord",
			url: "https://discord.gg/67NmxBahSU",
		}
	];
	presenceData.smallImageKey = "https://i.imgur.com/pPEBDH6.png";
	presenceData.smallImageText = "Films & Séries accessible gratuitement et sans pub";

	return presenceData;
},

 presence: Presence = new Presence({
		clientId: "939192847419183175",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
		browsing: "Parcours le catalogue"
	}),
	texts = {
		branding: "Films & séries gratuis et sans pub",
		browsing: "Parcours le catalogue",
		accountHistory: "Regarde son historique",
		accountPlaylist: "Regarde ses playlists",
		accountLiked: "Regarde ses titres aimés",
		accountNotifications: "Regarde ses notifications",
		accountSettings: "Modifie ses paramètres",
		soon: "Regarde les prochaines sorties",
		franchise: "Parcours la franchise %franchise%",
	};

let browsingTimestamp: number = Math.floor(Date.now() / 1000),
 prevUrl: string = document.location.href;

presence.on("UpdateData", async () => {
	const pageData = JSON.parse(document.querySelector("#tape-asterion-dans-la-barre-de-recherche").textContent);
	let presenceData: PresenceData = {};

	if (document.location.href !== prevUrl) {
		prevUrl = document.location.href;
		browsingTimestamp = Math.floor(Date.now() / 1000);
	}

	if (document.location.pathname.includes("/discover"))
		presenceData = buildPresenceData(texts.browsing, "https://i.imgur.com/kDayimn.png", "🛒 — Voir le catalogue", "https://hotstream.fr/discover");
	 else if (document.location.pathname.includes("/account/history"))
		presenceData = buildPresenceData(texts.accountHistory, "https://i.imgur.com/kDayimn.png", "🌍 — Accéder à Hotstream", "https://hotstream.fr");
	 else if (document.location.pathname.includes("/account/playlists"))
		presenceData = buildPresenceData(texts.accountPlaylist, "", "🌍 — Accéder à Hotstream", "https://hotstream.fr");
	 else if (document.location.pathname.includes("/account/liked"))
		presenceData = buildPresenceData(texts.accountLiked, "https://i.imgur.com/jMm8JiT.png", "🌍 — Accéder à Hotstream", "https://hotstream.fr");
	 else if (document.location.pathname.includes("/account/notifications"))
		presenceData = buildPresenceData(texts.accountNotifications, "https://i.imgur.com/sY1P6Yr.png", "🌍 — Accéder à Hotstream", "https://hotstream.fr");
	 else if (document.location.pathname.includes("/account/settings"))
		presenceData = buildPresenceData(texts.accountSettings, "https://i.imgur.com/VUYaBhE.png", "🌍 — Accéder à Hotstream", "https://hotstream.fr");
	 else if (document.location.pathname.includes("/soon"))
		presenceData = buildPresenceData(texts.soon, "https://i.imgur.com/BJZSFhq.png", "⏰ — Voir les prochaines sorties", "https://hotstream.fr/soon");
	 else if (document.location.pathname.includes("/franchise"))
		presenceData = buildPresenceData(texts.franchise.replace("%franchise%", pageData.franchise), "https://yt3.googleusercontent.com/ytc/AOPolaQW5yVNzAZUpDX2bHDTApF8WKIUQH_-FQ3HMr4HRw=s900-c-k-c0x00ffffff-no-rj", "🚀 — Voir la franchise", document.location.href);

	presence.setActivity(presenceData);
});
