import { useEffect, useRef } from "react";
import Phaser from "phaser";
import gameConfig from "../config/Phaser.config.js";
function GamePage() {
  const gameRef = useRef(null);

  useEffect(() => {
    
    if (!gameRef.current) {
      gameRef.current = new Phaser.Game(gameConfig);
      
    }

    return () => {
      gameRef.current.destroy(true);
      gameRef.current = null;
    
    };
  }, []);

  return <div id="phaser-game" />;
}

export default GamePage;
