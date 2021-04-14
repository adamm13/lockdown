import { Zombie } from "../Zombie";

export default function zombieFactory(scene, zombieArray, spritesheetKey, target, obstacles) {
  zombieArray.forEach((zombie, i) => {
    scene.zombies[i] = new Zombie(scene, zombie.x, zombie.y, spritesheetKey, target, 50);
    scene.physics.add.collider(scene.zombies[i], obstacles);
  });
};