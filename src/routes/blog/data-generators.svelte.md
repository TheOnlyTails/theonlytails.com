---
slug: data-generators

title: The Story of DataGenerators

author: TheOnlyTails

description: How I made Minecraft data generation Kotlin-oriented with DSLs.

date: 2021/07/13

published: false

---

<svelte:head>
<title>{title}</title>
</svelte:head>

# {title}

The story starts with me sitting at my desk, working at my mod, [RubyMod](https://github.com/theonlytails/rubymod), and
being very bored.  
I was working on implementing a data generation system for my mod's loot tables, and I thought - "There must be a better
way to do this."

I remembered a talk by [Hadi Hariri](https://hadihariri.com/) I watched about Kotlin DSLs, and how you can create
"mini-languages" in Kotlin using 3 features:

- Extension Functions
- Lambdas with receivers
- Moving lambdas out of parentheses

TL;DR of those 3 features combined:

- Extension functions are declared outside a class yet act as its member.
- Lambdas with receivers use their receiver as the type of `this`, scoped inside the lambda.
- If the last parameter of a function is a lambda, it can be moved outside the parenthesis.

## What does DataGenerators _actually_ do?

DataGenerators isn't a project on its own, but a collection of Kotlin DSLs (which can all be installed separately) made
to create idiomatic Kotlin code for [MinecraftForge](https://github.com/MinecraftForge/MinecraftForge) data generation.

As for the time of writing (will be updated in the future), DataGenerators has 2 DSLs: LootTables and BlockModels.

## LootTables

[LootTables](https://github.com/theonlytails/loottables) was the first DSL I created, and it (as the name suggests)
creates loot tables. Loot tables were the perfect candidate to make a Kotlin DSL for - the internal system used to
create them normally is already very similar to their JSON counterparts, and a Kotlin DSL would help bridge that gap
even further.

I got to work, and finished with this:

```kt
lootTable(LootParameterSets.BLOCK) {
    pool(rolls = 2) { // optional parameter - default of 1
        itemEntry(Items.STICK) {
            function { explosionDecay() }
        }

        function { setConstantCount(2) /* this is a shortened form of setCount(constantCount(2)) */ }
    }
}
```

A beautiful version of loot tables, all type-safe, made in pure Kotlin code.

## BlockModels

[BlockModels](https://github.com/theonlytails/blockmodels) came around about the same way as LootTables - only this time
I was experienced. I've _"borrowed"_ my old code, and was ready to create another rendition of Kotlin DSLs for Minecraft
data generation.

After about a week of work, I've learned some lessons:

- Models are _way more_ complex than loot tables.
- Taking my old code was a huge time-saver.
- I should make more of these.

---

So what's next?

I'll probably get around to making DSLs for all kinds of data gen:

- Tags
- Recipes
- Item Models
- etc...

But for now, this is not too bad.