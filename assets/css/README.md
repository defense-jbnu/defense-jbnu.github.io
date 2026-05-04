# CSS Structure

Use `style.css` as the only stylesheet entry point from HTML pages.

- `reset.css`: browser reset, base typography, and tiny shared primitives like `.container`
- `layout.css`: site shell shared by every page, including header, navigation, footer, and global layout rules
- `home.css`: `index.html` only
- `about.css`: About menu pages, such as intro, organization/greeting, and location pages
- `cluster.css`: Research menu pages, such as cluster and research detail layouts
- `people.css`: People pages

When adding a new top-level menu area, prefer one CSS file per menu group, for example `education.css` or `community.css`.

Avoid page-level `<style>` blocks and inline `style=""` for layout or visual design. Use HTML classes and place styles in the matching CSS group file.
