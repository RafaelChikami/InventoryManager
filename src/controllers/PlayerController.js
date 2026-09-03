import Player from "../models/Player";
import Inventory from "../models/Inventory";

class PlayerController{
  async show(req, res){
    try{
      const player = await Player.findByPk(req.playerId);
      if(!player){
        return res.json('Player not found');
      }
      const { id, name, classe, nivel, slots, email } = player;
      return res.json({ id, name, classe, nivel, slots, email });
    }catch(e){
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map(error => error.message)
      });
    }
  }

  async store(req, res){
    try{
      const newPlayer = await Player.create(req.body);
      const { id, name, classe, nivel, slots, email} = newPlayer;

      const newInventoryData = {
        slots: slots,
        itens: {itens: []},
        gold: 0,
        player_id: id
      };
      const newInventory = await Inventory.create(newInventoryData);
      const { itens, gold, player_id } = newInventory;


      return res.json({
        player: { id, name, classe, nivel, slots, email },
        inventory: { slots, itens, gold, player_id }
      });

    }catch(e){
      return res.status(400).json({
        errors: e.errors.map(error => error.message)
      });
    }
  }

  async update(req, res){
    try{
      const player = await Player.findByPk(req.playerId);
      if(!player){
        return res.json('Player not found');
      }

      if(req.body.email || req.body.password){
        return res.json('You can not change your email or password this way');
      }

      const newPlayersData = await player.update(req.body);
      const { id, name, classe, nivel, slots } = newPlayersData;
      return res.json({ id, name, classe, nivel, slots });
    }catch(e){
      return res.status(400).json({
        erros: e.errors.map(error => error.message)
      });
    }
  }

  async delete(req, res){
    try{
      const player = await Player.findByPk(req.playerId);
      if(!player){
        return res.json('Player not found');
      }
      await player.destroy();
      return res.json('Destroyed');
    }catch(e){
      return res.status(400).json({
        errors: e.errors.map(error => error.message)
      });
    }
  }

}

export default new PlayerController();
