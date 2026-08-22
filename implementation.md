# Implementation: Image URL Fix (Part 3)

## Issue Discovered (Double Slash Issue)
You encountered a URL like:
`http://api-artisticcarpets.nexcorealliance.com/api//uploads/products/...`

**Why did this happen?**
This happens if your `NEXT_PUBLIC_API_URL` environment variable has a trailing slash at the end (e.g., `http://api-artisticcarpets.nexcorealliance.com/api/`).
In our previous fix, the Regex was strictly looking for `/api` exactly at the end of the string (`/\/api$/`). Because of the extra trailing slash `/`, the Regex failed to match. 
As a result, `process.env.NEXT_PUBLIC_API_URL.replace(...)` didn't remove anything, leaving `baseUrl` as `.../api/`. 
When the backend path (`/uploads/products/...`) was appended, it created a double slash: `.../api/` + `/uploads...` = `.../api//uploads...`.

## Fix Applied
I updated the script and ran it again to modify the Regex to `.replace(/\/api\/?$/, "")`. 
The `\/?` part tells the code to optionally match a trailing slash. Now, whether your `NEXT_PUBLIC_API_URL` is set to `.../api` or `.../api/`, it will correctly strip it off and leave just the domain.

### Files Updated:
- `src/app/dashboard/page.jsx`
- `src/app/gallery/page.jsx`
- `src/app/gallery/[id]/page.jsx`
- `src/app/shop/[slug]/page.jsx`
- `src/components/layout/Navbar.jsx`
- `src/components/products/ProductCard.jsx`
- `src/components/products/QuickViewModal.jsx`
- `src/components/shop/ProductCard.jsx`

Now, `http://api-artisticcarpets.nexcorealliance.com/api/`.replace(/\/api\/?$/, "") correctly returns `http://api-artisticcarpets.nexcorealliance.com`, avoiding the double slash problem.
