export default function loadSprites() {
  loadSprite("coin", "sprites/shining-star-coin.png", {
    sliceX: 6,
    anims: {
      shine: {
        frames: Array(90).fill(0).concat([1, 2, 4, 5, 3]),
        speed: 30,
        loop: true,
      },
    },
  });
  loadSprite("card-table", "sprites/Card Table.png", {
    sliceY: 3,
  });
  loadSprite("copy-machine", "sprites/Copy Machine.png");
  loadSprite("gear", "sprites/gear.png");

  loadSprite("tropyhy", "sprites/trophy.png");
  loadSprite("floor", "sprites/tilestonebricks.png");
  loadCrew("sprite", "sparkling");
  loadCrew("sprite", "paper");
  loadCrew("sprite", "toolbox");
  loadCrew("sprite", "pencil");
  loadCrew("sprite", "play");
  loadCrew("sprite", "wizarding");
  loadCrew("sprite", "onion");
  loadCrew("sprite", "steel");
  // loadSprite("girl", "sprites/girl.png", {
  //   sliceX: 4,
  //   sliceY: 5,
  //   anims: {
  //     down: { from: 12, to: 15, speed: 8, loop: true },
  //     left: { from: 8, to: 11, speed: 8, loop: true },
  //     right: { from: 4, to: 7, speed: 8, loop: true },
  //     up: { from: 16, to: 19, speed: 8, loop: true },
  //   },
  // });
  // loadSprite("julia", "sprites/julia.png", {
  //   sliceX: 4,
  //   sliceY: 4,
  //   anims: {
  //     down: { from: 0, to: 3, speed: 8, loop: true },
  //     left: { from: 4, to: 7, speed: 8, loop: true },
  //     right: { from: 8, to: 11, speed: 8, loop: true },
  //     up: { from: 12, to: 15, speed: 8, loop: true },
  //   },
  // });
}
