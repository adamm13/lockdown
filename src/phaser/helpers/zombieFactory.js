import { Zombie } from "../Zombie";

export default function zombieFactory(scene, zombieArray, spritesheetKey, target, obstacles) {
  const zombieSpeed = 120;
  zombieArray.forEach((zombie, i) => {
    scene.zombies[i] = new Zombie(scene, zombie.x, zombie.y, spritesheetKey, target, zombieSpeed);
    scene.physics.add.collider(scene.zombies[i], obstacles);
  });
};