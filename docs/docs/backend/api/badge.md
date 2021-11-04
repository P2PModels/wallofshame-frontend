# Badge

## Queries

**allBadges() => <Badge\> [ ]**

Get all badges from db.

**badgeById( id: <String\> ) => <Badge\>**

Get badge from db by id.

## Mutations

**addBadge( badge: <BadgeCreateInput\> ) => <Badge\>**

Create a badge record in the db.

**issueBadge( badge: <BadgeCreateInput\> ) => <Badge>**

Create a badge record in the blockchain.
