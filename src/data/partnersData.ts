interface Partner {
  name: string;
  logo: string;
  url: string;
  category: string;
  description?: string;
}

interface SponsorshipLevel {
  name: string;
  title: string;
  description: string;
}

// Define sponsorship levels in descending order (Prestige > Gold > Starter)
export const sponsorshipLevels: SponsorshipLevel[] = [
  {
    name: "prestige",
    title: "Partenaires Prestige",
    description: ""
    // description: "Nos partenaires les plus prestigieux qui soutiennent largement notre événement"
  },
  {
    name: "gold",
    title: "Partenaires Gold",
    description: ""
    // description: "Des partenaires majeurs qui contribuent significativement au succès du Forum"
  },
  {
    name: "starter",
    title: "Partenaires Starter",
    description: ""
    // description: "Partenaires qui participent activement au Forum ECC"
  }
];

// Partner data based on the images available in public/images/partners
export const partnersData: Partner[] = [
  // Prestige Partners - Most prestigious and largest international brands
  {
    name: "Orange",
    logo: "/images/partners/Orange_Logo.png",
    url: "https://www.orange.ma/",
    category: "prestige",
    description: "Leader mondial des télécommunications"
  },
  {
    name: "Attijariwafa Bank",
    logo: "/images/partners/attijariwafa.jpg",
    url: "https://www.attijariwafabank.com/",
    category: "prestige",
    description: "Leader du secteur bancaire au Maroc et en Afrique"
  },
  {
    name: "BMCI BNP Paribas Group",
    logo: "/images/partners/bnp_paribas.jpg",
    url: "https://www.bmci.ma/",
    category: "prestige",
    description: "Banque marocaine membre du groupe BNP Paribas"
  },
  {
    name: "Schiele",
    logo: "/images/partners/schiele.jpg",
    url: "https://schielemaroc.com/",
    category: "prestige",
    description: "Expertise en tableautiers industriels"
  },
  {
    name: "Akwa",
    logo: "/images/partners/akwa.jpg",
    url: "https://schielemaroc.com/",
    category: "prestige",
    description: "Expertise en tableautiers industriels"
  },
  
  // Gold Partners - Major regional players and established brands
  {
    name: "L'Oréal",
    logo: "/images/partners/oreal.jpg",
    url: "https://www.loreal.ma/",
    category: "gold",
    description: "Leader mondial des cosmétiques"
  },
  {
    name: "Ventec",
    logo: "/images/partners/ventec.png",
    url: "https://www.ventec.ma/",
    category: "gold",
    description: "Spécialiste en solutions de ventilation et climatisation"
  },
  {
    name: "Forvis Mazars",
    logo: "/images/partners/forvis.png",
    url: "https://www.forvismazars.com/",
    category: "gold",
    description: "Cabinet d'audit et de conseil international"
  },
  {
    name: "Banque Centrale Populaire",
    logo: "/images/partners/bcp.png",
    url: "https://www.banquecentrale.ma/",
    category: "gold",
    description: "Banque panafricaine"
  },
  {
    name: "OMCO",
    logo: "/images/partners/omco.png",
    url: "https://www.onhym.com/",
    category: "gold",
    description: "Office National des Hydrocarbures et des Mines"
  },
  {
    name: "Centrale Danone",
    logo: "/images/partners/centrale_danone.jpg",
    url: "https://www.danone.ma/",
    category: "gold",
    description: "Entreprise agroalimentaire spécialisée dans les produits laitiers"
  },
  {
    name: "Bank of Africa",
    logo: "/images/partners/boa.jpg",
    url: "https://www.gbp.ma/",
    category: "gold",
    description: "Groupe bancaire populaire"
  },
  {
    name: "Capgemini Engineering",
    logo: "/images/partners/capgemini.jpg",
    url: "https://www.capgemini.com/",
    category: "starter",
    description: "Services de conseil et ingénierie technologique"
  },
  {
    name: "OCP Solutions",
    logo: "/images/partners/ocp_sol.png",
    url: "https://www.ocpgroup.ma/",
    category: "gold",
    description: "Leader mondial dans l'industrie des phosphates"
  },
  {
    name: "Vinci energies",
    logo: "/images/partners/vinci.jpg",
    url: "#",
    category: "gold",
    description: "Energie"
  },


  // Starter Partners - Supporting companies and emerging partners
  {
    name: "Leyton",
    logo: "/images/partners/leyton.png",
    url: "https://www.leyton.com/",
    category: "starter",
    description: "Conseil en financement de l'innovation"
  },
  {
    name: "Equancy",
    logo: "/images/partners/equancy.png",
    url: "https://www.equancy.com/",
    category: "starter",
    description: "Cabinet de conseil en transformation digitale"
  },
  {
    name: "Fidaroc Grant Thornton",
    logo: "/images/partners/grant_thornton.png",
    url: "https://www.grantthornton.ma/",
    category: "starter",
    description: "Cabinet d'audit et de conseil"
  },
  {
    name: "Newrest",
    logo: "/images/partners/Newrest.png",
    url: "https://www.newrest.eu/",
    category: "starter",
    description: "Spécialiste de la restauration collective"
  },
  {
    name: "Dascher",
    logo: "/images/partners/dascher.png",
    url: "https://www.dachser.com/",
    category: "starter",
    description: "Solutions logistiques internationales"
  },
  {
    name: "Lafarge Holcim",
    logo: "/images/partners/lafarge.png",
    url: "https://www.lafargeholcim.ma/",
    category: "starter",
    description: "Leader mondial des matériaux de construction"
  },
  {
    name: "PwC",
    logo: "/images/partners/pwc.png",
    url: "https://www.pwc.com/ma/",
    category: "starter",
    description: "Cabinet d'audit et de conseil"
  },
  {
    name: "Suez",
    logo: "/images/partners/suez.webp",
    url: "https://www.suez.com/",
    category: "starter",
    description: ""
  },
  {
    name: "Tamwilcom",
    logo: "/images/partners/tamwilcom.jpg",
    url: "http://www.tamwilcom.ma/",
    category: "starter",
    description: ""
  },
  {
    name: "Lesieur",
    logo: "/images/partners/Lessieur.jpg",
    url: "#",
    category: "starter",
    description: ""
  },
  {
    name: "Inetum",
    logo: "/images/partners/inetum.png",
    url: "#",
    category: "starter",
    description: ""
  },
  {
    name: "CIH ",
    logo: "/images/partners/cih.png",
    url: "#",
    category: "starter",
    description: ""
  }

];
