export default function zombieHit(player, zombie) {
  // could refactor for more/less damage depening on zombie 
  player.gameData.health -= 1; 
  player.tint = Math.random() * 0xffffff;
}