---
title: UI/x Design Decision Records and Specification
version: v0.4.18
summary: Conformance, Stylegide and Specification for UI/UX practices
license: Apache-2.0 / CC-2.5 SA
---

# disco3 - a web3 engineering and design system

> State is the root of all revenue.

## Motivation

> (D)UI/(D)UX/ - Design Decision Records

User interface development tools are very powerful. They can be used to
construct large and complex user interfaces, with only a relatively small amount
of code written by an application developer. And yet, despite the power of such
tools and the relatively small amount of code that is written, user interface
software often has the following characteristics:

- the code can be difficult to understand and review thoroughly:
- the code can be difficult to test in a systematic and thorough way;
- the code can contain bugs even after extensive testing and bug fixing;
- the code can be difficult to enhance without introducing unwanted
  side-effects;
- the quality of the code tends to deteriorate as enhancements are made to it.

Despite the obvious problems associated with user interface development,
**little effort has been made to improve the situation**. Any practitioner who
has worked on large user interface projects will be familiar with many of the
above characteristics, which are **symptomatic of the way in which the software
is constructed**.

### Bad UI/UX can cost big

UI issue causes Citibank to accidentally pay off its insolvent client's \$900M
loan.
<https://bloomberg.com/opinion/articles/2021-02-17/citi-can-t-have-its-900-million-back>
(accessed, 2021.12.20)

## Heuristics

[heuristic](<https://en.wikipedia.org/wiki/Heuristic_(computer_science)>)
/ˌhjʊ(ə)ˈrɪstɪk/

> A technique designed for solving a problem more quickly when classic methods
> are too slow, or for finding an approximate solution when classic methods fail
> to find any exact solution

- Priority is the best User Experience
- Complexity should be introduced when it’s inevitable
- Code should be easy to reason about
- Code should be easy to delete
- Avoid abstracting too early
- Avoid thinking too far in the future

## Structure

### Feature folders

**Don't** _just_ have a folder named `components` and throw everything in there.

**Do** have a folder named `features` where each sub-folder is a specific
feature containing all the files related to that feature.

Use feature folders to identify boundaries in your system.

## [The principle](https://kentcdodds.com/blog/colocation#the-principle)

**The concept of co-location can be boiled down to this fundamental principle:**

Place code as close to where it's relevant as possible

You might also say: "Things that change together should be located as close as
reasonable." ([Dan Abramov](https://twitter.com/dan_abramov)

## Testing

- **Integration**: Verify that several units work together in harmony.
- **Unit**: Verify that individual, isolated parts work as expected.
- **Static**: Catch typos and type errors as you write the code.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Antipatterns](#antipatterns)
  - [Strict email validation](#strict-email-validation)
  - [Late returns](#late-returns)
  - [Hacks comment](#hacks-comment)
  - [Repeating arguments in function name](#repeating-arguments-in-function-name)
  - [Repeating class name in method name](#repeating-class-name-in-method-name)
  - [Repeating function name in docstring](#repeating-function-name-in-docstring)
  - [Unreadable response construction](#unreadable-response-construction)
  - [Nondeterministic tests](#undeterministic-tests)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Antipatterns

Most of those are antipatterns in the Python programming language, but some of
them might be more generic.

## Strict email validation

It is almost impossible to strictly validate an email. Even if you were writing
or using a regex that follows
[RFC5322](http://tools.ietf.org/html/rfc5322#section-3.4), you would have false
positives when trying to validate actual emails that don't follow the RFC.

What's more, validating an email provides very weak guarantees. A stronger, more
meaningful validation would be to send an email and validate that the user
received it.

To sum up, don't waste your time trying to validate an email if you don't need
to (or just check that there's a `@` in it). If you need to, send an email with
a token and validate that the user received it.

## Late returns

Returning early reduces cognitive overhead, and improve readability by killing
indentation levels.

Bad:

```python
def toast(bread):
    if bread.kind != 'brioche':
        if not bread.is_stale:
            toaster.toast(bread)
```

Good:

```python
def toast(bread):
    if bread.kind == 'brioche' or bread.is_stale:
        return

    toaster.toast(bread)
```

## Hacks comment

Bad:

```python
# Gigantic hack (written by Louis de Funes) 04-01-2015
toaster.restart()
```

There's multiple things wrong with this comment:

- Even if it is actually a hack, no need to say it in a comment. It lowers the
  perceived quality of a codebase and impacts developer motivation.
- Putting the author and the date is totally useless when using source control
  (`git blame`).
- This does not explain why it's temporary.
- It's impossible to easily grep for temporary fixes.
- [Louis de Funès](https://en.wikipedia.org/wiki/Louis_de_Fun%C3%A8s) would
  never write a hack.

Good:

```python
# Need to restart toaster to prevent burning bread
# TODO: replace with proper fix
toaster.restart()
```

- This clearly explains the nature of the temporary fix.
- Using `TODO` is an ubiquitous pattern that allows easy grepping and plays nice
  with most text editors.
- The perceived quality of this temporary fix is much higher.

## Repeating arguments in function name

Bad:

```python
def get_by_color(color):
    return Toasters.filter_by(color=color)
```

Putting the argument name in both the function name and in arguments is, in most
cases and for most interpreted languages, redundant.

Good:

```python
def get(color=None):
    if color:
        return Toasters.filter_by(color=color)
```

## Repeating class name in method name

Bad:

```python
class Toasters(object):
    def get_toaster(self, toaster_id):
        pass
```

This is bad because it's unnecessarily redundant (`Toasters.get_toaster(1)`).
According to the single responsibility principle, a class should focus on one
area of responsibility. So the `Toasters` class should only focus on toasters
object.

Good:

```python
class Toasters(object):
    def get(self, toaster_id):
        pass
```

Which produces much more concise code:

```
toaster = Toasters.get(1)
```

## Repeating function name in docstring

Bad:

```python
def test_return_true_if_toast_is_valid():
    """Verify that we return true if toast is valid."""
    assert is_valid(Toast('brioche')) is true
```

Why is it bad?

- The docstring and function name are not DRY.
- There's no actual explanation of what valid means.

Good:

```python
def test_valid_toast():
    """Verify that 'brioche' are valid toasts."""
    assert is_valid(Toast('brioche')) is true
```

Or, another variation:

```python
def test_brioche_are_valid_toast():
    assert is_valid(Toast('brioche')) is true
```

## Unreadable response construction

TODO

Bad:

```python
def get_data():
    returned = {}
    if stuff:
        returned['toaster'] = 'toaster'
    if other_stuff:
        if the_other_stuff:
            returned['toast'] = 'brioche'
    else:
        returned['toast'] = 'bread'
    return returned
```

Good:

```python
def get_data():
    returned = {
        'toaster': '',
        'toast': '',
    }
```

## Nondeterministic tests

When testing function that don't behave deterministically, it can be tempting to
run them multiple time and average their results.

Bad:

```python
def function():
    if random.random() > .4:
        return True
    else:
        return False


def test_function():
    number_of_true = 0
    for _ in xrange(1000):
        returned = function()
        if returned:
            number_of_true += 1

    assert 30 < number_of_true < 50
```

There are multiple things that are wrong with this approach:

- This is a flaky test. Theoretically, this test could still fail.
- This example is simple enough, but `function` might be doing some
  computationally expensive task, which would make this test severely
  inefficient.
- The test is quite difficult to understand.

Good:

```python
@mock.patch('random.random')
def test_function(mock_random):
    mock_random.return_value = 0.7
    assert function() is True
```

This is a deterministic test that clearly tells what's going on.

### Conformance: Configurations for linting, etc

> Engineering and Design Practices

- [Conformance](#conformance)
  - [Prettier](#prettier)
    - [whitespace](#whitespace)
    - [arrow-parens](#arrow-parens)
    - [comma-dangle](#202-additional-trailing-comma--yup-eslint--comma-dangle)
    - [implicit-arrow-linebreak](#86-enforce-the-location-of-arrow-function-bodies-with-implicit-returns-eslint--implicit-arrow-linebreak)
- [Naming Convention](#naming-convention)
- [Naming Components](#naming-components)
- [Class vs `React.createClass` vs stateless](#class-vs--reactcreateclass--vs-stateless)
- [TypeScript](#typescript)
- [Names](#names)
- [Exports](#exports)
- [Components](#components)
- [Types](#types)
- [`null` and `undefined`](#-null--and--undefined-)
- [General Assumptions](#general-assumptions)
- [Flags](#flags)
- [Comments](#comments)
- [Strings](#strings)
- [When to use `any`](#when-to-use--any-)
- [Diagnostic Messages](#diagnostic-messages)
- [General Constructs](#general-constructs)
- [Style](#style)
- [Reference Specification](#reference-specification)
  - [System UI](#system-ui)
    - [Scale Objects](#scale-objects)
    - [Scale Aliases](#scale-aliases)
    - [Excluded Values](#excluded-values)
  - [Keys](#keys)
    - [Space](#space)
  - [Breakpoints](#breakpoints)
    - [Media Queries](#media-queries)
  - [Key Reference](#key-reference)
  - [Prior Art](#prior-art)

## Conformance

Conformance objectives are to reduce AST diff churn and improve developer
experience

### Prettier

### whitespace

[source@airbnb/javascript#whitespace--in-braces](https://github.com/airbnb/javascript#whitespace--in-braces)

- 19.12 Add spaces inside curly braces. eslint: object-curly-spacing

```jsx
// bad
const foo = { clark: 'kent' };

// good
const foo = { clark: 'kent' };
```

#### arrow-parens

- 8.4 Always include parentheses around arguments for clarity and consistency.
  eslint: arrow-parens

[source@airbnb/javascript#arrows--one-arg-parens](https://github.com/airbnb/javascript#arrows--one-arg-parens)

> Why? Minimizes diff churn when adding or removing arguments.

```jsx
// bad
[1, 2, 3].map((x) => x * x);

// good
[1, 2, 3].map((x) => x * x);

// bad
[1, 2, 3].map(
  (number) =>
    `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`,
);

// good
[1, 2, 3].map(
  (number) =>
    `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`,
);

// bad
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});
```

##### one var

- 13.2 Use one const or let declaration per variable or assignment. eslint:
  one-var

> Why? It’s easier to add new variable declarations this way, and you never have
> to worry about swapping out a ; for a , or introducing punctuation-only diffs.
> You can also step through each declaration with the debugger, instead of
> jumping through all of them at once.

##### [ref:eslint/rules/one-var](https://eslint.org/docs/rules/one-var)

```jsx
// bad
const items = getItems(),
  goSportsTeam = true,
  dragonball = 'z';

// bad
// (compare to above, and try to spot the mistake)
const items = getItems(),
  goSportsTeam = true;
dragonball = 'z';

// good
const items = getItems();
const goSportsTeam = true;
const dragonball = 'z';
```

#### comma-dangle

> 20.2 Additional trailing comma: Yup. eslint:

    Why? This leads to cleaner git diffs. Also, transpilers like Babel will remove the additional trailing comma in the transpiled code which means you don’t have to worry about the trailing comma problem in legacy browsers.

```diff
// bad - git diff without trailing comma
const hero = {
     firstName: 'Florence',
-    lastName: 'Nightingale'
+    lastName: 'Nightingale',
+    inventorOf: ['coxcomb chart', 'modern nursing']
};

// good - git diff with trailing comma
const hero = {
     firstName: 'Florence',
     lastName: 'Nightingale',
+    inventorOf: ['coxcomb chart', 'modern nursing'],
};
```

#### implicit-arrow-linebreak

Enforce the location of arrow function bodies with implicit returns. eslint:

```js
// bad
(foo) => bar;

(foo) => bar;

// good
(foo) => bar;
(foo) => bar;
(foo) => bar;
```

## Naming Convention

We recommend using camel case, pascal case or snake case for your theme tokens.
Other word separators may not work as expected.

```js
// recommended
tokenName;
token_name;
token - name;

// avoid
token.name;
token$name;
token * name;
```

## Naming Components

- **Extensions**: Use `.jsx` extension for React components. eslint:
  [`react/jsx-filename-extension`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md)
- **Filename**: Use PascalCase for filenames. E.g., `ReservationCard.jsx`.
- **Reference Naming**: Use PascalCase for React components and camelCase for
  their instances. eslint:
  [`react/jsx-pascal-case`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md)

```jsx
// bad
import reservationCard from './ReservationCard';

// good
import ReservationCard from './ReservationCard';

// bad
const ReservationItem = <ReservationCard />;

// good
const reservationItem = <ReservationCard />;
```

- **Component Naming**: Use the filename as the component name. For example,
  `ReservationCard.jsx` should have a reference name of `ReservationCard`.
  However, for root components of a directory, use `index.jsx` as the filename
  and use the directory name as the component name:

```jsx
// bad
import Footer from './Footer/Footer';

// bad
import Footer from './Footer/index';

// good
import Footer from './Footer';
```

## Class vs `React.createClass` vs stateless

- If you have internal state and/or refs, prefer `class extends React.Component`
  over `React.createClass`. eslint:
  [`react/prefer-es6-class`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md)
  [`react/prefer-stateless-function`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md)

```jsx
// bad
const Listing = React.createClass({
  // ...
  render() {
    return <div>{this.state.hello}</div>;
  },
});

// good
class Listing extends React.Component {
  // ...
  render() {
    return <div>{this.state.hello}</div>;
  }
}
```

> And if you don’t have state or refs, prefer normal functions (not arrow
> functions) over classes:

```jsx
// bad
class Listing extends React.Component {
  render() {
    return <div>{this.props.hello}</div>;
  }
}

// bad (relying on function name inference is discouraged)
const Listing = ({ hello }) => <div>{hello}</div>;

// good
function Listing({ hello }) {
  return <div>{hello}</div>;
}
```

## TypeScript

These guidelines are adapted from the TypeScript core's contributor coding
guidelines.

- [Names](#names)
- [Exports](#exports)
- [Components](#components)
- [Types](#types)
- [`null` and `undefined`](#null-and-undefined)
- [General Assumptions](#general-assumptions)
- [Flags](#flags)
- [Comments](#comments)
- [Strings](#strings)
- [When to use `any`](#when-to-use-any)
- [Diagnostic Messages](#diagnostic-messages)
- [General Constructs](#general-constructs)
- [Style](#style)

## Names

1.  Use PascalCase for type names.
2.  Do not use "I" as a prefix for interface names.
3.  Use PascalCase for enum values.
4.  Use camelCase for function names.
5.  Use camelCase for property names and local variables.
6.  Do not use "\_" as a prefix for private properties.
7.  Use whole words in names when possible.
8.  Use `isXXXing` or `hasXXXXed` for variables representing states of things
    (e.g. `isLoading`, `hasCompletedOnboarding`).
9.  Give folders/files/components/functions unique names.

## Exports

1.  Only use named exports. The only exceptions are a tool requires default
    exports (e.g `React.lazy()`, Gatsby and Next.js `pages`, `typography.js`)

## Components

1.  1 file per logical component (e.g. parser, scanner, emitter, checker).
2.  If not kept in a separate folder, files with ".generated.\*" suffix are
    auto-generated, do not hand-edit them.
3.  Tests should be kept in the same directory with ".test.\*" suffix
4.  Filename should match the component name. Interfaces for React components
    should be called `<ComponentName>Props` and `<ComponentName>State`. The only
    exception is when writing a render prop. In this situation, you, the author,
    should call the interface for your component's props `<ComponentName>Config`
    and then the render prop interface `<ComponentName>Props` so it is easy for
    everyone else to use.

## Types

1.  Do not export types/functions unless you need to share it across multiple
    components.
2.  Do not introduce new types/values to the global namespace.
3.  Shared types should be defined in 'types.ts'.
4.  Within a file, type definitions should come first (after the imports).

## `null` and `undefined`

1.  Use **undefined**. Do not use `null`. EVER. If null is used (like in legacy
    Redux code), it should be kept isolated from other code with selectors.

## General Assumptions

1.  Consider objects like Nodes, Symbols, etc. as immutable outside the
    component that created them. Do not change them.
2.  Consider arrays as immutable by default after creation.

## Flags

1.  More than 2 related Boolean properties on a type should be turned into a
    flag.

## Comments

1.  Use JSDoc style comments for functions, interfaces, enums, and classes.
2.  **Document crazy stuff.** Always add `@see <url>` and the current date when
    referencing external resources, blog posts, tweets, snippets, gists, issues
    etc.
3.  Make note conditions upon which hacks and smelly code can be removed.

## Strings

1.  Use single quotes for strings. Double quotes around JSX string props.
2.  All strings visible to the user need to be localized (make an entry in
    diagnosticMessages.json).

## When to use `any`

1.  If something takes you longer than 10 minutes to type or you feel the need
    to read through TS Advanced Types docs, you should take a step back and ask
    for help, or use `any`.
2.  Custom typings of 3rd-party modules should be added to a `.d.ts` file in a
    `typings` directory. Document the date and version of the module you are
    typing at the top of the file.
3.  Consider rewriting tiny modules in typescript if types are too hard to think
    through.

## Diagnostic Messages

1.  Use a period at the end of a sentence.
2.  Use indefinite articles for indefinite entities.
3.  Definite entities should be named (this is for a variable name, type name,
    etc..).
4.  When stating a rule, the subject should be in the singular (e.g. "An
    external module cannot..." instead of "External modules cannot...").
5.  Use present tense.
6.  Use active voice.

## General Constructs

For a variety of reasons, we avoid certain constructs, and use some of our own.
Among them:

1.  Do not use `for..in` statements; instead, use `ts.forEach`, `ts.forEachKey`
    and `ts.forEachValue`. Be aware of their slightly different semantics.
2.  Try to use `ts.forEach`, `ts.map`, and `ts.filter` instead of loops when it
    is not strongly inconvenient.

## Style

0.  Use prettier and tslint/eslint.
1.  Use arrow functions over anonymous function expressions.
1.  Only surround arrow function parameters when necessary. <br />For example,
    `(x) => x + x` is wrong but the following are correct:
    1.  `x => x + x`
    2.  `(x,y) => x + y`
    3.  `<T>(x: T, y: T) => x === y`
1.  Always surround loop and conditional bodies with curly braces. Statements on
    the same line are allowed to omit braces.
1.  Open curly braces always go on the same line as whatever necessitates them.
1.  Parenthesized constructs should have no surrounding whitespace. <br />A
    single space follows commas, colons, and semicolons in those constructs. For
    example:
    1.  `for (var i = 0, n = str.length; i < 10; i++) { }`
    2.  `if (x < 10) { }`
    3.  `function f(x: number, y: string): void { }`
1.  Use a single declaration per variable statement <br />(i.e. use
    `var x = 1; var y = 2;` over `var x = 1, y = 2;`).
1.  Use 2 spaces per indentation.

### Prior Art & Citations

> Non Exhaustive List

- [Theo](https://github.com/salesforce-ux/theo)
- [Style Dictionary](https://amzn.github.io/style-dictionary/)
- [Lona](https://github.com/airbnb/Lona)
- [Universal Design Tokens](https://github.com/universal-design-tokens/udt)
- [Styled System](https://styled-system.com)
