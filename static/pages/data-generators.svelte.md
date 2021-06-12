---
slug: data-generators title: The Story of DataGenerators author: TheOnlyTails description: How I made Minecraft data
generation Kotlin-oriented with DSLs. date: 2021/06/12 published: true
---

# The Story of DataGenerators

The story starts with me sitting at my desk, working at my mod, [RubyMod](https://github.com/theonlytails/rubymod), and
being very bored. I was working on implementing a data generation system for my mod's loot tables, and I thought - "
There must be a better way to do this."

I remembered a talk I saw by [Hadi Hariri](https://hadihariri.com/) about Kotlin DSLs, and how you can create "
mini-languages" in Kotlin using 3 features:

- Extension Functions
- Lambdas with receivers
- Moving lambdas out of parentheses

TL; DR of those 3 features combined:
Extension functions are declared outside a class yet act as its member. Lambdas with receivers use their receiver as the
type of `this`, scoped inside the lambda. If the last parameter of a function is a lambda, it can be moved outside the
parenthesis.

## What does DataGenerators *actually* do?

DataGenerators isn't a project on its own, but a collection of Kotlin DSLs (which can all be installed separately) made
to create idiomatic Kotlin code for [MinecraftForge](https://github.com/MinecraftForge/MinecraftForge) data generation.

As for the time of writing (will be updated in the future), DataGenerators has 2 DSLs: LootTables and BlockModels.

---

## LootTables

[LootTables](https://github.com/theonlytails/loottables) was the first DSL I created, and it (as the name suggests)
creates loot tables.