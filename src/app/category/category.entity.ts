import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree } from 'typeorm';
import { Item } from '../item/item.entity';
@Entity('category')
@Tree('adjacency-list')
export class Category{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string;

    @ManyToOne(()=>Category,(category)=>category.children)  
    parent:Category;

    @OneToMany(()=>Category,(category)=>category.parent)
    children:Category[];

    @OneToMany(() => Item, (item) => item.category)
    items: Item[];
}