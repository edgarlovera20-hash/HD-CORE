export function assertRequired(value: unknown, fieldName: string): void {
  if (value === null || value === undefined || value === "") {
    throw new Error(`${fieldName} is required`);
  }
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isPhoneLike(value: string): boolean {
  return /^[0-9+()\-\s]{8,20}$/.test(value);
}
