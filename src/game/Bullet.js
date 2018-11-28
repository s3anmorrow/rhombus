var Bullet = function() {
	// custom events

	// bullet state constants
	var KILLED = BulletState.KILLED;
	var MOVING = BulletState.MOVING;

	// access to globals
    var stage = Globals.stage;
    var assetManager = Globals.assetManager;
	var objectPool = Globals.objectPool;
	var checkRadiusCollision = Globals.checkRadiusCollision;

	// private property variables
	var owner = null;

	// private variables
	// state of bullet
	var type = "";
	var state = 0;
	var damage = 0;
	var invincible = false;
	var speed = 0;
	var bounces = 0;
	var radius = 0;
	var canvas = Globals.stage.canvas;
	var stageLeft = -10;
	var stageRight = canvas.width + 10;
	var stageTop = -10;
	var stageBottom = canvas.height + 10;
	var xDisplace, yDisplace;
	//var distance;
	// access to this object from callbacks [out of scope issues]
	var _this = this;
	// access to pool objects
	var shapePool = objectPool.shapePool;
	var bigbossPool = objectPool.bigbossPool;
	var turretPool = objectPool.turretPool;
	var player = objectPool.playerPool[0];

	// grab clip for bullet
	var sprite = assetManager.getSprite("assets","bullet");


	// ------------------------------------------------------ get/set methods


	// ------------------------------------------------------ private methods
	

	// ------------------------------------------------------ public methods
	this.startMe = function(myType, myOwner, spriteFrame, mySpeed, myDamage, myInvincible, x, y, r, myRadius) {
		// initialization
		type = myType;
		owner = myOwner;
		invincible = myInvincible;
		speed = mySpeed;
		bounces = 0;
		radius = myRadius;

		state = BulletState.MOVING;
		//distance = 0;
		damage = myDamage;
		xDisplace = Globals.cosTable[r] * speed;
		yDisplace = Globals.sinTable[r] * speed;
		sprite.gotoAndStop(spriteFrame);
		if (type === "laser") {
			sprite.play();
			sprite.addEventListener("animationend",function(e){
				e.remove();
				_this.stopMe();
			});
		} else if ((type === "bounce") || (type === "superBounce")) {
			sprite.play();
		}
		sprite.x = x;
		sprite.y = y;
		sprite.rotation = r;

		// place bullet below the owner on displaylist
		var index = stage.getChildIndex(owner.sprite);
		stage.addChildAt(sprite, index);
	};

	this.stopMe = function() {
		// remove bullet
		sprite.stop();
		sprite.y = -2000;
		stage.removeChild(sprite);
		// return this object to the object pool
		objectPool.dispose(_this);
	};

	this.killMe = function(explode) {
		// initialization
		state = BulletState.KILLED;
		// reset variables
		xDisplace = 0;
		yDisplace = 0;
		// memory management
		owner = null;

		if (explode) {
			// explode bullet
			sprite.gotoAndPlay("bulletExplosion");
			sprite.addEventListener("animationend",function(e){
				e.remove();
				_this.stopMe();
			});
		} else {
			this.stopMe();
		}
	};

	this.updateMe = function(){
		if (state === BulletState.MOVING) {
			// STEP I : Bullet Movement
			// different bullet type behaviours
			if (type === "laser") {
				sprite.x = owner.sprite.x;
			} else {
				// move bullet x and y position
				sprite.x += xDisplace;
				sprite.y += yDisplace;			
			}

			// STEP II : Bullet removal if off stage
			// check if bullet off the screen
			if ((type === "bounce") || (type === "superBounce")) {
				// make bullets bounce off edges of stage
				if ((sprite.y > stageBottom) || (sprite.y < stageTop)) {
					yDisplace = yDisplace * -1;
					bounces++;
				} else if ((sprite.x < stageLeft) || (sprite.x > stageRight)) {
					xDisplace = xDisplace * -1;
					bounces++;
				}
				sprite.x += xDisplace;
				sprite.y += yDisplace;
				if (bounces >= 3) this.stopMe();
			} else {
				if ((sprite.y > stageBottom) || ((sprite.x < stageLeft) || (sprite.x > stageRight) || (sprite.y < stageTop))) {
					this.killMe();
					return;
				}
			}

			// STEP III : collision detection
			// Player's bullet
			if (owner.name === "Player") {
				// has the bullet collided with a shape?
				var destroyed = false;
				var poolLength = shapePool.length;
				for (var n=0; n<poolLength; n++) {	
					var shape = shapePool[n];

					if (type === "laser") {
						// using rectangle collision for laser
						if ((shape.used) && (shape.getState() !== ShapeState.KILLED) && (ndgmr.checkRectCollision(sprite, shape.sprite))) {
							destroyed = shape.killMe(damage,true);
							// only play bullet explosion if target NOT destroyed
							if (!invincible) this.killMe(!destroyed);
						}
					} else {
						// using radius testing for collision for everything else
						if ((shape.used) && (shape.getState() !== ShapeState.KILLED) && (checkRadiusCollision(sprite, shape.sprite,(radius + shape.radius)))) {
							destroyed = shape.killMe(damage,true);
							// only play bullet explosion if target NOT destroyed
							if (!invincible) this.killMe(!destroyed);
						}
					}
				}

				// has the bullet collided with a bigboss turret?
				poolLength = turretPool.length;

				for (n=0; n<poolLength; n++) {	
					var turret = turretPool[n];

					if (type === "laser") {
						if ((turret.used) && (turret.getState() !== ShapeState.KILLED) && (ndgmr.checkRectCollision(sprite, turret.sprite))) {
							destroyed = turret.killMe(damage);
							if (!invincible) this.killMe(!destroyed);
						}
					} else {
						if ((turret.used) && (turret.getState() !== ShapeState.KILLED) && (checkRadiusCollision(sprite, turret.sprite, (radius + turret.radius), (turret.sprite.x * -1), (turret.sprite.y * -1)))) {
							destroyed = turret.killMe(damage);
							if (!invincible) this.killMe(!destroyed);
						}
					}
				}

			// Shape or Turret's bullet
			} else if ((owner.name === "Shape") || (owner.name === "Bigboss"))  {
				// player is radius 45/2 = 22
				if ((player.getState() !== PlayerState.KILLED) && (checkRadiusCollision(sprite, player.sprite,(radius + 22)))) {
					player.hitMe(damage);
					this.killMe(true);
				}				
			}
		}
	};
};

var BulletState = {
	"KILLED":-1,
	"MOVING":1
};
