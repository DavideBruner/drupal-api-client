/**
 * Let's use the mixin pattern to combine our services classes.
 * Take a look at https://www.typescriptlang.org/docs/handbook/mixins.html#alternative-pattern
 * 
 * @param derivedCtor 
 * @param constructors 
 */
/* eslint-disable  @typescript-eslint/no-explicit-any */
export default function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null)
      );
    });
  });
}