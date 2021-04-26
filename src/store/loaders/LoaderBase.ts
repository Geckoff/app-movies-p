import { IApiBase } from 'api';
import { IHasId } from 'store/models';
import { BaseStore } from 'store/stores';

export abstract class LoaderBase<
  TItem extends IHasId,
  TStore extends BaseStore<TItem>,
  TApi extends IApiBase
> {
  protected store: TStore;
  protected api: TApi;

  constructor(store: TStore, api: TApi) {
    this.store = store;
    this.api = api;
  }
}
