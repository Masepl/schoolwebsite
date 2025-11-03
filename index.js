// Make the flag image clickable — opens a website when clicked.
// Behavior:
// - Regular click: navigate current tab to targetUrl
// - Ctrl/Cmd + click: open targetUrl in a new tab/window (noopener,noreferrer)
// - Keyboard: Enter or Space activates the link when focused
// To change the destination, edit the `targetUrl` variable below.
document.addEventListener('DOMContentLoaded', () => {
	try {
		const imgs = Array.from(document.getElementsByTagName('img'));
		const flag = imgs.find(img => {
			const src = (img.getAttribute('src') || '').toLowerCase();
			const alt = (img.getAttribute('alt') || '').toLowerCase();
			return src.endsWith('poliz.png') || src.includes('poliz') || alt.includes('poliz');
		});

		if (!flag) return;

		// Set visual affordance
		flag.style.cursor = 'pointer';

		// Make keyboard-focusable for accessibility
		if (!flag.hasAttribute('tabindex')) flag.tabIndex = 0;

		// Destination URL (change this to the site you want)
		const targetUrl = 'https://youtube.com/@Masepl';

		const openLink = (e, inNewTab) => {
			if (inNewTab) {
				window.open(targetUrl, '_blank', 'noopener,noreferrer');
			} else {
				window.location.href = targetUrl;
			}
		};

		flag.addEventListener('click', (e) => {
			const newTab = e.ctrlKey || e.metaKey;
			openLink(e, newTab);
		});

		flag.addEventListener('keydown', (e) => {
			// Activate on Enter or Space
			if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
				e.preventDefault();
				const newTab = e.ctrlKey || e.metaKey;
				openLink(e, newTab);
			}
		});
	} catch (err) {
		// Fail silently in case the page structure is different
		// but log to console for debugging
		/* eslint-disable no-console */
		console.error('Flag click handler setup failed:', err);
	}
});

