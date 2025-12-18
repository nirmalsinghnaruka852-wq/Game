export default class MovingGroundDown {
    constructor(scene, player, ground, triggerObj) {
      this.scene = scene;
      this.player = player;
      this.ground = ground;
  
      this.speed = triggerObj.properties?.find(p => p.name === "Speed")?.value ?? 200;
        
      this.Start = this.ground.y;

      this.activated = false;
      this.used = false;

      this.trigger = scene.add.zone(
        triggerObj.x + triggerObj.width /2,
        triggerObj.y + triggerObj.height/2,
        triggerObj.width,
        triggerObj.height
      ).setOrigin(0.5, 0.5);
  
      this.scene.physics.world.enable(this.trigger);
      this.trigger.body.setAllowGravity(false);
      this.trigger.body.setImmovable(true);
  
    
      this.scene.physics.add.overlap(player, this.trigger, this.onTrigger, null, this);
    }
  
    onTrigger() {

      if(this.used) return;
  
      this.activated = true;
      this.used = true;

      this.trigger.body.enable = false;
      this.trigger.destroy();
    }
  
    update(delta) {
      if (!this.activated) return;
  
      const move = this.speed * (delta / 1000);
      
      this.ground.y += move;
      
    }
  
    reset() {
      this.ground.y = this.Start;
      this.activated = false;
  }
  }
  