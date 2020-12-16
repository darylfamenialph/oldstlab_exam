import { action, makeObservable, observable } from "mobx";

interface itemsItem {
    id: number;
    title: string;
    description: string;
    price: number;
    dateAdded: Date;
    isActive: boolean;
    isAdded: boolean;

}

export class ItemsStore{
    items: itemsItem[] = [];

    constructor(){
        makeObservable(this, {
            items: observable,
            addToCart: action,
            setStore: action
        })
    }

    setStore(itemsData: itemsItem[]){
        this.items = itemsData;
    }
    addToCart(id:number){
        const index = this.items.findIndex(item => item.id === id);
        if(index > -1) {
            this.items[index].isAdded = true;
        }
    }
}

export const itemsStore = new ItemsStore();