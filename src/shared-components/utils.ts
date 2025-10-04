import { twMerge } from 'tailwind-merge';

export type ClassPropKey = 'class' | 'className';
type ClassValue =
	| ClassArray
	| ClassDictionary
	| string
	| number
	| bigint
	| null
	| boolean
	| undefined;
type ClassDictionary = Record<string, any>;
type ClassArray = ClassValue[];

export type ClassProp =
	| {
			class: ClassValue;
			className?: never;
	  }
	| { class?: never; className: ClassValue }
	| { class?: never; className?: never };

export type OmitUndefined<T> = T extends undefined ? never : T;
export type StringToBoolean<T> = T extends 'true' | 'false' ? boolean : T;
function toVal(mix) {
	let k;
	let y;
	let str = '';

	if (typeof mix === 'string' || typeof mix === 'number') {
		str += mix;
	} else if (typeof mix === 'object') {
		if (Array.isArray(mix)) {
			const len = mix.length;
			for (k = 0; k < len; k++) {
				if (mix[k]) {
					if ((y = toVal(mix[k]))) {
						str && (str += ' ');
						str += y;
					}
				}
			}
		} else {
			for (y in mix) {
				if (mix[y]) {
					str && (str += ' ');
					str += y;
				}
			}
		}
	}

	return str;
}
export function clsx(...inputs: ClassValue[]) {
	let i = 0;
	let tmp;
	let x;
	let str = '';
	const len = arguments.length;
	for (; i < len; i++) {
		if ((tmp = arguments[i])) {
			if ((x = toVal(tmp))) {
				str && (str += ' ');
				str += x;
			}
		}
	}
	return str;
}
// ---------------------------------------------------------------------
// end clsx
// ---------------------------------------------------------------------

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// ---------------------------------------------------------------------
// end of cn
// ---------------------------------------------------------------------

export type VariantProps<Component extends (...args: any) => any> = Omit<
	OmitUndefined<Parameters<Component>[0]>,
	'class' | 'className'
>;

const falsyToString = <T>(value: T) =>
	typeof value === 'boolean' ? `${value}` : value === 0 ? '0' : value;

export type CxOptions = Parameters<typeof clsx>;
export type CxReturn = ReturnType<typeof clsx>;

export const cx = clsx;

type ConfigSchema = Record<string, Record<string, ClassValue>>;

type ConfigVariants<T extends ConfigSchema> = {
	[Variant in keyof T]?: StringToBoolean<keyof T[Variant]> | null | undefined;
};
type ConfigVariantsMulti<T extends ConfigSchema> = {
	[Variant in keyof T]?:
		| StringToBoolean<keyof T[Variant]>
		| StringToBoolean<keyof T[Variant]>[]
		| undefined;
};

type Config<T> = T extends ConfigSchema
	? {
			variants?: T;
			defaultVariants?: ConfigVariants<T>;
			compoundVariants?: (T extends ConfigSchema
				? (ConfigVariants<T> | ConfigVariantsMulti<T>) & ClassProp
				: ClassProp)[];
		}
	: never;

type Props<T> = T extends ConfigSchema ? ConfigVariants<T> & ClassProp : ClassProp;

export const cva =
	<T>(base?: ClassValue, config?: Config<T>) =>
	(props?: Props<T>) => {
		if (config?.variants == null) return cx(base, props?.class, props?.className);

		const { variants, defaultVariants } = config;

		const getVariantClassNames = Object.keys(variants).map(
			(variant: keyof typeof variants) => {
				const variantProp = props?.[variant as keyof typeof props];
				const defaultVariantProp = defaultVariants?.[variant];

				if (variantProp === null) return null;

				const variantKey = (falsyToString(variantProp) ||
					falsyToString(
						defaultVariantProp,
					)) as keyof (typeof variants)[typeof variant];

				return variants[variant][variantKey];
			},
		);

		const propsWithoutUndefined =
			props &&
			Object.entries(props).reduce(
				(acc, [key, value]) => {
					if (value === undefined) {
						return acc;
					}

					acc[key] = value;
					return acc;
				},
				{} as Record<string, unknown>,
			);

		const getCompoundVariantClassNames = config?.compoundVariants?.reduce(
			(
				acc,
				{ class: cvClass, className: cvClassName, ...compoundVariantOptions },
			) =>
				Object.entries(compoundVariantOptions).every(([key, value]) =>
					Array.isArray(value)
						? value.includes(
								{
									...defaultVariants,
									...propsWithoutUndefined,
								}[key],
							)
						: {
								...defaultVariants,
								...propsWithoutUndefined,
							}[key] === value,
				)
					? [...acc, cvClass, cvClassName]
					: acc,
			[] as ClassValue[],
		);

		return cx(
			base,
			getVariantClassNames,
			getCompoundVariantClassNames,
			props?.class,
			props?.className,
		);
	};
