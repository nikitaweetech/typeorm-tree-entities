import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree, UpdateDateColumn } from 'typeorm'
import { Category } from '../category/category.entity';
@Entity('item')
@Tree('adjacency-list')
export class Item{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string;

    @OneToMany(()=>Category,category=>category.items)
    category: Category;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;
}