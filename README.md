# Dragon Quest

Dragon-quest is a text-based RPG game. The adventurer is a fork of Realms's adventurer contract.

Combat is cyclical, adventurer and dragon acts in turn in a regular cycle of rounds.

## The statistics that determine success in combat
### Attack Bonus
Attack bonus is an attack roll bonus derived from character level and abilities (e.g. Dexterity, Strength) modifier and plus a random number from 1 to 20.

### Armor Class
Armor Class is the attack roll result (Attack Bonus) that an opponent needs to achieve to hit you. It equals Dexterity modifier plus a fixed number 10.

### Damage
When a party attack succeeds, deal damage. Damage reduces a target’s current hit points. t equals Strength modifier plus a random number from 1 to 6.

### Hit Points
When one party's hit point total reaches 0, he is dead.

In the current version, there is only a red Dragon can challenge. The dragon's level, abilities, HP are far more than the initialized adventurer with zero experience, unarmed and unequipmented so there is no chance to defeat the dragon even involved in randomness.

## Planning
### More Scenes
The young adventurers need some worthy opponents to improve their fighting skills. Before they challenge the dangerous dragon maybe they should defeat robbers and goblins in the wild to gain experience, reputation and bounty.

### Experience and Level
Adventurers earn experience points by taking risk, and characters may pay XP to advance their Level. As the most direct proof of the improvement of fighting skills, adventurers will get ability points as level bonus.

### Abilities
Players can freely assign ability points to Strength, Dexterity, Constitution, Intelligence, Wisdom and Charisma. Each ability partially describes your adventurer and affects some of his or her actions.

That will be more complex in the future combat scenario, where Strength and Dexterity will not be the only abilities calculated in combat.

### Spell
A spell is a one-time magical effect. Spell can enrich the combat process, smart adventurers are no longer obsessed with strength and constitution, cast a spell you have learned in time may change the battel result.

Spell design can be a little tricky as the logic and computation of combat will grow exponentially.

### Weapons and Armors
I hope adventurers can get loots after defeating enemies. Equipment may be dropped or crafted or bought in the market.

Armed and armored adventurers will greatly increase the winning rate in battle.

## Why StarkNet
### Scalability
StarkNet supports scale, while preserving the security of L1 Ethereum. It allows you to do everything you can on EVM and much more, as computations are significantly cheaper and game is the most computation in nature. The game on-chain will be rollups.

### Composability
StarkNet offer a more powerful environment with Cairo. Anyone can deploy contracts permissionless and contracts can be built on top of another.

### Abstract Account
StarkNet supports abstract account natively. With multi-call function, players can make a sequence of operation as one atomic transaction, which will save most of the signature operations on-chain. Same as session key that provide a seamless operations like web2 application. And in programmable abstract accounts, teamwork will become possible. Imagine you and your friends adventuring together like in World of Warcraft.

## Reference of Play to Die
Play to Die creates a incentive layer for devs to build contracts or experiences that integrate with the Realms's adventurer. It's like a app-store for on-chain games. Players grant game developer access to their escrowed tokens then play and die.

Build you game on top of Realms permissionless, which is the composability brought to us by StarkNet. Players can enjoy any theme and any form of games. The player only needs one identity, that's what the Web2 world games faced problem but we make it in Web3.
