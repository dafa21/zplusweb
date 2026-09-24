export const formatNominal = (value) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "decimal",
  });

  return formatter.format(value);
};
