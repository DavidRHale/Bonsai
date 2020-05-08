export const getEnumValues = (enumb: any): { name: string; value: number }[] => {
  const values: { name: string; value: number }[] = [];

  for (var enumValue in enumb) {
    if (!Number(enumValue)) {
      values.push({ name: enumValue, value: enumb[enumValue] });
    }
  }

  return values;
};
