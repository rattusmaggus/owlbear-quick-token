import OBR from "https://cdn.jsdelivr.net/npm/@owlbear-rodeo/sdk@3.0.0/+esm";

const ID = "com.quick-token";
const META = "com.quick-token/original";

OBR.onReady(() => {
  OBR.contextMenu.create({
    id: `${ID}/make-token`,
    icons: [
      {
        icon: "/icon.svg",
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
        url: `/token.html?item=${encodeURIComponent(item.id)}`,
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
        icon: "/icon.svg",
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
