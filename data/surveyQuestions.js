// Environmental Health Survey Questions
// This file contains all survey questions organized by sections

export const surveyQuestions = {
  demographic: {
    id: 'demographic',
    title: 'Demographic/Personal Questions',
    questions: [
      {
        id: 'biological_sex',
        text: 'What is your biological sex?',
        type: 'radio',
        options: ['Male', 'Female', 'Other'],
        required: false
      },
      {
        id: 'height',
        text: 'What is your height?',
        type: 'number',
        unit: 'Please specify units (ft/in or cm)',
        required: false,
        notes: 'Make sure you capture the units here. Seems obvious but you would be surprised.'
      },
      {
        id: 'weight',
        text: 'What is your weight?',
        type: 'number',
        unit: 'Please specify units (lbs or kg)',
        required: false,
        notes: 'Make sure you capture the units here. Seems obvious but you would be surprised.'
      },
      {
        id: 'relationship_status',
        text: 'What is your relationship status?',
        type: 'radio',
        options: ['Single', 'Married', 'Partnered', 'Other'],
        required: false
      },
      {
        id: 'home_ownership',
        text: 'Do you own your current home?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false
      },
      {
        id: 'home_type',
        text: 'What type of home do you live in?',
        type: 'radio',
        options: ['Apartment', 'Townhome', 'Single-family home', 'Other'],
        required: false
      },
      {
        id: 'hours_at_home',
        text: 'How many hours a day approximately do you spend in your home?',
        type: 'number',
        required: false,
        multiplier: true,
        multiplierRange: [1, 2],
        multiplierNote: 'This will be used to multiply the impact of indoor exposures'
      },
      {
        id: 'children_count',
        text: 'How many children under the age of 18 are living in your home?',
        type: 'number',
        required: false,
        multiplier: true,
        multiplierValue: 0.5,
        multiplierNote: 'This adds 0.5 to the multiplier for each child that is exposed'
      },
      {
        id: 'pregnancy_status',
        text: 'Are you pregnant? If male, is your partner pregnant?',
        type: 'radio',
        options: ['Yes', 'No', 'N/A'],
        required: false,
        multiplier: true,
        multiplierCondition: 'Yes',
        multiplierValue: 2,
        multiplierNote: 'Doubles the weighting if pregnant'
      },
      {
        id: 'trying_to_conceive',
        text: 'Are you trying to get pregnant? If male, is your partner trying to get pregnant?',
        type: 'radio',
        options: ['Yes', 'No', 'N/A'],
        required: false,
        multiplier: true,
        multiplierCondition: 'Yes',
        multiplierValue: 2,
        multiplierNote: 'Doubles the weighting if trying to get pregnant'
      },
      {
        id: 'health_conditions',
        text: 'Do you have any diagnosed health conditions?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        hasFollowUp: true
      },
      {
        id: 'health_conditions_details',
        text: 'If Yes, please provide details',
        type: 'textarea',
        required: false,
        dependsOn: 'health_conditions',
        dependsOnValue: 'Yes',
        notes: 'For now this makes sense. There are options to make this a structured field in the future.'
      },
      {
        id: 'budget',
        text: 'What is your current budget for addressing environmental exposures in your home?',
        type: 'radio',
        options: ['<$500', '$500-$1000', '$1000-$2000', '$2000-$5000', 'Whatever it takes'],
        required: false
      },
      {
        id: 'weight_loss',
        text: 'Have you recently experienced a significant amount of weight loss (intentional or unintentional)?',
        type: 'radio',
        options: ['Yes', 'No', 'Not sure'],
        required: false,
        notes: 'Maybe if they say yes, you can ask if intentional or unintentional.'
      },
      {
        id: 'occupation',
        text: 'Occupation',
        type: 'text',
        required: false
      },
      {
        id: 'demographic_additional',
        text: 'Anything else to add or any questions in this section?',
        type: 'textarea',
        required: false
      }
    ]
  },

  overload_indicators: {
    id: 'overload_indicators',
    title: 'Overload or Poor Metabolizer Indicators',
    questions: [
      {
        id: 'sudden_symptoms',
        text: 'Had a sudden onset of symptoms (headaches, skin rashes, nausea, fatigue, shortness of breath, etc.) on exposure to fragrance, cigarettes, mold, dust, pollens or other environmental allergens?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0.5, 0.75, 1, 1.5]
      },
      {
        id: 'smell_sensitivity',
        text: 'Smell odors when others can\'t?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0.25, 0.5, 0.75, 1],
        notes: 'Lower score due to subjective nature of this'
      },
      {
        id: 'medication_sensitivity',
        text: 'Often had to lower the regular dose of prescription, over-the-counter medication or herbal supplements because you were too sensitive to normal doses?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0.5, 0.75, 1, 1.5]
      },
      {
        id: 'adverse_reactions',
        text: 'Ever experienced adverse reactions to medications?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0.5, 0.75, 1, 1.5]
      },
      {
        id: 'environment_sick',
        text: 'Ever had to leave your residence or job because your environment was making you sick?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0.5, 0.75, 1, 1.5]
      },
      {
        id: 'detergent_aisle',
        text: 'Avoid the detergent isle in a store because it makes you feel ill or have other symptoms?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0.5, 0.75, 1, 1.5]
      },
      {
        id: 'skin_reactions',
        text: 'Easily get rashes or skin irritation through contact with clothing or body care products?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0.5, 0.75, 1, 1.5]
      },
      {
        id: 'alcohol_sensitivity',
        text: 'Easily get intoxicated with one or less alcoholic beverages?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0.5, 0.75, 1, 1.5]
      },
      {
        id: 'caffeine_sensitivity',
        text: 'Avoid caffeine because it makes you jittery, irritated, or causes insomnia?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0.25, 0.5, 0.75, 1],
        notes: 'Lower score because this can happen due to CNS sensitivity or neurotransmitter release'
      },
      {
        id: 'overload_additional',
        text: 'Anything else to add or any questions in this section?',
        type: 'textarea',
        required: false
      }
    ]
  },

  allergens: {
    id: 'allergens',
    title: 'Allergens (A)',
    questions: [
      {
        id: 'food_symptoms',
        text: 'Regularly eat foods or are exposed to substances that cause symptoms such as stuffiness, cough, shortness of breath, wheeze, rash, bloating, gas, abdominal pain, diarrhea, constipation, heart burn, fatigue, or difficulty concentrating',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0.5, 0.75, 1, 1.5]
      },
      {
        id: 'metal_reactions',
        text: 'Have skin reactions to metal products (like jewelry)?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0.25, 0.5, 0.75, 1],
        notes: 'Lower score because this is usually contact dermatitis to a specific metal'
      },
      {
        id: 'allergens_additional',
        text: 'Anything else to add or any questions in this section?',
        type: 'textarea',
        required: false
      }
    ]
  },

  solvents_vocs: {
    id: 'solvents_vocs',
    title: 'Solvents/VOCs (SV)',
    questions: [
      {
        id: 'dry_cleaner',
        text: 'Live within 1 mile of or are a regular customer of Dry Cleaner?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        multiplier: 1.5,
        categories: ['Air Quality (indoor/outdoor, VOCs)', 'Chemical Exposures (cleaners, etc.)', 'Proximity to External Risks', 'Water Quality & Use'],
        intervention: 'Have water tested for PERC. Clothes should be aired out outside or away from living space'
      },
      {
        id: 'attached_garage',
        text: 'Park your car in attached garage?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        categories: ['Air Quality (indoor/outdoor, VOCs)'],
        intervention: 'Include CO detectors and proper sealing of doorways from garage to living space'
      },
      {
        id: 'gas_appliances',
        text: 'Use a gas stove, gas water heater, a wood stove or a fireplace?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0, 0.25, 1, 1.25],
        categories: ['Air Quality (indoor/outdoor, VOCs)']
      },
      {
        id: 'traffic_exposure',
        text: 'Live or work near heavy traffic, airport, gas station, or idling vehicles?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        multiplier: 1.25,
        categories: ['Air Quality (indoor/outdoor, VOCs)', 'Proximity to External Risks']
      },
      {
        id: 'charred_meat',
        text: 'Eat charred meat?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0, 0.25, 1, 1.25],
        categories: ['Lifestyle Exposures'],
        intervention: 'Reduce consumption of charred meats'
      },
      {
        id: 'chemical_cleaners',
        text: 'Use bleach and other chemical cleaners in home or at work?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0, 0.25, 1, 1.25],
        categories: ['Chemical Exposures (cleaners, etc.)'],
        intervention: 'Reduce exposure and wear PPE for inhalation exposure'
      },
      {
        id: 'oils_grease',
        text: 'Been routinely exposed to oils, grease, de-greaser, fuels?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0, 0.25, 1, 1.25],
        categories: ['Chemical Exposures (cleaners, etc.)'],
        intervention: 'Reduce exposure and wear PPE for inhalation and contact exposure'
      },
      {
        id: 'paints_stains',
        text: 'Been routinely exposed to interior or exterior paints, stains, finishes, removers?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0, 0.25, 1, 1.25],
        categories: ['Chemical Exposures (cleaners, etc.)'],
        intervention: 'Reduce exposure and wear PPE for inhalation and contact exposure'
      },
      {
        id: 'rubber_exposure',
        text: 'Been routinely exposed to synthetic rubber, tire parts, synthetic latex rubber?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0, 0.25, 1, 1.25],
        categories: ['Chemical Exposures (cleaners, etc.)'],
        intervention: 'Reduce exposure and wear PPE for inhalation and contact exposure'
      },
      {
        id: 'glues_solvents',
        text: 'Been routinely exposed to glues, epoxies, resins, solvents?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0, 0.25, 1, 1.25],
        categories: ['Chemical Exposures (cleaners, etc.)'],
        intervention: 'Reduce exposure and wear PPE for inhalation and contact exposure'
      },
      {
        id: 'solvents_additional',
        text: 'Anything else to add or any questions in this section?',
        type: 'textarea',
        required: false
      }
    ]
  },

  pesticides: {
    id: 'pesticides',
    title: 'Pesticides (PE)',
    questions: [
      {
        id: 'agricultural_proximity',
        text: 'Live or work nearby farm, vineyard, orchard, grove or other agricultural land?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        categories: ['Proximity to External Risks']
      },
      {
        id: 'golf_course_proximity',
        text: 'Live or work nearby golf course?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        categories: ['Proximity to External Risks', 'Water Quality & Use']
      },
      {
        id: 'pesticide_use',
        text: 'Use pesticides or herbicides inside your home/workplace or outside on grass or garden?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0, 0.25, 1, 1.25],
        categories: ['Proximity to External Risks', 'Water Quality & Use', 'Chemical Exposures (cleaners, etc.)'],
        notes: 'Worth separating inside vs outside exposures in future versions'
      },
      {
        id: 'pets',
        text: 'Have indoor/outdoor animals?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [0.25, 0],
        categories: ['Lifestyle Exposures'],
        notes: 'Regular baths for pet may help'
      },
      {
        id: 'pet_treatments',
        text: 'Have animals chemically treated for fleas etc.?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        categories: ['Chemical Exposures (cleaners, etc.)'],
        intervention: 'Use safer alternatives, follow manufacturer instructions, wash hands after application'
      },
      {
        id: 'mothballs',
        text: 'Regularly used mothballs?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        multiplier: 1.5,
        categories: ['Chemical Exposures (cleaners, etc.)', 'Air Quality (indoor/outdoor, VOCs)'],
        intervention: 'Use alternatives like red cedar wood and oil, essential oils, airtight containers'
      },
      {
        id: 'organic_food',
        text: 'What percentage of the food you buy is labeled "organic"?',
        type: 'radio',
        options: ['<25%', '50%-75%', '75%-95%', '>95%'],
        required: false,
        scoring: [1, 0.25, 0, 0],
        categories: ['Lifestyle Exposures'],
        notes: 'Most food exposure to pesticides is actually pretty low'
      },
      {
        id: 'pesticides_additional',
        text: 'Anything else to add or any questions in this section?',
        type: 'textarea',
        required: false
      }
    ]
  },

  metals: {
    id: 'metals',
    title: 'Metals (MT)',
    questions: [
      {
        id: 'mercury_exposure',
        text: 'Broken a mercury thermometer or fluorescent lamp?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        multiplier: 0.5,
        categories: ['Heavy Metals'],
        notes: 'Lower severity rating. Use PPE when cleaning'
      },
      {
        id: 'mercury_play',
        text: 'Played with mercury "balls"?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        categories: ['Heavy Metals'],
        intervention: 'Avoid this practice'
      },
      {
        id: 'supplements_foreign',
        text: 'Take ayurvedic or other supplement/herbal formulas made in China or India or other 3rd world country?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0, 0.25, 1, 1.25],
        categories: ['Heavy Metals', 'Chemical Exposures (cleaners, etc.)']
      },
      {
        id: 'old_house',
        text: 'Live in house built before 1978?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        categories: ['Building Materials/Renovation', 'Air Quality (indoor/outdoor, VOCs)', 'Heavy Metals']
      },
      {
        id: 'metals_additional',
        text: 'Anything else to add or any questions in this section?',
        type: 'textarea',
        required: false
      }
    ]
  },

  mold: {
    id: 'mold',
    title: 'Mold (M)',
    questions: [
      {
        id: 'visible_mold',
        text: 'Live in a house with visible mold?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        multiplier: 1.5,
        categories: ['Mold & Moisture'],
        intervention: 'Use mold remediation company'
      },
      {
        id: 'water_leak',
        text: 'Live in a house with an indoor water leak?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        multiplier: 1.5,
        categories: ['Mold & Moisture'],
        intervention: 'Evaluate for mold'
      },
      {
        id: 'wet_areas',
        text: 'Live in a house with wet inside windows or other inside areas?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        multiplier: 1.5,
        categories: ['Mold & Moisture'],
        intervention: 'Evaluate for mold'
      },
      {
        id: 'flooded_basement',
        text: 'History of a flooded basement, damp musty basement or crawl space?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        categories: ['Mold & Moisture']
      },
      {
        id: 'house_plants',
        text: 'Numerous plants in your house?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [0, 1],
        multiplier: 0.5,
        categories: ['Air Quality (indoor/outdoor, VOCs)'],
        intervention: 'House plants can help improve air quality and remove toxins'
      },
      {
        id: 'hvac_sickness',
        text: 'Home where turning on the central air or heat caused you or family members to feel sick?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        multiplier: 1.5,
        categories: ['Air Quality (indoor/outdoor, VOCs)', 'Mold & Moisture'],
        intervention: 'Have filters and ducts and furnace evaluated'
      },
      {
        id: 'mold_additional',
        text: 'Anything else to add or any questions in this section?',
        type: 'textarea',
        required: false
      }
    ]
  },

  plastics: {
    id: 'plastics',
    title: 'Plastics (PL)',
    questions: [
      {
        id: 'canned_foods',
        text: 'Regularly eat/drink canned foods/beverages?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0, 0.25, 1, 1.25],
        categories: ['Lifestyle Exposures']
      },
      {
        id: 'plastic_packaging',
        text: 'Regularly consume food packaged in plastic or non-stick wrap?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0, 0.25, 1, 1.25],
        categories: ['Lifestyle Exposures', 'POPs/Plastics']
      },
      {
        id: 'plastic_bottles',
        text: 'Drink beverages including water from plastic bottles?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0, 0.25, 1, 1.25],
        categories: ['Lifestyle Exposures', 'POPs/Plastics']
      },
      {
        id: 'store_receipts',
        text: 'Regularly handle store receipts?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0, 0.25, 1, 1.25],
        categories: ['Chemical Exposures (cleaners, etc.)']
      },
      {
        id: 'plastics_additional',
        text: 'Anything else to add or any questions in this section?',
        type: 'textarea',
        required: false
      }
    ]
  },

  personal_care: {
    id: 'personal_care',
    title: 'Personal Care Products (PCP)',
    questions: [
      {
        id: 'makeup',
        text: 'Regularly wear make-up?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0, 0.25, 1, 1.25],
        categories: ['Chemical Exposures (cleaners, etc.)', 'Heavy Metals']
      },
      {
        id: 'hair_skin_products',
        text: 'Regularly use hair and skin products containing fragrance phthalates or parabens?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0, 0.25, 1, 1.25],
        categories: ['Chemical Exposures (cleaners, etc.)']
      },
      {
        id: 'nail_polish',
        text: 'Regularly use nail polish?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0, 0.25, 1, 1.25],
        categories: ['Chemical Exposures (cleaners, etc.)']
      },
      {
        id: 'scented_products',
        text: 'Use scented soaps, lotions, detergents, potpourri, perfumes, etc.?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0.25, 0.5, 0.75, 1],
        categories: ['Chemical Exposures (cleaners, etc.)'],
        notes: 'Lower severity, health effects less well established'
      },
      {
        id: 'fabric_softener',
        text: 'Use fabric softener?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0.25, 0.5, 0.75, 1],
        categories: ['Chemical Exposures (cleaners, etc.)'],
        notes: 'Lower severity because most health effects do not cause long term impacts'
      },
      {
        id: 'personal_care_additional',
        text: 'Anything else to add or any questions in this section?',
        type: 'textarea',
        required: false
      }
    ]
  },

  other_chemical: {
    id: 'other_chemical',
    title: 'Other Chemical Exposures',
    questions: [
      {
        id: 'dump_site',
        text: 'Live within 3 miles of a dump site or Super Fund site?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        categories: ['Air Quality (indoor/outdoor, VOCs)', 'Chemical Exposures (cleaners, etc.)', 'Proximity to External Risks', 'Water Quality & Use']
      },
      {
        id: 'industrial_plant',
        text: 'Live within 3 miles of an industrial plant?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        categories: ['Air Quality (indoor/outdoor, VOCs)', 'Chemical Exposures (cleaners, etc.)', 'Proximity to External Risks', 'Water Quality & Use']
      },
      {
        id: 'nonstick_pans',
        text: 'Cook with non-stick pans?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0.5, 0.75, 1, 1.5],
        categories: ['Chemical Exposures (cleaners, etc.)', 'POPs/Plastics']
      },
      {
        id: 'stain_spray',
        text: 'Use non-stain spray in home?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0, 0.25, 1, 1.25],
        categories: ['Chemical Exposures (cleaners, etc.)', 'POPs/Plastics'],
        notes: 'Lower severity due to route of exposure'
      },
      {
        id: 'flame_retardant',
        text: 'Use clothing, furniture or bedding treated with flame retardant?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        categories: ['Chemical Exposures (cleaners, etc.)', 'POPs/Plastics']
      },
      {
        id: 'other_chemical_additional',
        text: 'Anything else to add or any questions in this section?',
        type: 'textarea',
        required: false
      }
    ]
  },

  other: {
    id: 'other',
    title: 'Other',
    questions: [
      {
        id: 'asbestos_exposure',
        text: 'Had known chemical exposure or lived with asbestos?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        multiplier: 1.25,
        categories: ['Chemical Exposures (cleaners, etc.)']
      },
      {
        id: 'nuclear_plant',
        text: 'Lived within 20 miles of a nuclear power plant?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        categories: ['Proximity to External Risks']
      },
      {
        id: 'other_additional',
        text: 'Anything else to add or any questions in this section?',
        type: 'textarea',
        required: false
      }
    ]
  },

  multiple_toxicants_food: {
    id: 'multiple_toxicants_food',
    title: 'Multiple Toxicants – Food',
    questions: [
      {
        id: 'alcohol_frequency',
        text: 'How often do you drink alcohol?',
        type: 'radio',
        options: ['0-1/month', '2-3/month', '1-2/week', '3-4/week', '5+/week'],
        required: false,
        scoring: [0, 0, 0.25, 1, 1.25],
        categories: ['Lifestyle Exposures']
      },
      {
        id: 'alcohol_servings',
        text: 'When you drink, on average, how many servings of alcohol do you drink in one sitting? (1 serving = 12 oz beer, 5 oz wine, 1 oz liquor)?',
        type: 'number',
        required: false,
        categories: ['Lifestyle Exposures']
      },
      {
        id: 'restaurant_frequency',
        text: 'How often do you go to restaurants or eat fast food?',
        type: 'radio',
        options: ['0-1/month', '2-3/month', '1-2/week', '3-4/week', '5+/week'],
        required: false,
        scoring: [0, 0, 0.25, 1, 1.25],
        categories: ['Lifestyle Exposures']
      },
      {
        id: 'fish_consumption',
        text: 'Eat fish such as tuna, shark, orange roughy, swordfish, halibut, croaker, mackerel, perch, sablefish, marlin, grouper, bluefish, pike, largemouth bass and Walleye?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0, 0.25, 1, 1.25],
        categories: ['Lifestyle Exposures', 'Heavy Metals']
      },
      {
        id: 'microwave_plastic',
        text: 'Microwave food in the package or in plastic wrap?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0, 0.25, 1, 1.25],
        categories: ['Chemical Exposures (cleaners, etc.)', 'POPs/Plastics']
      },
      {
        id: 'soda_frequency',
        text: 'How often do you drink soda?',
        type: 'radio',
        options: ['1 or less/week', '2-4/week', '5-10/week', '11+/week'],
        required: false,
        scoring: [0, 0.25, 0.5, 0.75],
        categories: ['Lifestyle Exposures']
      },
      {
        id: 'sweetened_beverages',
        text: 'How often do you drink other sweetened beverages (e.g., sweet tea, sugary coffee drinks)?',
        type: 'radio',
        options: ['1 or less/week', '2-4/week', '5-10/week', '11+/week'],
        required: false,
        scoring: [0, 0.25, 0.5, 0.75],
        categories: ['Lifestyle Exposures']
      }
    ]
  },

  multiple_toxicants_house: {
    id: 'multiple_toxicants_house',
    title: 'Multiple Toxicants – House',
    questions: [
      {
        id: 'well_water',
        text: 'Drink water from well, lake, river?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0.25, 0.5, 0.75, 1],
        categories: ['Water Quality & Use']
      },
      {
        id: 'unfiltered_water',
        text: 'Drink unfiltered city water?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0.25, 0.5, 0.75, 1],
        categories: ['Water Quality & Use']
      },
      {
        id: 'toxic_storage',
        text: 'Store paints, pesticides or other toxic compounds in your garage or other attached storage space?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        categories: ['Air Quality (indoor/outdoor, VOCs)', 'Chemical Exposures (cleaners, etc.)']
      },
      {
        id: 'air_quality_complaints',
        text: 'Live where co-inhabitants complain about the air quality or smell?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        categories: ['Air Quality (indoor/outdoor, VOCs)', 'Chemical Exposures (cleaners, etc.)']
      },
      {
        id: 'southern_old_home',
        text: 'Live in home built before 1988 in southern US?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        categories: ['Building Materials/Renovation', 'Air Quality (indoor/outdoor, VOCs)', 'Heavy Metals']
      },
      {
        id: 'home_remodel',
        text: 'Remodeled your home?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        multiplier: 0.5,
        categories: ['Building Materials/Renovation', 'Air Quality (indoor/outdoor, VOCs)', 'Heavy Metals']
      },
      {
        id: 'new_materials',
        text: 'New carpet, new furniture, and/or new construction/paint?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        categories: ['Building Materials/Renovation', 'Air Quality (indoor/outdoor, VOCs)', 'Heavy Metals']
      },
      {
        id: 'new_items',
        text: 'New car, mobile home, vinyl tile or construction materials?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        categories: ['Building Materials/Renovation', 'Air Quality (indoor/outdoor, VOCs)']
      },
      {
        id: 'synthetic_foam',
        text: 'Use synthetic foam mattress or foam cushions/couch/pillows?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        categories: ['Chemical Exposures (cleaners, etc.)']
      },
      {
        id: 'beauty_salon',
        text: 'Are a regular customer of hair, beauty, nail salon?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        categories: ['Chemical Exposures (cleaners, etc.)']
      },
      {
        id: 'metal_work_exposure',
        text: 'Been exposed to welding, solder, metal-working, metal finishing?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        multiplier: 1.5,
        categories: ['Heavy Metals']
      },
      {
        id: 'house_toxicants_additional',
        text: 'Anything else to add or any questions in this section?',
        type: 'textarea',
        required: false
      }
    ]
  },

  personal_habits: {
    id: 'personal_habits',
    title: 'Personal Habits',
    questions: [
      {
        id: 'cannabis_use',
        text: 'Smoke or eat or apply cannabis?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0.5, 0.75, 1, 1.5],
        categories: ['Lifestyle Exposures']
      },
      {
        id: 'scented_candles',
        text: 'Use scented candles or chemical air fresheners?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0.25, 0.5, 0.75, 1],
        categories: ['Chemical Exposures (cleaners, etc.)']
      },
      {
        id: 'e_cigarettes',
        text: 'Use E cigarettes?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0.5, 0.75, 1, 1.5],
        categories: ['Lifestyle Exposures']
      },
      {
        id: 'chew_tobacco',
        text: 'Chew tobacco?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0.5, 0.75, 1, 1.5],
        categories: ['Lifestyle Exposures']
      },
      {
        id: 'cigarette_smoke',
        text: 'Smoke cigarettes or are exposed to second hand smoke?',
        type: 'radio',
        options: ['Never', 'Past', 'Rarely', 'Sometimes', 'Often'],
        required: false,
        scoring: [0, 0.5, 0.75, 1, 1.5],
        categories: ['Lifestyle Exposures']
      },
      {
        id: 'outdoor_exercise',
        text: 'In an average month, how many days do you engage in at least 30 minutes of moderate-intensity physical activity outdoors?',
        type: 'number',
        required: false,
        categories: ['Lifestyle Exposures']
      },
      {
        id: 'personal_habits_additional',
        text: 'Anything else to add or any questions in this section?',
        type: 'textarea',
        required: false
      }
    ]
  },

  protective_habits: {
    id: 'protective_habits',
    title: 'Protective Habits',
    questions: [
      {
        id: 'co_leak',
        text: 'Had a carbon monoxide leak?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [1, 0],
        categories: ['Air Quality (indoor/outdoor, VOCs)']
      },
      {
        id: 'duct_cleaning',
        text: 'How often have you had your air ducts cleaned?',
        type: 'radio',
        options: ['Yearly', 'Every Three Years', 'Rarely', 'Never', 'N/A'],
        required: false,
        scoring: [0, 0.25, 0.5, 0.75, 1],
        categories: ['Air Quality (indoor/outdoor, VOCs)']
      },
      {
        id: 'filter_replacement',
        text: 'How often have you replaced heater filters?',
        type: 'radio',
        options: ['Yearly', 'Every Three Years', 'Rarely', 'Never', 'N/A'],
        required: false,
        scoring: [0, 0.25, 0.5, 0.75, 1],
        categories: ['Air Quality (indoor/outdoor, VOCs)']
      },
      {
        id: 'air_purifier',
        text: 'Use an air purifier?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [0, 1],
        categories: ['Air Quality (indoor/outdoor, VOCs)'],
        hasFollowUp: true
      },
      {
        id: 'air_purifier_brand',
        text: 'If Yes, what brand?',
        type: 'text',
        required: false,
        dependsOn: 'air_purifier',
        dependsOnValue: 'Yes'
      },
      {
        id: 'water_type',
        text: 'What type of water does your home use?',
        type: 'radio',
        options: ['City', 'Well', 'Other'],
        required: false,
        categories: ['Water Quality & Use']
      },
      {
        id: 'water_quality_check',
        text: 'Have you checked the quality of your water?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [0, 1],
        categories: ['Water Quality & Use']
      },
      {
        id: 'water_filters',
        text: 'Use water filters?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [0, 1],
        categories: ['Water Quality & Use'],
        hasFollowUp: true
      },
      {
        id: 'water_filter_brand',
        text: 'If Yes, what brand?',
        type: 'text',
        required: false,
        dependsOn: 'water_filters',
        dependsOnValue: 'Yes'
      },
      {
        id: 'radon_test',
        text: 'Had your house tested for radon?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [0, 1],
        categories: ['Air Quality (indoor/outdoor, VOCs)']
      },
      {
        id: 'co_detectors',
        text: 'Have carbon monoxide (CO) detectors in your home/work?',
        type: 'radio',
        options: ['Yes', 'No'],
        required: false,
        scoring: [0, 1],
        categories: ['Air Quality (indoor/outdoor, VOCs)']
      },
      {
        id: 'protective_habits_additional',
        text: 'Anything else to add or any questions in this section?',
        type: 'textarea',
        required: false
      }
    ]
  },

  next_steps: {
    id: 'next_steps',
    title: 'Next Steps',
    questions: [
      {
        id: 'water_testing_interest',
        text: 'If recommended for you, would you be interested in a discounted water testing service as an optional $150 add-on?',
        type: 'radio',
        options: ['Yes', 'No', 'Maybe'],
        required: false
      },
      {
        id: 'mold_testing_interest',
        text: 'If recommended for you, would you be interested in a discounted mold testing service as an optional $150 add-on?',
        type: 'radio',
        options: ['Yes', 'No', 'Maybe'],
        required: false
      },
      {
        id: 'consultation_interest',
        text: 'Would you be interested in a 10-15 minute 1:1 expert consultation to dive deeper into your risk factors and protective habits?',
        type: 'radio',
        options: ['Yes', 'No', 'Maybe'],
        required: false
      }
    ]
  }
};

// Survey configuration for ordering and conditional logic
export const surveyConfig = {
  // Default order of sections
  defaultOrder: [
    'demographic',
    'overload_indicators',
    'allergens',
    'solvents_vocs',
    'pesticides',
    'metals',
    'mold',
    'plastics',
    'personal_care',
    'other_chemical',
    'other',
    'multiple_toxicants_food',
    'multiple_toxicants_house',
    'personal_habits',
    'protective_habits',
    'next_steps'
  ],

  // Conditional logic rules
  conditionalRules: {
    // Skip certain sections based on previous answers
    skipRules: [
      {
        condition: 'demographic.pregnancy_status === "No" && demographic.trying_to_conceive === "No"',
        skipSections: [] // Example: could skip pregnancy-specific questions
      }
    ],

    // Show additional questions based on answers
    showRules: [
      {
        condition: 'demographic.health_conditions === "Yes"',
        showQuestions: ['demographic.health_conditions_details']
      },
      {
        condition: 'protective_habits.air_purifier === "Yes"',
        showQuestions: ['protective_habits.air_purifier_brand']
      },
      {
        condition: 'protective_habits.water_filters === "Yes"',
        showQuestions: ['protective_habits.water_filter_brand']
      }
    ]
  },

  // Source-based configurations
  sourceConfigurations: {
    'general': {
      order: 'defaultOrder',
      skipSections: []
    },
    'high_risk': {
      order: ['demographic', 'overload_indicators', 'mold', 'solvents_vocs', 'metals'],
      skipSections: ['next_steps']
    },
    'basic_screening': {
      order: ['demographic', 'overload_indicators', 'protective_habits'],
      skipSections: ['other', 'next_steps']
    }
  }
};

// Risk categories for scoring and reporting
export const riskCategories = {
  'Mold & Moisture': {
    color: '#8B5CF6',
    description: 'Indoor moisture and mold exposure risks'
  },
  'Air Quality (indoor/outdoor, VOCs)': {
    color: '#06B6D4',
    description: 'Indoor and outdoor air quality concerns'
  },
  'Chemical Exposures (cleaners, etc.)': {
    color: '#EF4444',
    description: 'Household and workplace chemical exposures'
  },
  'Water Quality & Use': {
    color: '#3B82F6',
    description: 'Water source and quality concerns'
  },
  'POPs/Plastics': {
    color: '#F59E0B',
    description: 'Persistent organic pollutants and plastic exposures'
  },
  'Building Materials/Renovation': {
    color: '#10B981',
    description: 'Construction materials and renovation exposures'
  },
  'Heavy Metals': {
    color: '#6B7280',
    description: 'Heavy metal exposure risks'
  },
  'Proximity to External Risks': {
    color: '#DC2626',
    description: 'Environmental risks from nearby sources'
  },
  'Lifestyle Exposures': {
    color: '#7C3AED',
    description: 'Personal lifestyle and consumption patterns'
  }
};
