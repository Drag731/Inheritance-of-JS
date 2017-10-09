// function instead of method Object.assign
function extend() {
	for(var i = 0; i < arguments.length; i += 1) {
		for(var key in arguments[i]) {
            if(arguments[i].hasOwnProperty(key)) {
                this[key] = arguments[i][key];
            }	
		}
	}
}
// Common method constructor
var Methods = function() {};

Methods.prototype.getHitpoints = function() {
    if(this.currentHitpoints != undefined) {
    	return this.currentHitpoints;
    } else {
		this.currentHitpoints = this.hitpoints;
        return this.currentHitpoints;
    }
};
Methods.prototype.setHitpoints = function(establishedHitpoint) {
    if(establishedHitpoint < 0) {
        console.log('Enter a number bigger than 0');
        return;
    }
	this.currentHitpoints = establishedHitpoint;
    this.hitpoints = this.currentHitpoints;
    if(this.totalHitpoints == undefined || this.totalHitpoints < this.hitpoints) {
        this.totalHitpoints = this.hitpoints
    }
};
Methods.prototype.getTotalHitpoints = function() {
    if(this.totalHitpoints != undefined) {
        return this.totalHitpoints;
    } else {
        this.totalHitpoints = this.hitpoints;
        return this.totalHitpoints;
    }
};
Methods.prototype.setTotalHitpoints = function(establishedTotalHitpoint) {
    if(establishedTotalHitpoint < 0) {
        console.log('Enter a number bigger than 0');
        return;
    }
    this.totalHitpoints = establishedTotalHitpoint;    
    this.hitpoints = this.currentHitpoints;
    if(this.currentHitpoints == undefined) {
        this.currentHitpoints = this.hitpoints;
    } else if (this.currentHitpoints > this.totalHitpoints) {
        this.currentHitpoints = this.totalHitpoints;
    }
};
Methods.prototype.getAttack = function() {
    if(this.currentAttack != undefined) {
    	return this.currentAttack;
    } else {
    	return this.currentAttack = this.attack;
    }
};
Methods.prototype.setAttack = function(establishedAttack) {
        if(establishedAttack < 0) {
        console.log('Enter a number bigger than 0');
        return;
    }
    this.currentAttack = establishedAttack;
    this.attack = this.currentAttack;
};
Methods.prototype.fight = function(apponent) {
    // Check block, if the value is not defined
    if(this.currentAttack == undefined) {
    	this.currentAttack = this.attack;
    }
    if(apponent.currentHitpoints == undefined) {
    	apponent.currentHitpoints = apponent.hitpoints;
    }
    if(this.currentHitpoints == undefined) {
        this.currentHitpoints = this.hitpoints;
    }
    if(this.totalHitpoints == undefined) {
        this.totalHitpoints = this.hitpoints;
    }
    if(apponent.totalHitpoints == undefined) {
        apponent.totalHitpoints = apponent.hitpoints;
    }

    if(apponent.currentHitpoints == 0) {
        console.log('Your enemy is dead');
        return;
    }
    if(this.currentHitpoints == 0) {
        console.log('You are dead');
        return;
    }
    // champion put the block
    if(this instanceof Monster && apponent.block == true) {
    	apponent.currentHitpoints += this.currentAttack;
    	apponent.block = false;
    }
    // monster deals double damage
    if(this instanceof Monster && this.furiousHit == 2) {
    	this.currentAttack *= 2;
    	this.furiousHit -= 1;
    } else if(this instanceof Monster && this.furiousHit == 1) {
    	this.furiousHit -= 1;
    } else if(this instanceof Monster && this.furiousHit == 0) {
    	this.currentAttack /= 2;
    	this.furiousHit -= 1;
    }

    if(apponent.currentHitpoints < this.currentAttack) {
        apponent.currentHitpoints = this.currentAttack;
    }
    // the main line of the whole game
    apponent.currentHitpoints -= this.currentAttack;
    // if the champion is dead, and the monster has a double damage
    if((apponent.currentHitpoints - this.currentAttack) <= 0 && this.furiousHit > 0) {
        this.currentAttack /= 2;
        this.furiousHit = -1;
    }
    // champion training
    if(this instanceof Champion && apponent.currentHitpoints == 0) {
    	this.currentAttack +=1;
    }
    // Restoring hitpoints of a monster
    if(this instanceof Monster && apponent.currentHitpoints == 0) {
        this.totalHitpoints += Math.floor(apponent.totalHitpoints * 0.1);
        this.hitpoints = this.totalHitpoints
        this.currentHitpoints += Math.floor(apponent.totalHitpoints * 0.25);
        if(this.currentHitpoints >= this.hitpoints) {
            this.currentHitpoints = this.hitpoints;
        }
    }
};
Methods.prototype.isAlive = function() {
    if(this.currentHitpoints > 0) {
    	return true;
    } return false;
};


var Champion = function(dataObject) {
	extend.call(this, dataObject);
    Methods.call(this);
    this.rest = function() {
        if(this.totalHitpoints == undefined) {
            this.totalHitpoints = this.hitpoints;
        }
        if(this.currentHitpoints >= this.totalHitpoints) {
            this.currentHitpoints = this.totalHitpoints;
            console.log('You are completely healthy');
            return;
        }
        this.currentHitpoints += 5;
    };
    this.defence = function() {
        this.block = true;
    };
};

Champion.prototype = Object.create(Methods.prototype);
Champion.prototype.constructor = Champion;

var Monster = function(dataObject) {
	extend.call(this, dataObject);
    this.enrage = function() {
        this.furiousHit = 2;
    }
};

Monster.prototype = Object.create(Methods.prototype);
Monster.prototype.constructor = Monster;

var heracles = new Champion({name: 'Heracles', attack: 10, hitpoints: 50});

var boar = new Monster({name: 'Erymanthian Boar', attack: 5, hitpoints: 100});

// module.exports = {
//   Champion: Champion,
//   Monster: Monster,
//   extend: extend
// }
