const getIcon = (material_titles: string[]) => {
  const materials = material_titles.join("");
  if (materials.includes("paint")) {
    return "🎨";
  }

  if (materials.includes("sculpture")) {
    return "⛏️";
  }

  if (materials.includes("drawing")) {
    return "✏️";
  }

  if (materials.includes("print")) {
    return "🖨️";
  }

  if (materials.includes("photo")) {
    return "📷";
  }

  if (materials.includes("paper")) {
    return "📄";
  }

  return "🖼️";
};

export default getIcon;
