export default interface PicklistState {
  // eslint-disable-next-line @typescript-eslint/ban-types
  current: Object;
  // eslint-disable-next-line @typescript-eslint/ban-types
  currentDetail: Object;
  list: Array<any>;
  picklists: {
    list: any;
    total: number;
  };
}
