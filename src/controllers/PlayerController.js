import Player from "../models/Player";

class PlayerController{
  async show(req, res){
    try{
      const player = await Player.findByPk(req.body.id);
      if(!player){
        return res.json('Player not found');
      }
      const { id, name, classe, nivel, slots } = player;
      return res.json({ id, name, classe, nivel, slots });
    }catch(e){
      return res.status(400).json({
        errors: e.errors.map(error => error.message)
      });
    }
  }

  async store(req, res){
    try{
      const newPlayer = await Player.create(req.body);
      const { id, name, classe, nivel, slots } = newPlayer;
      return res.json({ id, name, classe, nivel, slots });
    }catch(e){
      return res.status(400).json(e);
    }
  }

  async update(req, res){
    try{
      const player = await Player.findByPk(req.body.id);
      if(!player){
        return res.json('Player not found');
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
      const player = await Player.findByPk(req.body.id);
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
