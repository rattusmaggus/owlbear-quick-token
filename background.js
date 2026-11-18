import OBR from "https://cdn.jsdelivr.net/npm/@owlbear-rodeo/sdk@3.0.0/+esm";

const ID = "com.quick-token";
const META = "com.quick-token/original";

// Owlbear resolves relative URLs against ITS OWN site, which causes 404s.
// So always build full URLs from where this extension is actually hosted.
const here = (path) => new URL(path, location.href).href;

OBR.onReady(() => {
  OBR.contextMenu.create({
    id: `${ID}/make-token`,
    icons: [
      {
        icon: here("icon.svg"),
        label: "Make Token",
        filter: {
          min: 1,
          max: 1,
          every: [
            { key: "type", value: "IMAGE" },
            { key: "layer", value: "CHARACTER" },
          ],
        },
      },
    ],
    onClick(context) {
      const item = context.items[0];
      OBR.modal.open({
        id: `${ID}/modal`,
        url: here(`token.html?v=3&item=${encodeURIComponent(item.id)}`),
        width: 360,
        height: 560,
      });
    },
  });

  // Put the original image back on a token made with Quick Token
  OBR.contextMenu.create({
    id: `${ID}/revert`,
    icons: [
      {
        icon: here("icon.svg"),
        label: "Revert Token",
        filter: {
          min: 1,
          every: [
            { key: "type", value: "IMAGE" },
            { key: ["metadata", META], value: undefined, operator: "!=" },
          ],
        },
      },
    ],
    async onClick(context) {
      await OBR.scene.items.updateItems(context.items, (items) => {
        for (const it of items) {
          const orig = it.metadata[META];
          if (!orig) continue;
          it.image = orig.image;
          it.grid = orig.grid;
          delete it.metadata[META];
        }
      });
    },
  });
});
