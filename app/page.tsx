import BannerCarousel from "@/components/shared/home/BannerCarousel";
import BlogImages from "@/components/shared/home/BlogImages";
import CategorySection from "@/components/shared/home/CategorySection";
import CrazyDeals from "@/components/shared/home/CrazyDeals";
import NeedOfWebsite from "@/components/shared/home/NeedOfWebsite";
import ProductCard from "@/components/shared/home/ProductCard";
import ReviewSection from "@/components/shared/home/ReviewSection";
import SpecialCombos from "@/components/shared/home/SpecialCombos";
import { fetchAllWebsiteBanners } from "@/lib/database/actions/banners.actions";
import { getAllSpecialComboOffers } from "@/lib/database/actions/homescreenoffers.actions";

const HomePage = async () => {
  const desktopImages: any = await fetchAllWebsiteBanners().catch((err) =>
    console.log(err)
  );
  const specialCombosHomeData: any = await getAllSpecialComboOffers().catch(
    (err) => console.log(err)
  );
  console.log("specialCombosHomeData", specialCombosHomeData);
  return (
    <div>
      <BannerCarousel desktopImages={desktopImages} />
      <SpecialCombos comboData={specialCombosHomeData} />
      <ProductCard heading="BEST SELLERS" />
      <CategorySection />
      <CrazyDeals />
      <NeedOfWebsite />
      <ReviewSection />
      <BlogImages />
    </div>
  );
};

export default HomePage;
