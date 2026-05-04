import { siteConfig, type CitySlug, type ServiceSlug } from "@/lib/site-config";
import { citiesContent } from "@/lib/cities-content";
import { servicesContent } from "@/lib/services-content";

export interface ServiceCityCombo {
  combo: string;
  serviceSlug: ServiceSlug;
  citySlug: CitySlug;
  serviceName: string;
  cityName: string;
}

export function getAllCombos(): ServiceCityCombo[] {
  const combos: ServiceCityCombo[] = [];
  for (const service of siteConfig.services) {
    for (const city of siteConfig.serviceAreas) {
      if (!city.launch) continue;
      combos.push({
        combo: `${service.slug}-${city.slug}`,
        serviceSlug: service.slug,
        citySlug: city.slug,
        serviceName: service.name,
        cityName: city.name,
      });
    }
  }
  return combos;
}

export function findCombo(slug: string): ServiceCityCombo | undefined {
  return getAllCombos().find((c) => c.combo === slug);
}

export function getComboCopy(combo: ServiceCityCombo) {
  const service = servicesContent[combo.serviceSlug];
  const city = citiesContent[combo.citySlug];
  return { service, city };
}
