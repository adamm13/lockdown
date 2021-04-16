export default function zombieDamage(zombie, shot, scene) {
  if(zombie.zombieData.health === 0){
    zombie.setVisible(false);
    zombie.body.enable = false; 
  } else {
    zombie.zombieData.health -= 1;
    console.log(zombie.zombieData.health);
  }
};