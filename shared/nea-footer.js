(function () {
    const FOOTER_HTML = `
        <footer class="nea-global-footer">
            <div class="nea-global-footer__inner">
                <div class="nea-global-footer__brand">
                    <p class="nea-global-footer__eyebrow">National Exterior Access</p>
                    <h2>Access built around safer work.</h2>
                    <p class="nea-global-footer__intro">
                        Suspended access, permanent systems, inspections, and training for demanding exterior work.
                    </p>
                    <div class="nea-global-footer__socials" aria-label="Social media links">
                        <a href="https://www.instagram.com/nationalexterioraccessinc" target="_blank" rel="noopener" aria-label="Instagram">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1"></circle></svg>
                        </a>
                        <a href="https://wa.me/16048304001?text=Hello%20National%20Exterior%20Access,%20I%20need%20information%20about%20your%20services" target="_blank" rel="noopener" aria-label="WhatsApp">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 3.6A11.8 11.8 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.1c6.5 0 11.9-5.3 11.9-11.9 0-3.2-1.3-6.1-3.6-8.2ZM12 21.7c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 0 1-1.5-5.2C2.1 6.4 6.5 2 12 2s9.9 4.4 9.9 9.9-4.4 9.8-9.9 9.8Zm5.4-7.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.7.9-.8 1.1-.2.2-.3.2-.6.1-1.7-.9-2.8-1.6-3.9-3.6-.3-.5.3-.5.8-1.5.1-.2.1-.4 0-.6L9.4 7c-.2-.6-.4-.5-.7-.5h-.6c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.6c.1.2 1.8 2.8 4.4 3.9 1.7.7 2.4.8 3.3.7.5-.1 1.6-.7 1.8-1.4.2-.7.2-1.3.1-1.4-.1-.2-.3-.3-.6-.4Z"></path></svg>
                        </a>
                    </div>
                </div>

                <nav class="nea-global-footer__links" aria-label="Footer navigation">
                    <p class="nea-global-footer__label">Explore</p>
                    <a href="https://www.nationalexterioraccess.com/about-us">About Us</a>
                    <a href="https://www.nationalexterioraccess.com/rentals">Rentals</a>
                    <a href="https://www.nationalexterioraccess.com/permanent-systems">Permanent Systems</a>
                    <a href="https://www.nationalexterioraccess.com/inspections">Inspections</a>
                    <a href="https://www.nationalexterioraccess.com/training">Training</a>
                </nav>

                <div class="nea-global-footer__contact">
                    <p class="nea-global-footer__label">Get in touch</p>
                    <a href="mailto:info@ssibc.ca">info@ssibc.ca</a>
                    <a href="tel:+16044387179">(604) 438 7179</a>
                    <a href="https://www.google.com/maps/place/National+Exterior+Access+Inc+(Formerly+Suspended+Stages)/@49.2200331,-122.9830405,16z" target="_blank" rel="noopener">6989 Merritt Ave<br>Burnaby, BC V5J 4R7<br>Canada</a>
                </div>

                <div class="nea-global-footer__credentials">
                    <p class="nea-global-footer__label">Credentials</p>
                    <div class="nea-global-footer__marks">
                        <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,h=322,fit=crop/YAucca4O5oL7t5Nc/unnamed-uBf2mF2enXAAHzVC.jpg" alt="Proudly Canadian certification">
                        <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,h=339,fit=crop/YAucca4O5oL7t5Nc/cwb-national-exterior-access-inc-6cr9I3YjedtDX7XB.png" alt="CWB certification">
                    </div>
                </div>
            </div>

            <div class="nea-global-footer__bottom">
                <span>&copy; 2026 National Exterior Access Inc.</span>
                <span class="nea-global-footer__legal">
                    <a href="https://www.nationalexterioraccess.com/privacy-policy">Privacy Policy</a>
                    <a href="https://www.nationalexterioraccess.com/terms-and-conditions">Terms and Conditions</a>
                </span>
            </div>
        </footer>
    `;

    const slot = document.getElementById("nea-global-footer-slot");

    if (slot) {
        slot.innerHTML = FOOTER_HTML;
    } else {
        document.body.insertAdjacentHTML("beforeend", FOOTER_HTML);
    }
})();
