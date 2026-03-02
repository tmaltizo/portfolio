# Quickstart: Navigation bar and pages feature

This document guides a developer through building and testing the feature.

1. **Checkout branch**
   ```bash
   git checkout 002-add-navigation-pages
   ```

2. **Install dependencies** (if not already done)
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in a browser.

4. **Verify navigation**
   - The top of every page should display a nav bar with links: Home, About,
     Writing, Projects.
   - Clicking each link should navigate to the corresponding path.
   - The active link should be visually highlighted.

5. **Add a new link (extensibility test)**
   - Open `components/navLinks.js` (or similar) and add a new object to the
     exports array, e.g. `{ label: 'Contact', href: '/contact' }`.
   - Create a new page file `pages/contact.js` with minimal content.
   - Reload the site and confirm the new link appears and works.

6. **Run automated tests** (if implemented)
   ```bash
   npm test -- src/components/NavBar.test.js
   ```
   (Ensure `jest`/RTL tests cover render and navigation behaviour.)

7. **Review Lighthouse performance**
   - Use Chrome DevTools to run Lighthouse audit on the home page.
   - Confirm performance score ≥ 90 and no accessibility violations in nav.

8. **Commit changes**
   ```bash
   git add pages/ components/ specs/002-add-navigation-pages
   git commit -m "feat: add nav bar and initial pages"
   ```

This quickstart should allow any contributor to reproduce the feature's
functionality and verify adherence to requirements.
