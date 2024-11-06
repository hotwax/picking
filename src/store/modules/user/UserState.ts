export default interface UserState {
    token: string;
    current: object | null;
    instanceUrl: string;
    picklistItemSortBy: string;
    pwaState: any;
    currentEComStore: any;
    permissions: any;
}