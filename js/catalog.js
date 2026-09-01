// ====== HEADER IMAGE SLIDER (auto) ======
(function () {
    try {
        const headerMain = document.querySelector('.nea-catalog-header > div:first-child');
        if (!headerMain) { console.debug('nea-slider: headerMain not found'); }
        else if (!document.querySelector('.nea-header-slider')) {
            const cards = document.querySelectorAll('.nea-card[data-bg]');
            const imageUrls = [];
            cards.forEach(card => {
                try {
                    const cssVar = (card.style && card.style.getPropertyValue) ? card.style.getPropertyValue('--nea-card-bg') : '';
                    const varMatch = (cssVar || '').match(/url\(([^)]+)\)/);
                    if (varMatch) imageUrls.push(varMatch[1].replace(/['\"]/g, '').trim());
                    else {
                        const comp = getComputedStyle(card).backgroundImage || '';
                        const m = comp.match(/url\(([^)]+)\)/);
                        if (m) imageUrls.push(m[1].replace(/['\"]/g, '').trim());
                    }
                } catch (e) { /* ignore */ }
            });

            if (imageUrls.length > 0) {
                const slider = document.createElement('div'); slider.className = 'nea-header-slider';
                const track = document.createElement('div'); track.className = 'nea-slider-track';
                slider.appendChild(track);

                imageUrls.forEach(url => {
                    const slide = document.createElement('div'); slide.className = 'nea-slide';
                    const img = document.createElement('img'); img.src = url; img.alt = '';
                    slide.appendChild(img);
                    track.appendChild(slide);
                });

                // insert the slider as a direct child of .nea-catalog-header immediately after the headerMain
                const parent = headerMain.parentNode;
                parent.insertBefore(slider, headerMain.nextSibling);
                // make sure the slider occupies the left header column in the grid
                slider.style.gridColumn = '1 / 2';

                let idx = 0; let slideWidth = 0;

                function getVerticalMargin(el) {
                    const cs = getComputedStyle(el);
                    return (parseFloat(cs.marginTop) || 0) + (parseFloat(cs.marginBottom) || 0);
                }

                function setSizes() {
                    // determine height based on the header main column's content (title + description)
                    let h = headerMain.offsetHeight;
                    // fallback to a reasonable default if measurement fails
                    if (!h || h < 80) h = 200;
                    slider.style.height = h + 'px';

                    slideWidth = slider.clientWidth;
                    Array.from(track.children).forEach(slide => {
                        slide.style.width = slideWidth + 'px';
                        slide.style.height = slider.clientHeight + 'px';
                    });
                    track.style.transition = 'transform 0s';
                    track.style.transform = 'translate3d(' + (-idx * slideWidth) + 'px,0,0)';
                    requestAnimationFrame(() => track.style.transition = 'transform 0.6s ease');
                }

                setSizes();
                window.addEventListener('resize', setSizes);

                let timer = null;
                function startAuto() { timer = setInterval(() => { idx = (idx + 1) % track.children.length; track.style.transform = 'translate3d(' + (-idx * slideWidth) + 'px,0,0)'; }, 3500); }
                function stopAuto() { if (timer) { clearInterval(timer); timer = null; } }
                startAuto();

                slider.addEventListener('mouseenter', stopAuto);
                slider.addEventListener('mouseleave', () => { stopAuto(); startAuto(); });

                // basic touch support
                let startX = 0, deltaX = 0;
                slider.addEventListener('touchstart', function (e) { stopAuto(); startX = e.touches[0].clientX; track.style.transition = ''; });
                slider.addEventListener('touchmove', function (e) { deltaX = e.touches[0].clientX - startX; track.style.transform = 'translate3d(' + (-idx * slideWidth + deltaX) + 'px,0,0)'; });
                slider.addEventListener('touchend', function () { if (Math.abs(deltaX) > (slideWidth * 0.15)) { idx += (deltaX > 0) ? -1 : 1; idx = Math.max(0, Math.min(idx, track.children.length - 1)); } track.style.transition = 'transform 0.4s ease'; track.style.transform = 'translate3d(' + (-idx * slideWidth) + 'px,0,0)'; deltaX = 0; startAuto(); });
            }
        }
    } catch (err) { console.error('nea-slider init error', err); }
})();

// ====== MOBILE FILTER TOGGLE ======
const filterPanel = document.querySelector('.nea-filter-panel');
const filterToggle = document.getElementById('nea-filter-toggle');

function setFilterPanelExpanded(isExpanded) {
    if (!filterPanel || !filterToggle) return;

    filterPanel.classList.toggle('is-expanded', isExpanded);
    filterPanel.classList.toggle('is-collapsed', !isExpanded);
    filterToggle.setAttribute('aria-expanded', String(isExpanded));
    filterToggle.setAttribute('aria-label', isExpanded ? 'Hide filters' : 'Show filters');
}

if (filterToggle) {
    filterToggle.addEventListener('click', function () {
        const isExpanded = filterPanel.classList.contains('is-expanded');
        setFilterPanelExpanded(!isExpanded);
    });

    setFilterPanelExpanded(false);
}

// ====== CATALOG CARDS MODAL ======
const modal = document.getElementById('nea-details-modal');
const closeBtn = document.getElementById('modal-close');
const cancelBtn = document.getElementById('modal-cancel');
const contactBtn = document.getElementById('modal-contact');
const detailsButtons = document.querySelectorAll('.nea-card-action');

// Open modal when clicking Details button
detailsButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();

        // Get the card element
        const card = this.closest('.nea-card');
        if (!card) return;

        // Extract data from the card
        const title = card.querySelector('.nea-card-title')?.textContent || 'Product';
        const code = card.querySelector('.nea-card-code')?.textContent || 'N/A';
        const group = card.querySelector('.nea-card-group')?.textContent || 'Category';
        const type = card.querySelector('.nea-card-type')?.textContent || 'Type';
        const badge = card.querySelector('.nea-card-badge')?.textContent || 'Category';
        const cardBackground = card.style.getPropertyValue('--nea-card-bg') || '';
        const imageMatch = cardBackground.match(/url\(([^)]+)\)/);
        const imageUrl = imageMatch ? imageMatch[1].replace(/[\'"]/g, '').trim() : '';

        // Generate a detailed description based on the title
        const description = getDescription(title, group, type);

        // Update modal content
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-code').textContent = code;
        document.getElementById('modal-group').textContent = group;
        document.getElementById('modal-type').textContent = type;
        document.getElementById('modal-badge').textContent = badge;
        document.getElementById('modal-description').textContent = description;
        const modalImage = document.getElementById('modal-image');
        const modalImageWindow = document.getElementById('modal-image-window');
        modalImage.src = imageUrl;
        modalImage.alt = title;
        modalImage.hidden = !imageUrl;

        modalImageWindow.classList.remove('is-ready');
        modalImageWindow.style.setProperty('--nea-image-travel', '0px');

        // Display the modal before measuring it so the image viewport has a real width.
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (imageUrl) {
            const updateImageTravel = function () {
                const renderedHeight = modalImage.naturalWidth
                    ? modalImage.naturalHeight * (modalImageWindow.clientWidth / modalImage.naturalWidth)
                    : modalImage.clientHeight;
                const travel = Math.max(0, renderedHeight - modalImageWindow.clientHeight);
                modalImageWindow.style.setProperty('--nea-image-travel', travel + 'px');
                modalImageWindow.classList.add('is-ready');
            };

            if (modalImage.complete) requestAnimationFrame(updateImageTravel);
            else modalImage.addEventListener('load', updateImageTravel, { once: true });
        }

        // Show modal
        // Build a predictable placeholder URL for the product page (to be implemented later).
        const productUrl = '/products/' + encodeURIComponent(code.toLowerCase().replace(/\s+/g, '-')) + '.html';
        modal.dataset.productUrl = productUrl;
        // Update LEARN MORE button href if present
        const learnBtn = document.getElementById('modal-learnmore-btn');
        if (learnBtn) learnBtn.setAttribute('href', productUrl);
    });
});

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

closeBtn?.addEventListener('click', closeModal);
cancelBtn?.addEventListener('click', closeModal);

// Close modal when clicking outside
modal.addEventListener('click', function (e) {
    if (e.target === modal) {
        closeModal();
    }
});

// Contact button action
contactBtn?.addEventListener('click', function () {
    const title = document.getElementById('modal-title').textContent;
    alert(`Thank you for your interest in: ${title}.\n\nOnce implemented, this will redirect to a contact form.`);
    closeModal();
});

// ====== SUMMARY CARDS MODAL ======
const summaryModal = document.getElementById('nea-summary-modal');
const summaryCloseBtn = document.getElementById('summary-modal-close');
const summaryCancelBtn = document.getElementById('summary-modal-cancel');
const summaryContactBtn = document.getElementById('summary-modal-contact');
const summaryCards = document.querySelectorAll('.nea-summary-card');
let lastSummaryTrigger = null;

// Summary card descriptions and details
const summaryDescriptions = {
    'Rentals': {
        description: 'High-performance swing stages and hoists for immediate project mobilization. Our rental equipment is designed for rapid deployment and maximum safety compliance.',
        details: 'Access to a wide range of swing stages, rigging components, and lifting equipment available immediately for your projects.'
    },
    'Systems': {
        description: 'Permanent engineered anchors and lifelines designed for maximum building safety. All systems are designed and certified by Professional Engineers.',
        details: 'Permanent anchorage solutions, lifeline systems, façade access options, and custom-engineered specialized structures.'
    },
    'Inspections': {
        description: 'Certified load testing and P. Eng reports to ensure total regulatory compliance. We provide comprehensive inspection and certification services.',
        details: 'Annual visual inspections, load testing, certified engineering reports, and compliance audits.'
    },
    'Training': {
        description: 'Professional hands-on certification to build safer and more efficient crews. Our training programs are OSHA-compliant and industry-recognized.',
        details: 'Fall protection orientation courses, operator training, rigger competency programs, and refresher training.'
    }
};

// Open summary modal when clicking summary card
summaryCards.forEach(card => {
    card.addEventListener('click', function (e) {
        // remember trigger for returning focus
        lastSummaryTrigger = document.activeElement;

        const title = this.querySelector('.nea-summary-number')?.textContent || 'Category';
        const fullText = this.querySelector('.nea-summary-label')?.textContent || 'Description';

        if (summaryDescriptions[title]) {
            document.getElementById('summary-modal-title').textContent = title;
            document.getElementById('summary-modal-description').textContent = summaryDescriptions[title].description;

            const detailsDiv = document.getElementById('summary-modal-details');
            detailsDiv.innerHTML = `
        <span class="nea-modal-label">More Details</span>
          <p class="nea-modal-value">${summaryDescriptions[title].details}</p>
        `;
        }

        summaryModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // focus the close button for keyboard users
        setTimeout(() => {
            summaryCloseBtn?.focus();
        }, 40);
    });
});

// Close summary modal
function closeSummaryModal() {
    summaryModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    // return focus to the trigger if possible
    setTimeout(() => {
        try {
            if (lastSummaryTrigger && typeof lastSummaryTrigger.focus === 'function') lastSummaryTrigger.focus();
        } catch (err) {
            // ignore
        }
        lastSummaryTrigger = null;
    }, 40);
}

summaryCloseBtn.addEventListener('click', closeSummaryModal);
summaryCancelBtn.addEventListener('click', closeSummaryModal);

// Close summary modal when clicking outside
summaryModal.addEventListener('click', function (e) {
    if (e.target === summaryModal) {
        closeSummaryModal();
    }
});

// Summary contact button action
summaryContactBtn.addEventListener('click', function () {
    const title = document.getElementById('summary-modal-title').textContent;
    alert(`Thank you for your interest in: ${title}.\n\nOnce implemented, this will redirect to a contact form.`);
    closeSummaryModal();
});

// Generate descriptions based on title
function getDescription(title, group, type) {
    const descriptions = {
        'Standard Straight Swing Stage': 'The standard straight swing stage provides safe, reliable access for façade work. Designed for maximum versatility, it is ideal for most suspended access projects.',

        'Sloped Stages': 'Sloped stages are specifically designed for buildings with sloped roofs or façades, providing a safe working platform at varying pitch angles.',

        'Multi-Point & Large-Scale Dance Floor Platforms': 'Large-scale dance floor platforms with multiple anchor points distribute loads evenly, enabling larger and heavier work applications.',

        'Custom Configurations': 'Custom configuration solutions tailored to the specific requirements of your project. Our engineering team designs unique systems for complex challenges.',

        'Specialty Shapes': 'Specialty-shaped platforms for buildings with unique or unconventional geometries, ensuring safety and efficiency in any architectural configuration.',

        'Horizontal Lifelines': 'Permanent horizontal lifeline systems installed on roofs for fall protection. They comply with national and international safety regulations.',

        'Roof Anchors': 'Permanent high-strength roof anchors for fall protection systems. Installed to certified engineering specifications.',

        'Annual Visual Inspections': 'Comprehensive annual visual inspections of all access and anchorage systems to ensure regulatory compliance and operational safety.',

        'Anchor Load Testing': 'Professional anchor load testing to verify structural integrity and load capacity in accordance with engineering standards.'
    };

    return descriptions[title] || `${title} is a specialized product or service in the "${group}" group. It is classified as: ${type}.\n\nFor more specific information about technical specifications, availability, and pricing, please contact our team.`;
}
