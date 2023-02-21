export default interface PicklistState {
  current: object;
  picklist: {
    list: [],
    total: any
  };
  completed: {
    list: [],
    total: any
  };
  filters: any;
}
