export default interface UserState {
    token: string;
    current: object | null;
    currentFacility: object;
    instanceUrl: string;
    picklistItemSortBy: string;
    pwaState: any;
    currentEComStore: any;
}