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
        if(typeof add !== 'string') {
          return res.json('Invalid value');
        }
        if(add.trim() === ''){
          return res.json('Invalid value');
        }
        const newItens = [ ...inventoryItens, add.toLowerCase()];
        if(newItens.length > limit){
          return res.json('You cant do this, because it will exceed your slots');
        }
        const newInventoryData = {
          itens: {itens: newItens},
        };
        const newInventory = await inventory.update(newInventoryData);
        return res.json(newInventory);
      }
      if(del){
        if(typeof del !== 'string'){
          return res.json('Invalid value');
        }
        const itenToDel = inventoryItens.find(item => {
          return item.toLowerCase() === del.toLowerCase();
        })

        if(itenToDel === undefined){
          return res.json('This item are not on your inventory');
        }

        const indexDel = inventoryItens.indexOf(itenToDel);
        const newItens = [ ...inventoryItens];
        newItens.splice(indexDel, 1);

        const newInventoryData = {
          itens: {itens: newItens},
        }

        const newInventory = await inventory.update(newInventoryData);
        return res.json(newInventory);
      }
      if(rewrite){
        const newItens = req.body.rewrite;
        if(newItens.length > limit){
          return res.json('You cant do this, because it will exceed your slots');
        }

        const type = newItens.find(item => typeof item !== 'string')
        if(type !== undefined){
          return res.json('Only strings are allowed on an inventory');
        }

        const newInventoryData = {
          itens: {itens: newItens},
        }
        const newInventory = await inventory.update(newInventoryData);
        return res.json(newInventory);
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
