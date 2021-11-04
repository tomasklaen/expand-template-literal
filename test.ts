import test from 'ava';
import {expandTemplateLiteral as e, TemplateError} from './src';

test('2nd param is optional', async (t) => {
	t.is(e('${2}'), '2');
});

test('expands data', async (t) => {
	t.is(e('foo ${foo}', {foo: 'bar'}), 'foo bar');
});

test('expands expressions', async (t) => {
	t.is(e('${n + 2}', {n: 5}), '7');
});

test('templates can use non-serializable data', async (t) => {
	const getId = () => 5;
	Object.defineProperty(getId, 'foo', {
		enumerable: false,
		configurable: false,
		get() {
			return 'bar';
		},
	});
	t.is(e('${getId()} ${getId.foo}', {getId}), '5 bar');
});

test('throws TemplateError', async (t) => {
	t.throws(() => e('${mis.sing.chain}'), {instanceOf: TemplateError});
});

test('no access to out of scope variables', async (t) => {
	// @ts-ignore
	const foo = 'bar';
	t.throws(() => e('${foo} ${bar}', {bar: 'baz'}), {instanceOf: TemplateError, message: 'foo is not defined'});
});
