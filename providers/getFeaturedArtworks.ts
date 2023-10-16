const getFeaturedArtworks = async () => {
  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks/search?query[term][is_public_domain]=true&limit=5&fields=id,title,material_titles,is_public_domain&q=still%20life`
  );
  const resJson = await response.json();

  return resJson.data as {
    id: number;
    title: string;
    material_titles: string[];
  }[];
};

export default getFeaturedArtworks;
