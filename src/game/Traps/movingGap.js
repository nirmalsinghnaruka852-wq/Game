export default class MovingGapTrap {
    constructor(scene, player, groundLeft, groundRight, triggerObj) {
      this.scene = scene;
      this.player = player;
      this.groundLeft = groundLeft;
      this.groundRight = groundRight;
  
      this.speed = triggerObj.properties?.find(p => p.name === "Speed")?.value ?? 200;
      this.maxShift = triggerObj.properties?.find(p => p.name === "Maxshift")?.value ?? 180;
      this.leftDelay = triggerObj.properties?.find(p => p.name === "Leftdelay")?.value ?? 1000;
  
      this.activated = false;
      this.used = false;

      this.leftStartX = groundLeft.x;
      this.rightStartX = groundRight.x;
  
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

      if (this.player.body.blocked.down) return;
  
      this.leftDelayTime = 0;
      this.activated = true;
      this.used = true;

      this.trigger.body.enable = false;
      this.trigger.destroy();
    }
  
    update(delta) {
      if (!this.activated) return;
  
      const move = this.speed * (delta / 1000);
      
      if(this.groundRight.x <= this.rightStartX + this.maxShift){
        this.groundRight.x += move;
      }
  
      this.leftDelayTime += delta;
      if(this.leftDelayTime >= this.leftDelay){
        this.groundLeft.x += this.speed * (delta / 1000);
      }
  
      if (this.groundLeft.x >= this.rightStartX + this.maxShift) {
        this.activated = false;
      }
    }
  
    reset() {
      this.groundLeft.x = this.leftStartX;
      this.groundRight.x = this.rightStartX;
      this.activated = false;
  }
  }
  