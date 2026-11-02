import content from '~/data/content';

function mergeSpecs(defaultSpecs = [], specsOverride = []) {
  const overrideMap = new Map((specsOverride || []).map(s => [s.label, s.value]));
  return (defaultSpecs || []).map(spec => ({
    label: spec.label,
    value: overrideMap.has(spec.label) ? overrideMap.get(spec.label) : spec.value,
  }));
}

export function useContent() {
  const project = content.meta.projectName;
  const withBase = (path) => {
    if (!path) return '';
    return useRuntimeConfig().app.baseURL.replace(/\/$/, '') + path;
  };

  const wa = (key = 'konsultasi', vars = {}) => {
    const tpl = content.meta.whatsapp.templates[key] || content.meta.whatsapp.templates.konsultasi;
    const msg = tpl.replace(/{project}/g, project).replace(/{type}/g, vars.type || '');
    return `https://wa.me/${content.meta.whatsapp.number}?text=${encodeURIComponent(msg)}`;
  };

  const houseTypes = (content.houseTypes || []).map(t => ({
    ...t,
    thumbnail: t.thumbnail ? withBase(t.thumbnail) : t.thumbnail,
    gallery: (t.gallery || []).map(withBase),
    facades: (t.facades || []).map(f => ({ ...f, src: withBase(f.src) })),
    specs: mergeSpecs(content.defaultSpecs, t.specsOverride),
    waLink: wa('type', { type: t.name }),
  }));

  return {
    content: {
      ...content,
      meta: {
        ...content.meta,
        logo: withBase(content.meta.logo),
        logoGroup: withBase(content.meta.logoGroup),
        logoGroupDark: withBase(content.meta.logoGroupDark),
      },
      hero: {
        ...content.hero,
        image: withBase(content.hero.image),
        imageMobile: withBase(content.hero.imageMobile || content.hero.image),
        heroMobile: withBase(content.hero.heroMobile || content.hero.image),
      },
      about: {
        ...content.about,
        photos: {
          main: withBase(content.about?.photos?.main),
          small: withBase(content.about?.photos?.small),
        },
        awards: (content.about.awards || []).map(a => ({ ...a, image: withBase(a.image) })),
      },
      banks: (content.banks || []).map(b => ({
        ...b,
        image: withBase(b.image),
        imageWhite: withBase(b.imageWhite),
      })),
      locationSection: {
        ...content.locationSection,
        mapImage: content.locationSection?.mapImage ? withBase(content.locationSection.mapImage) : '',
      },
      // Safe fallbacks for interim components
      advantages: (content.advantages || []).map(a => ({ ...a, image: withBase(a.image) })),
      reasons: content.reasons || {
        headingImage: '',
        headingAlt: '',
        subheading: '',
        mapAlt: '',
        mapZoomHint: '',
        mapCtaLabel: '',
        mapCloseLabel: '',
      },
      mascot: content.mascot || { image: '', alt: '', title: '', text: '' },
      products: content.products || { title: 'Pilihan Rumah', detailCtaLabel: 'Lihat Detail', priceHeadline: '', priceRange: '' },
    },
    wa,
    houseTypes,
    withBase,
  };
}
