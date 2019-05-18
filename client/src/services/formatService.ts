class FormatService {
  createSelectLabels(data: any, valueKey: string, labelKey: string) {
    return data.map((item: any) => {
      return {
        value: item[valueKey],
        label: item[labelKey]
      };
    });
  }
}

const formatService = new FormatService();

export { formatService };
