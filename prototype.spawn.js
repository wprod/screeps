module.exports = function() {
    StructureSpawn.prototype.createCustomCreep =
        function(energy, roleName) {
            const numOfParts = Math.floor(energy / 200);
            let body = [];
            
            for (let i = 0; i < numOfParts; i++) {
                body.push(WORK);
            }
            
            for (let i = 0; i < numOfParts; i++) {
                body.push(CARRY);
            }
            
            for (let i = 0; i < numOfParts; i++) {
                body.push(MOVE);
            }
            
            console.log("Body parts : " + body);
            console.log("Energy : " + energy);
            
            return this.createCreep(body, undefined, {role: roleName, working: false})
        };
};