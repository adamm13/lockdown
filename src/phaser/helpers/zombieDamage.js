export default function zombieDamage(zombie, shot, scene) {
  shot.setVisible(false);
  zombie.setVisible(false);
  zombie.body.enable = false; 
};