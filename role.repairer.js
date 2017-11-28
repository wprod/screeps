const roleBuilder = require('role.builder');

module.exports = {
    run: function(creep) {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
            const structures = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => {
                    return s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL;
                }
            });
            
            if (structures != undefined) {
                if (creep.repair(structures) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structures);
                }
            }
            else {
                roleBuilder.run(creep);
            }
        }
        else {
            const source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
}