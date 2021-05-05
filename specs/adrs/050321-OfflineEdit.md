# Offline User Edit Conflict Resolution

Deciders: Carlos Guerrero, Liu He, Trisa Leung, Samuel Reda, Thomas Fischer
Last Updated: May 3, 2021 1:21 AM
State: Resolved

# May 2, 2021

## Context and Problem:

This decision pertained whether we should let the user decide which of their conflicting edits to keep and let the burden fall on the user or leave that decision to the developers and let the burden on ourselves.

## Considered Options:

- user chosen implementation
- algorithmically chosen implementation

## Decision Outcome:

Everyone present voted and the voted decided for the algorithm chosen implementation.

### Positive Consequences:

The positive consequence is that the user will now not have the burden of having to choose which of their conflicting offline edits to keep.

### Negative Consequences:

The negative consequence is that now the developers will need to develop an algorithm to deal with the conflicts.

## Pros and Cons of the Options:

### Option # Pros:

- better user experience
- conflict resolution will be consistent

### Option # Cons:

- more time needed to be spent on implementation