require('prototype.spawn')();
const constants = require('constants');
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleRepairer = require('role.repairer');

module.exports.loop = function() {

    //Cleaning memery
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }

    // Assign work
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];

        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }
    
    const towers = Game.rooms.W24S23.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });
    for (let tower of towers) {
        const target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) {
            tower.attack(target);
        }
    }

    //Spawn if not in enough creep
    const numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    const numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    const numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    const numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');

    let name = undefined;
    const energy = Game.spawns.Spawn1.room.energyCapacityAvailable;

    if (constants.minHarvester > numberOfHarvesters) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'harvester');
        
        if (name == -10 && numberOfHarvesters == 0) {
            name = Game.spawns.Spawn1.createCustomCreep(
                    Game.spawns.Spawn1.room.energyAvalible, 'harvester'
            );
        }
    }
    else if (constants.minUpgrader > numberOfUpgraders)  {
        Game.spawns.Spawn1.createCustomCreep(energy, 'upgrader');
    }
    else if (constants.minRepairer > numberOfRepairers)  {
        Game.spawns.Spawn1.createCustomCreep(energy, 'repairer');
    }
    else if (constants.minBuilder > numberOfBuilders)  {
        Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
    } else {
        Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
    }
};
