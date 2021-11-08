# expand-template-literal

Expands template literals supplied as strings.

The purpose is to provide the most powerful and comfy templating experience in places where templates can be trusted. **DO NOT use where malicious templates could cause harm.**

Templates work exactly as JavaScript template literals, because they are. Passed strings are just wrapped in a context configuring expression, and passed to `eval()`.

Pros:

-   The power of JavaScript template literals with variables and embedded expressions in your templates.
-   Apart of serializable data, templates can also use utility functions and constructors.
-   Tiny, less than 300 bytes.

Cons:

-   Absolutely insecure.
-   Templates can do anything the context they run in can.
-   Can't be used in places where templates can't be trusted.

## Install

```
npm install expand-template-literal
```

## Usage

```ts
import {expandTemplateLiteral as expand} from 'expand-template-literal';
import * as dayjs from 'dayjs';

const result = expand("${name} arrived at ${dayjs(arrival).format('dddd')}.", {
	// Provide templates with variables
	name: 'John',
	arrival: 1636377526618,

	// And even utilities they can use
	dayjs,
});

console.log(result); // "John arrived at Monday."
```

## API

Exported interfaces:

---

### `expandTemplateLiteral`

```ts
function expandTemplateLiteral(template: string, variables?: Record<string, any>): string;
```

Expands passed template with variables supplied by 2nd argument.

#### `template`

Type: `string` _required_

JavaScript template literal string.

#### `variables`

Type: `Record<string, any>` _optional_

Values can be literally anything. Serializable data, functions, constructors, instances, symbols, ...

#### Return

Returns expanded template as a string, or throws `TemplateError` if anything inside the template went wrong.

---

### `TemplateError`

Thrown when template errors out. Nothing special, just a custom constructor to identify the error with.
