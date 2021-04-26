import { action, computed, observable, ObservableMap } from 'mobx';
import { IHasId } from '../models/types';

export class BaseStore<TItem extends IHasId> {
  @observable items: ObservableMap<number, TItem>;

  constructor() {
    this.items = new ObservableMap();
  }

  @computed get keys() {
    return Array.from(this.items.keys());
  }

  @computed get values() {
    return Array.from(this.items.values());
  }

  getById = (id: number) => {
    return this.items.get(id);
  };

  @action add = (item: TItem) => {
    this.items.set(item.id, item);
  };

  @action addMultiple = (items: TItem[]) => {
    items.forEach(item => {
      this.items.set(item.id, item);
    });
  };

  @action delete = (id: number) => {
    this.items.delete(id);
  };

  getCachedDataArray = (ids: number[]) => {
    const cachedValues = this.values.filter(value => ids.includes(value.id));
    return cachedValues.length === ids.length ? cachedValues : [];
  };
}

export interface IBaseStore<TItem extends IHasId> extends BaseStore<TItem> {}
