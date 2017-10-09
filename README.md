Inheritance in JS

Game "Champion and Monster".

Methods of classes:

getHitpoints - returns current hitpoints.

setHitpoints - sets current hitpoints.

getTotalHitpoints - returns total hitpoints.

setTotalHitpoints - sets total possible hitpoints.

getAttack - returns amount of possible damage.

setAttack - sets amount of possible damage.

fight - accepts either other champion or monster and reduces its hitpoints by
amount of “attack”. Make sure the target is appropriate.

isAlive - returns boolean to indicate that person “hitpoints” are more than 0.

Champion class methods:

rest - which restores 5 “hitpoints”

defence - will totally block next incoming damage

Monster class methods:

enrage - next two attacks deal double damage

Invocation example:

var heracles = new Champion({name: ‘Heracles’, attack: 10, hitpoints: 50});

var boar = new Monster({name: ‘Erymanthian Boar’, attack: 5, hitpoints: 100});

heracles.fight(boar);

boar.getHitpoints(); // -> 90

boar.enrage();

heracles.fight(boar);

boar.getHitpoints(); // -> 80

boar.fight(heracles);

heracles.getHitpoints(); // -> 40
…

heracles.fight(boar);

boar.isAlive(); // -> false

heracles.getAttack(); // -> 11

heracles.getHitpoints(); // -> 10

heracles.rest();

heracles.getHitpoints(); // -> 15