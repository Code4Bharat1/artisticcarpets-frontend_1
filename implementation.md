# Implementation: Image URL Fix (Part 2)

## Issue Discovered
After the first fix, the images were still failing with a URL like:
`https://artisticcarpets.nexcorealliance.com/-artisticcarpets.nexcorealliance.com/uploads/...`

**Why?**
The frontend code was doing `.replace("/api", "")` on the `process.env.NEXT_PUBLIC_API_URL` to calculate the base URL for images. 
When `NEXT_PUBLIC_API_URL` is `https://api-artisticcarpets.nexcorealliance.com/api`, the `replace` function replaces the **first** occurrence of `/api`.
Because the domain name is `api-artisticcarpets`, the first occurrence is actually `//api` right after `https:`.
This turned the string into `https:/-artisticcarpets.nexcorealliance.com/api`, which the browser interpreted as a relative path and appended to the current frontend domain!

## Fix Applied
I created and ran a script to update all instances of `.replace("/api", "")` to use a Regex that strictly targets `/api` only at the **end** of the URL string: `.replace(/\/api$/, "")`.

### Files Updated:
- `src/app/dashboard/page.jsx`
- `src/app/gallery/page.jsx`
- `src/app/gallery/[id]/page.jsx`
- `src/app/shop/[slug]/page.jsx`
- `src/components/layout/Navbar.jsx`
- `src/components/products/ProductCard.jsx`
- `src/components/products/QuickViewModal.jsx`
- `src/components/shop/ProductCard.jsx`

Now, `https://api-artisticcarpets.nexcorealliance.com/api`.replace(/\/api$/, "") correctly returns `https://api-artisticcarpets.nexcorealliance.com`, and images will load correctly in the user panel.

**Important:** Please restart your Next.js development server (`npm run dev`) if you haven't already.
