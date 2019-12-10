export function updateBrandModel(brand) {
  if (brand) {

    const brandType = {
      ContentItemId: brand.contentItemId,
      FullName: brand.fullName,
      BrandName: brand.brandName,
      BusinessAreas: brand.businessAreas,
      Phone: brand.phone,
      Location: brand.location,
    }
    var myJSON = JSON.stringify(brandType);

    return brandType;
  }
}