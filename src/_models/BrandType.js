export function updateBrandModel(brand) {
  if (brand) {

    const brandType = {
      contentItemId: brand.contentItemId,
      fullName: brand.fullName,
      brandName: brand.brandName,
      businessAreas: brand.businessAreas,
      phone: brand.phone,
      location: brand.location,
    }

    return brandType;
  }
}