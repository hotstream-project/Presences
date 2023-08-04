const presence: Presence = new Presence({
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

let browsingTimestamp: number = Math.floor(Date.now() / 1000);
let prevUrl: string = document.location.href;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {},
	 	pageData = JSON.parse(document.querySelector("#tape-asterion-dans-la-barre-de-recherche").textContent);

	if (document.location.href !== prevUrl) {
		prevUrl = document.location.href;
		browsingTimestamp = Math.floor(Date.now() / 1000);
	}

	if (document.location.pathname.includes("/discover")) {
		presenceData.details = texts.browsing;
		presenceData.largeImageKey = "https://i.imgur.com/kDayimn.png";

		presenceData.buttons = [
			{
				label: "🛒 — Voir le catalogue",
				url: "https://hotstream.fr/discover",
			},
		];
	} else if (document.location.pathname.includes("/account/history")) {
		presenceData.details = texts.accountHistory;
		presenceData.largeImageKey = "https://i.imgur.com/kDayimn.png";

		presenceData.buttons = [
			{
				label: "🌍 — Accéder à Hotstream",
				url: "https://hotstream.fr",
			},
		];
	} else if (document.location.pathname.includes("/account/playlists")) {
		presenceData.details = texts.accountPlaylist;
		presenceData.largeImageKey = "";

		presenceData.buttons = [
			{
				label: "🌍 — Accéder à Hotstream",
				url: "https://hotstream.fr",
			},
		];
	} else if (document.location.pathname.includes("/account/liked")) {
		presenceData.details = texts.accountLiked;
		presenceData.largeImageKey = "https://i.imgur.com/jMm8JiT.png";

		presenceData.buttons = [
			{
				label: "🌍 — Accéder à Hotstream",
				url: "https://hotstream.fr",
			},
		];
	} else if (document.location.pathname.includes("/account/notifications")) {
		presenceData.details = texts.accountNotifications;
		presenceData.largeImageKey = "https://i.imgur.com/sY1P6Yr.png";

		presenceData.buttons = [
			{
				label: "🌍 — Accéder à Hotstream",
				url: "https://hotstream.fr",
			},
		];
	} else if (document.location.pathname.includes("/account/settings")) {
		presenceData.details = texts.accountSettings;
		presenceData.largeImageKey = "https://i.imgur.com/VUYaBhE.png";

		presenceData.buttons = [
			{
				label: "🌍 — Accéder à Hotstream",
				url: "https://hotstream.fr",
			},
		];
	} else if (document.location.pathname.includes("/soon")) {
		presenceData.details = texts.soon;
		presenceData.largeImageKey = "https://i.imgur.com/BJZSFhq.png";

		presenceData.buttons = [
			{
				label: "⏰ — Voir les prochaines sorties",
				url: "https://hotstream.fr/discover",
			},
		];
	} else if (document.location.pathname.includes("/franchise")) {
		presenceData.details = texts.franchise.replace("%franchise%", pageData.franchise);
		presenceData.largeImageKey = "https://yt3.googleusercontent.com/ytc/AOPolaQW5yVNzAZUpDX2bHDTApF8WKIUQH_-FQ3HMr4HRw=s900-c-k-c0x00ffffff-no-rj";

		presenceData.buttons = [
			{
				label: "🚀 — Voir la franchise",
				url: document.location.href,
			},
		];
	}

	if (presenceData.buttons) {
		presenceData.buttons.push({
			label: "🗨️ — Rejoindre le Discord",
			url: "https://discord.gg/67NmxBahSU",
		});
	}

	presenceData.smallImageKey = "https://i.imgur.com/pPEBDH6.png";
	presenceData.smallImageText = "Films & Séries accessible gratuitement et sans pub";

	presence.setActivity(presenceData);
});
