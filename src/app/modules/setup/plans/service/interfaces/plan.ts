export class Plan {
    planReferenceNumber!: string;
    benefitViewModel: [
      {
        categoryId: 0;
        benefitModels: [
          {
            benefitId: 0;
            limitListViewModel: [
              {
                limit: string;
                limitType: string;
                service: [
                  string
                ];
                serviceId: 0;
                isSelected: true;
              }
            ];
          }
        ];
      }
    ] | undefined
  
  }
  