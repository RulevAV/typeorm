import { Entity as TOENTITY, Column, Index, BeforeInsert, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { IsEmail, Length } from 'class-validator';
import bcrypt from "bcrypt";
import { Exclude } from "class-transformer";
import Entity from "./Entity";
import User from "./User";
import { makeId, slugify } from "./utill/helpers";
import { type } from "os";
import Post from "./Post";

@TOENTITY('subs')
export default class Sub extends Entity {
    constructor(post: Partial<Sub>) {
        super()
        Object.assign(this, post)
    }
    @Index()
    @Column()
    name: string

    @Column()
    title: string

    @Column({ type: "text", nullable: true })
    description: string

    @Column({ type: "text", nullable: true })
    imageUrl: string

    @Column({ type: "text", nullable: true })
    bannerUrn: string

    @ManyToOne(() => User)
    @JoinColumn({ name: "username", referencedColumnName: "username" })
    user: User

    @OneToMany(() => Post, post => post.sub)
    posts: Post[]
} 