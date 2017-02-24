var MoveFunctions = {

    none:function(sprite){        
        return true;
    },

    down:function(sprite){
        if (!sprite.moveData.ready) {
            if (sprite.moveData.speed === undefined) sprite.moveData.speed = 2;
            sprite.moveData.ready = true;
        }
        sprite.y+=sprite.moveData.speed;
        if (sprite.y > Globals.stage.canvas.height + sprite.getBounds().height) return false;
        return true;
    },

    downAndStop:function(sprite){
        if (!sprite.moveData.ready) {
            if (sprite.moveData.speed === undefined) sprite.moveData.speed = 2;
            if (sprite.moveData.rotate === undefined) sprite.moveData.rotate = false;
            sprite.moveData.ready = true;
        }
        if (sprite.moveData.rotate) sprite.rotation++;
        if (sprite.y < sprite.moveData.stopAt) sprite.y+=sprite.moveData.speed;
        return true;
    },

    rightAndStop:function(sprite){
        if (!sprite.moveData.ready) {
            if (sprite.moveData.speed === undefined) sprite.moveData.speed = 2;
            if (sprite.moveData.rotate === undefined) sprite.moveData.rotate = false;
            sprite.moveData.ready = true;
        }
        if (sprite.moveData.rotate) sprite.rotation++;
        if (sprite.x < sprite.moveData.stopAt) sprite.x+=sprite.moveData.speed;
        return true;
    },

    up:function(sprite){
        if (!sprite.moveData.ready) {
            if (sprite.moveData.speed === undefined) sprite.moveData.speed = 2;
            sprite.moveData.ready = true;
        }
        sprite.y-=sprite.moveData.speed;
        if (sprite.y <= -sprite.getBounds().height) return false;
        return true;
    },

    left:function(sprite) {
        if (!sprite.moveData.ready) {
            if (sprite.moveData.speed === undefined) sprite.moveData.speed = 2;
            sprite.moveData.ready = true;
        }
        sprite.x-=sprite.moveData.speed;
        if (sprite.x <= -sprite.getBounds().width) return false;
        return true;
    },

    right:function(sprite) {
        if (!sprite.moveData.ready) {
            if (sprite.moveData.speed === undefined) sprite.moveData.speed = 2;
            sprite.moveData.ready = true;
        }
        sprite.x+=sprite.moveData.speed;
        if (sprite.x >= Globals.stage.canvas.width + sprite.getBounds().width) return false;
        return true;
    },    

    diagonal:function(sprite) {
        if (!sprite.moveData.ready) {
            if (sprite.moveData.speed === undefined) sprite.moveData.speed = 2;
            // adjust rotation of sprite
            sprite.rotation = sprite.moveData.angle;
            // convert current rotation of object to radians
            var radians = Globals.radianMe(sprite.moveData.angle);
            // calculating X and Y displacement
            sprite.moveData.xDisplace = Math.cos(radians) * sprite.moveData.speed;
            sprite.moveData.yDisplace = Math.sin(radians) * sprite.moveData.speed;
            sprite.moveData.ready = true;
        }
        // move sprite on diagonal
        sprite.x = sprite.x + sprite.moveData.xDisplace;
        sprite.y = sprite.y + sprite.moveData.yDisplace;

        // check if object is off the stage
        if ((sprite.x < -sprite.getBounds().width) || (sprite.x > (Globals.stage.canvas.width + sprite.getBounds().width)) || (sprite.y < -sprite.getBounds().height) || (sprite.y > (Globals.stage.canvas.height + sprite.getBounds().height))) return false;
        return true;
    },    

    switch:function(sprite){
        if (!sprite.moveData.ready) {
            if (sprite.moveData.speed === undefined) sprite.moveData.speed = 2;
            sprite.moveData.stage = 0;
            sprite.moveData.ready = true;
        }
        if (sprite.moveData.dir == "down") {
            if (sprite.moveData.stage === 0) {
                sprite.y+=sprite.moveData.speed;
                if (sprite.y >= sprite.moveData.y) sprite.moveData.stage = 1;
            } else {
                sprite.y-=sprite.moveData.speed;
                if (sprite.y <= -sprite.getBounds().height) return false;
            }
            return true;
        } else {
            if (sprite.moveData.stage === 0) {
                sprite.y-=sprite.moveData.speed;
                if (sprite.y <= sprite.moveData.y) sprite.moveData.stage = 1;
            } else {
                sprite.y+=sprite.moveData.speed;
                if (sprite.y <= -sprite.getBounds().height) return false;
            }
            return true;
        }
    },

    looping:function(sprite){
        // initializing leftLooping behaviour
        if (!sprite.moveData.ready) {
            sprite.moveData.stage = 0;
            if (sprite.moveData.speed === undefined) sprite.moveData.speed = 2;
            sprite.moveData.ready = true;
        }

        var radians = 0;
        if (sprite.moveData.dir === "left") {
            if (sprite.moveData.stage === 0) {
                // ENTERING STAGE
                // move shape from left across stage
                sprite.x-=sprite.moveData.speed;
                // ready to move onto looping stage?
                if (sprite.x <= (sprite.moveData.cx + sprite.moveData.r)) sprite.moveData.stage = 1;
            } else if (sprite.moveData.stage == 1) {
                // LOOPING STAGE
                // looping in circle - increment rotation of shape
                sprite.rotation+=sprite.moveData.speed;
                // get current angle of rotation and convert to radians
                radians = Globals.radianMe(sprite.rotation);
                // calculate X and Y location around circle
                sprite.x = sprite.moveData.cx + sprite.moveData.r * Math.cos(radians);
                sprite.y = sprite.moveData.cy + sprite.moveData.r * Math.sin(radians);
                // ready to move onto exit stage?
                if (sprite.rotation >= (360 * sprite.moveData.loops)) sprite.moveData.stage = 2;
            } else if (sprite.moveData.stage == 2) {
                // EXIT STAGE
                sprite.x-=sprite.moveData.speed;
                // off the left of the stage?
                if (sprite.x < -sprite.getBounds().width) return false;
            }
            return true;
        } else if (sprite.moveData.dir == "right") {
            if (sprite.moveData.stage === 0) {
                // ENTERING STAGE
                // move shape from left across stage
                sprite.x+=sprite.moveData.speed;
                // ready to move onto looping stage?
                if (sprite.x >= (sprite.moveData.cx - sprite.moveData.r)) sprite.moveData.stage = 1;
            } else if (sprite.moveData.stage == 1) {
                // LOOPING STAGE
                // looping in circle - increment rotation of shape
                sprite.rotation+=sprite.moveData.speed;
                // get current angle of rotation and convert to radians
                radians = Globals.radianMe(sprite.rotation + 180);
                // calculate X and Y location around circle
                sprite.x = sprite.moveData.cx + sprite.moveData.r * Math.cos(radians);
                sprite.y = sprite.moveData.cy + sprite.moveData.r * Math.sin(radians);
                // ready to move onto exit stage?
                if (sprite.rotation >= (360 * sprite.moveData.loops)) sprite.moveData.stage = 2;
            } else if (sprite.moveData.stage == 2) {
                // EXIT STAGE
                sprite.x+=sprite.moveData.speed;
                // off the left of the stage?
                if (sprite.x > Globals.stage.canvas.width + sprite.getBounds().width) return false;
            }
            return true;
        } else if (sprite.moveData.dir === "down") {
            if (sprite.moveData.stage === 0) {
                // ENTERING STAGE
                // move shape from left across stage
                sprite.y+=sprite.moveData.speed;
                // ready to move onto looping stage?
                if (sprite.y >= (sprite.moveData.cy - sprite.moveData.r)) sprite.moveData.stage = 1;
            } else if (sprite.moveData.stage == 1) {
                // LOOPING STAGE
                // looping in circle - increment rotation of shape
                sprite.rotation+=sprite.moveData.speed;
                // get current angle of rotation and convert to radians
                radians = Globals.radianMe(sprite.rotation + 270);
                // calculate X and Y location around circle
                sprite.x = sprite.moveData.cx + sprite.moveData.r * Math.cos(radians);
                sprite.y = sprite.moveData.cy + sprite.moveData.r * Math.sin(radians);
                // ready to move onto exit stage?
                if (sprite.rotation >= (360 * sprite.moveData.loops)) sprite.moveData.stage = 2;
            } else if (sprite.moveData.stage == 2) {
                // EXIT STAGE
                sprite.y+=sprite.moveData.speed;
                // off the left of the stage?
                if (sprite.y > Globals.stage.canvas.height + sprite.getBounds().height) return false;
            }
            return true;
        }
    }




};