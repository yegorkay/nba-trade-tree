import { ITeamSelectOption } from 'models';

class FormatService {
  createSelectLabels(
    data: any[],
    valueKey: string,
    labelKey: string
  ): ITeamSelectOption[] {
    return data.map((item: any) => {
      return {
        value: item[valueKey],
        label: item[labelKey]
      };
    });
  }

  getQueryIndexValue(
    query: string,
    teamSelectOptions: ITeamSelectOption[]
  ): number {
    return teamSelectOptions.findIndex((team) => team.value === query);
  }
}

const formatService = new FormatService();

export { formatService };
