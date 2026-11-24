# poke.ra website

The site is in `dist/` and can be served by any static host. Start at `dist/index.html` to preview it from your computer. The shopping bag is stored in the visitor’s browser.

## Update the next pop-up

In `dist/site-content.js`, replace `nextPopUp: null` with an object using this format. Replace the example details with confirmed information.

```js
nextPopUp: {
  name: "Card show name",
  date: "Saturday, 12 December 2026",
  hours: "12–8 pm",
  venue: "Venue name, booth number",
  details: "Any extra details for visitors",
  maps: "https://www.google.com/maps/search/?api=1&query=Your+venue"
},
```

The title updates the announcement bar. The details appear on Home and Visit & Events after redeploying. You can leave out hours, details, or the map link. After the event, set `nextPopUp` back to `null` to show the Instagram link for future announcements. Update `store`, `phone`, and `whatsapp` in the same file if contact or location details change.

## Shop, enquiries and social posts

- The catalog, MYR prices, cart and checkout are for demonstration. The site does not accept orders or payments.
- The contact and trade forms open a WhatsApp draft. The visitor can edit it and attach photos before sending.
- The homepage uses the official TikTok creator embed for `@poke.ra_`. TikTok displays up to ten recent public posts. Visitors can open the profile directly if the embed is unavailable.
- The supplied brand and shop photos are in `dist/assets/`. Sample card images are from the Pokémon TCG image database.
