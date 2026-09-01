(function () {

    const HEADER_HTML = `
        <header class="nea-global-header">

            <!-- Announcement Bar -->
            <div class="nea-global-header__announcement-inner">

                <span class="nea-global-header__announcement-first">
                    <strong>SUSPENDED STAGES INC.</strong>
                    <span> IS NOW </span>
                </span>

                <strong class="nea-global-header__announcement-second">
                    NATIONAL EXTERIOR ACCESS INC.
                </strong>

            </div>


            <!-- Main Header -->
            <div class="nea-global-header__main">

                <div class="nea-global-header__inner">

                    <!-- Logo -->
                    <a
                        class="nea-global-header__logo-link"
                        href="https://www.nationalexterioraccess.com/"
                        aria-label="National Exterior Access"
                    >
                        <img
                            class="nea-global-header__logo"
                            src="https://catalog.nationalexterioraccess.com/Assets/logo.svg"
                            alt="National Exterior Access"
                        >
                    </a>


                    <!-- Catalog CTA — always visible on tablet/mobile -->
                    <a
                        class="nea-global-header__catalog-mobile"
                        href="https://catalog.nationalexterioraccess.com/"
                    >
                        Catalog
                    </a>


                    <!-- Desktop navigation -->
                    <nav
                        class="nea-global-header__desktop-nav"
                        aria-label="Main navigation"
                    >

                        <a href="https://www.nationalexterioraccess.com/about-us">
                            About Us
                        </a>

                        <a href="https://www.nationalexterioraccess.com/rentals">
                            Rentals
                        </a>

                        <a href="https://www.nationalexterioraccess.com/permanent-systems">
                            Permanent Systems
                        </a>

                        <a href="https://www.nationalexterioraccess.com/inspections">
                            Inspections
                        </a>

                        <a href="https://www.nationalexterioraccess.com/training">
                            Training
                        </a>

                        <a href="https://www.nationalexterioraccess.com/contact">
                            Contact
                        </a>

                        <a
                            class="nea-global-header__catalog-desktop"
                            href="https://catalog.nationalexterioraccess.com/"
                        >
                            Catalog
                        </a>

                    </nav>


                    <!-- Hamburger -->
                    <button
                        class="nea-global-header__toggle"
                        type="button"
                        aria-label="Open menu"
                        aria-expanded="false"
                        aria-controls="nea-global-mobile-menu"
                    >

                        <span></span>
                        <span></span>
                        <span></span>

                    </button>

                </div>
            </div>


            <!-- Tablet / Mobile menu -->
            <div
                class="nea-global-header__mobile-menu"
                id="nea-global-mobile-menu"
            >

                <nav
                    class="nea-global-header__mobile-nav"
                    aria-label="Mobile navigation"
                >

                    <a href="https://www.nationalexterioraccess.com/about-us">
                        About Us
                    </a>

                    <a href="https://www.nationalexterioraccess.com/rentals">
                        Rentals
                    </a>

                    <a href="https://www.nationalexterioraccess.com/permanent-systems">
                        Permanent Systems
                    </a>

                    <a href="https://www.nationalexterioraccess.com/inspections">
                        Inspections
                    </a>

                    <a href="https://www.nationalexterioraccess.com/training">
                        Training
                    </a>

                    <a href="https://www.nationalexterioraccess.com/contact">
                        Contact
                    </a>

                </nav>

            </div>

        </header>
    `;


    /* ========================================
       INSERT HEADER
    ======================================== */

    const slot = document.getElementById("nea-global-header-slot");

    if (slot) {

        slot.innerHTML = HEADER_HTML;

    } else {

        document.body.insertAdjacentHTML(
            "afterbegin",
            HEADER_HTML
        );

    }


    /* ========================================
       MENU BEHAVIOUR
    ======================================== */

    const header =
        document.querySelector(".nea-global-header");

    if (!header) return;

    /* ========================================
    ACTIVE NAVIGATION
    ======================================== */

    const currentHost = window.location.hostname;
    const currentPath = window.location.pathname;

    const navLinks = header.querySelectorAll(
        ".nea-global-header__desktop-nav a, .nea-global-header__mobile-nav a"
    );

    navLinks.forEach(function (link) {

        const url = new URL(link.href);

        const isCatalog =
            currentHost === "catalog.nationalexterioraccess.com" &&
            url.hostname === "catalog.nationalexterioraccess.com";

        const isMainSitePage =
            currentHost === "www.nationalexterioraccess.com" &&
            url.hostname === "www.nationalexterioraccess.com" &&
            currentPath === url.pathname;

        if (isCatalog || isMainSitePage) {
            link.classList.add("is-active");
            link.setAttribute("aria-current", "page");
        }

    });

    const mobileCatalog =
    header.querySelector(".nea-global-header__catalog-mobile");

    if (
        currentHost === "catalog.nationalexterioraccess.com" &&
        mobileCatalog
    ) {
        mobileCatalog.classList.add("is-active");
        mobileCatalog.setAttribute("aria-current", "page");
    }

    const toggle =
        header.querySelector(".nea-global-header__toggle");

    const menu =
        header.querySelector(".nea-global-header__mobile-menu");


    if (!toggle || !menu) return;


    function setMenuState(open) {

        header.classList.toggle(
            "is-menu-open",
            open
        );

        toggle.setAttribute(
            "aria-expanded",
            String(open)
        );

        toggle.setAttribute(
            "aria-label",
            open ? "Close menu" : "Open menu"
        );

    }


    toggle.addEventListener("click", function () {

        const currentlyOpen =
            header.classList.contains("is-menu-open");

        setMenuState(!currentlyOpen);

    });


    /* Close menu after selecting a link */

    menu
        .querySelectorAll("a")
        .forEach(function (link) {

            link.addEventListener("click", function () {

                setMenuState(false);

            });

        });


    /* Escape closes menu */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            setMenuState(false);

        }

    });


    /* Reset when returning to desktop */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 1024) {

            setMenuState(false);

        }

    });

})();