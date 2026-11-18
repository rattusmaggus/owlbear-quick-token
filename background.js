import OBR from "https://cdn.jsdelivr.net/npm/@owlbear-rodeo/sdk@3.0.0/+esm";

const ID = "com.yourname.token-viewer";

OBR.onReady(() => {
  OBR.contextMenu.create({
    id: `${ID}/menu`,
    icons: [
      {
        // relative to this page, so it works on GitHub project pages too
        icon: new URL("icon.svg", location.href).href,
        label: "Open Token",
        filter: { every: [{ key: "layer", value: "CHARACTER" }] },
      },
    ],
    onClick(context) {
      const tokenId = context.items[0].id;
      OBR.popover.open({
        id: `${ID}/popover`,
        url: new URL(`token.html?id=${encodeURIComponent(tokenId)}`, location.href).href,
        width: 320,
        height: 400,
      });
    },
  });
});
