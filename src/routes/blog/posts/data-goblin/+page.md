---
slug: data-goblin
title: The Story of DataGoblin
description: How I made Minecraft data generation Kotlin-oriented with DSLs.
date: 2021/08/18
tags: [kotlin, minecraft, forge]
published: true
---

The story starts with me sitting at my desk, working on my mod, [RubyMod](https://github.com/theonlytails/rubymod), and
being very bored.
I was working on implementing JSON asset generation (AKA datagen) for my mod's loot tables, and I thought - "There must
be a better way to do this."

I remembered a talk by [Hadi Hariri](https://hadihariri.com/) I watched about Kotlin DSLs, and how you can create
"mini-languages" in Kotlin using 3 language features:

- Extension Functions
- Lambdas with Receivers
- Trailing Lambdas

TL;DR of those 3 features, respectively:

- Extension functions allow you to add a function to class as if it was a regular member.
- Lambdas with receivers use their receiver type as the type of `this`, scoped inside the lambda.
- If the last parameter of a function is a lambda, it can be moved outside the parenthesis, for a conciser syntax.

## What does DataGoblin _actually_ do?

DataGoblin isn't a project on its own, but a collection of Kotlin DSLs (all of which can be installed separately)
made to create idiomatic Kotlin code for [MinecraftForge](https://github.com/MinecraftForge/MinecraftForge) datagen.

!> As for the time of writing (will be updated in the future), DataGoblin has 2 DSLs: LootGoblin and ModelGoblin.

## LootGoblin

[LootGoblin](https://github.com/theonlytails/LootGoblin) was the first DSL I created, and it (as the name suggests)
creates loot tables. Loot tables were the perfect candidate to make a Kotlin DSL for - the internal system used to
create them normally is already very similar to their JSON counterparts, and a Kotlin DSL would help bridge that gap
even further.

I got to work, and finished with this:

```kt
lootTable(LootParameterSets.BLOCK) {
    // optional parameter - defaults to 1
    pool(rolls = 2) {
        itemEntry(Items.STICK) {
            function { explosionDecay() }
        }

        function {
            // this is a shortened form of setCount(constantCount(2))
            setConstantCount(2)
        }
    }
}
```

A beautiful version of loot tables, all type-safe, made in pure Kotlin code.

## ModelGoblin

[ModelGoblin](https://github.com/theonlytails/ModelGoblin) came around about the same way as LootGoblin - only this time
I was. I've _"borrowed"_ my old code, and was ready to create another rendition of Kotlin DSLs for Minecraft data
generation.

After about a week of work, I've learned some lessons:

- Models are _way more_ complex than loot tables.
- Taking my old code was a huge time-saver.
- I should make more of these.

## So what's next?

I'll probably get around to making DSLs for all kinds of data gen:

- Tags
- Recipes
- Item Models
- World Generation (Dimensions, Dimension types, Biomes, etc.)
- Entity Models, using @SizableShrimp's [EntityModelJson](https://github.com/sizableshrimp/entitymodeljson) library
- etc...

But for now, this is not too bad.
