export class TemplateError extends Error {}

export function expandTemplateLiteral(template: string, variables: Record<string, any> = {}): string {
	try {
		/**
		 * Can't use `with` statement, as it's disabled in strict mode :(, and
		 * since all modern ES specs assume or require it, disabling strict
		 * mode itself is not worth it.
		 */
		return eval(`(() => {
			${Object.keys(variables)
				.map((name) => `const ${name} = variables['${name}'];`)
				.join('')}
			return \`${template}\`;
		})()`) as string;
	} catch (error) {
		throw new TemplateError((error as any)?.message);
	}
}
