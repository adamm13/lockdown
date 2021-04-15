export default function zombieDamage(zombie, shot, scene) {
  if(zombie.zombieData.health === 0){
    shot.setVisible(false);
    shot.setActive(false);
    zombie.setVisible(false);
    zombie.body.enable = false; 
  } else {
    shot.setVisible(false);
    shot.setActive(false);
    zombie.zombieData.health -= 1;
    console.log(zombie.zombieData.health);
  }
};