export default function builtTableData(statuses) {
  const docDescriptions = [
    {
      key: 'childrenOrPregnancy',
      category: 'childrenOrPregnancy',
      title: 'Proof of Children/Minors or Pregnancy',
      blurb: 'Proof of Children/Minors in the Household or Pregnancy',
      status: statuses.childrenOrPregnancy
        ? statuses.childrenOrPregnancy
        : 'missing',
    },
    {
      key: 'residency',
      category: 'residency',
      title: 'Proof of Identity/Residency',
      blurb:
        'Document that shows proof of ID and/or that you currently reside within Spokane City.',
      status: statuses.residency ? statuses.residency : 'missing',
    },
    {
      key: 'income',
      category: 'income',
      title: 'Proof of Income',
      blurb: 'Document that confirms your current Income.',
      status: statuses.income ? statuses.income : 'missing',
      description: '',
    },
    {
      key: 'housingInstability',
      category: 'housingInstability',
      title: 'Proof of Rent Owed',
      blurb: 'Proof of risk of homelesssness or housing instability',
      status: statuses.housingInstability
        ? statuses.housingInstability
        : 'missing',
    },
    {
      key: 'covid',
      category: 'covid',
      title: 'COVID-19 Hardship',
      blurb: 'Document showing hardships caused by COVID-19',
      status: statuses.covid ? statuses.covid : 'missing',
    },
  ];

  return docDescriptions;
}
