export class PageViewModel {
    PageIndex: number;
    PageSize: number;
    TotalCount: number;
    KeyWord: string;
    SortColum: string;
    HeaderHeight: number;
    ColumnWith: number;
    RowHeight: number;
    FooterHeight: number;
    constructor() {
        this.PageSize = 15;
        this.PageIndex = 0;
        this.TotalCount = 0;
    }
}
export class TableConfig {
    HeaderHeight: number;
    ColumnWith: number;
    RowHeight: number;
    FooterHeight: number;
    PageSize: number;
}
