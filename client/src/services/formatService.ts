import { moment } from 'vendor';
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

  formatDate(date: string): string {
    const format = 'MMMM Do YYYY';
    return moment(new Date(date)).format(format);
  }

  getQueryIndexValue(query: string, teamSelectOptions: ITeamSelectOption[]): number {
    return teamSelectOptions.findIndex((team) => team.value === query);
  }
}

const formatService = new FormatService();

export { formatService };
