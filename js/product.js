(function () {
    const standardPanels = Array.from(document.querySelectorAll('[data-scroll-panel]:not(.nea-product-summary-mobile)'));
    const mobilePanels = Array.from(document.querySelectorAll('.nea-product-summary-mobile'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if ((!standardPanels.length && !mobilePanels.length) || reduceMotion) return;

    let frameRequested = false;

    const updatePanels = function () {
        frameRequested = false;

        const viewportCenter = window.innerHeight * 0.58;
        const clearZone = window.innerHeight * 0.44;
        const fadeDistance = window.innerHeight * 1.05;
        const compactLayout = window.innerWidth <= 820;
        const panels = compactLayout
            ? mobilePanels.concat(standardPanels)
            : standardPanels;

        panels.forEach(function (panel) {
            const bounds = panel.getBoundingClientRect();
            const panelCenter = bounds.top + (bounds.height / 2);
            const distance = Math.abs(panelCenter - viewportCenter);
            let progress;

            if (compactLayout && panel === panels[0]) {
                const revealStart = window.innerHeight * 0.84;
                const revealEnd = window.innerHeight * 0.46;
                progress = Math.max(0, Math.min(1, (revealStart - bounds.top) / (revealStart - revealEnd)));
            } else {
                const distanceAfterClearZone = Math.max(0, distance - clearZone);
                const fadeProgress = Math.min(1, distanceAfterClearZone / fadeDistance);
                progress = 1 - (fadeProgress * fadeProgress * (3 - (2 * fadeProgress)));
            }

            panel.style.opacity = String(0.22 + (progress * 0.78));
            panel.style.transform = 'translateY(' + ((1 - progress) * 24) + 'px) scale(' + (0.99 + (progress * 0.01)) + ')';
            panel.classList.toggle('is-active', progress > 0.82);
        });
    };

    const requestPanelUpdate = function () {
        if (frameRequested) return;
        frameRequested = true;
        window.requestAnimationFrame(updatePanels);
    };

    window.addEventListener('scroll', requestPanelUpdate, { passive: true });
    window.addEventListener('resize', requestPanelUpdate);
    updatePanels();
})();
