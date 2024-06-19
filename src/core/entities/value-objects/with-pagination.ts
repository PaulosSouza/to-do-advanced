export interface WithPaginationProps {
  totalCount: number;
  pageCount: number;
}

export abstract class WithPagination<Props> {
  protected readonly props: Props[];
  protected readonly paginationProps: WithPaginationProps;

  get totalCount() {
    return this.paginationProps.totalCount;
  }

  get pageCount() {
    return this.paginationProps.pageCount;
  }

  protected constructor(props: Props[], paginationProps: WithPaginationProps) {
    this.paginationProps = paginationProps;
    this.props = props;
  }
}
