# Data Model: Navigation bar and pages

This feature has minimal data requirements; it does not use a database or
persistent storage. The only structured data is the navigation link list.

## Entities

- **NavLink**
  - `label`: string (display text for the link)
  - `href`: string (URL path, e.g. `/about`)
  - `active?`: boolean computed at runtime (optional)

No relationships or constraints beyond simple validation (non-empty label and
href) are necessary. Since the data is hard‑coded in a module, runtime errors
are sufficient to catch misconfiguration.
