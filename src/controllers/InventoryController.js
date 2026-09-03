import Player from "../models/Player";
import Inventory from "../models/Inventory";

class InventoryController{
  async show(req, res){
    try{
      const inventory = await Inventory.findOne({ where: { player_id: req.playerId } });
      if(!inventory){
        return res.json('Something went wrong. It looks like you dont have an inventory...');
      }

      const { id, itens, gold } = inventory
      return res.json({
        itens,
        gold
      });
    }catch(e){
      return res.status(400).json({
        errors: e.errors.map(error => error.message)
      });
    }
  }

  async update(req, res){
    try{
      const inventory = await Inventory.findOne({ where: { player_id: req.playerId } });
      if(!inventory){
        return res.json('Something went wrong. It looks like you dont have an inventory...');
      }

      const limit = inventory.slots;
      const inventoryItens = inventory.itens.itens;
      const add = req.body.add;
      const del = req.body.del;
      const rewrite = req.body.rewrite;

      const actions = [];
      add && actions.push(add);
      del && actions.push(del);
      rewrite && actions.push(rewrite);
      if(actions.length > 1){
        return res.json('You can only do one action by request: add, del or rewrite');
      }
      if(actions.length === 0){
        return res.json('You have to inform: add, del or rewrite');
      }

      if(add){
        const newItens = [ ...inventoryItens, add];
        if(newItens.length > limit){
          return res.json('You cant do this, becase it will exceed your slots');
        }
        const newInventoryData = {
          itens: {itens: newItens},
        };
        const newInventory = await inventory.update(newInventoryData);
        return res.json(newInventory);
      }
      if(del){
        const itenToDel = inventoryItens.find(item => {
          return item === del;
        })

        if(itenToDel === undefined){
          return res.json('This item are not on your inventory');
        }

        const indexDel = indexOf(itenToDel);
        const newItens = [ ...inventoryItens];
        newItens.splice(indexDel, 1);

        const newInventorData = {
          itens: {itens: newItens},
        }

        const newInventory = await inventory.update(newInventorData);
        return res.json(newInventory);
      }
      if(rewrite){

      }

      return res.json('?You have to inform: add, del or rewrite');

    }catch(e){
      return res.status(400).json({
        errors: e.errors.map(error => error.message)
      });
    }
  }
}

export default new InventoryController();
