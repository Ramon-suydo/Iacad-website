export type ResourceCategory = {
  slug: string;
  name: string;
  description: string;
  items: string[];
};

export const resourceCategories: ResourceCategory[] = [
  {
    slug: "print-collection",
    name: "Print Collection",
    description:
      "Curated physical materials covering design, technology, business, and the arts.",
    items: [
      "Academic textbooks and references",
      "Design and multimedia arts publications",
      "Business and entrepreneurship titles",
      "Periodicals and journals",
    ],
  },
  {
    slug: "digital-resources",
    name: "Digital Resources",
    description:
      "Curated digital references available for on-site academic use.",
    items: [
      "E-book reference collection",
      "Academic journal database access",
      "Multimedia and design asset archives",
      "Institutional research repository",
    ],
  },
  {
    slug: "thesis-capstone",
    name: "Thesis & Capstone Archive",
    description:
      "A dedicated archive of past student theses and capstone projects for reference.",
    items: [
      "Undergraduate thesis compilations",
      "Capstone project documentation",
      "Panel-approved research papers",
    ],
  },
  {
    slug: "industry-references",
    name: "Industry & Program References",
    description:
      "Resources aligned with iACADEMY's specialized academic programs.",
    items: [
      "Game development & design references",
      "Animation and visual arts resources",
      "Business and entrepreneurship case studies",
      "Culinary and hospitality references",
    ],
  },
];