import Dexie from "dexie";
import { IPostData, IStoredPost, TPostDate, TPostId } from "../service/IStoredPost";
import { IPostStorage } from "../service/IPostStorage";

export class PostStorage implements IPostStorage {
    private db: Dexie;

    constructor() {
        this.db = new Dexie("posts");
        this.db.version(1).stores({
            posts: "++id, postDate",
        });
    }

    add(post: IPostData): Promise<TPostId> {
        return this.table.add(post);
    }

    remove(postId: TPostId): Promise<void> {
        return this.table.delete(postId);
    }

    async update(postId: TPostId, changes: Partial<IPostData>): Promise<void> {
        await this.table.update(postId, changes);
    }

    get(postId: TPostId): Promise<IStoredPost> {
        return this.table.get(postId);
    }

    getAll(): Promise<IStoredPost[]> {
        return this.table.filter(() => true).toArray();
    }

    getFromDateAndOlder(postDate: TPostDate): Promise<IStoredPost[]> {
        return this.table
            .where("postDate")
            .belowOrEqual(postDate)
            .toArray();
    }

    getFromDateAndMoreRecent(postDate: TPostDate): Promise<IStoredPost[]> {
        return this.table
            .where("postDate")
            .aboveOrEqual(postDate)
            .toArray();
    }

    clear(): Promise<void> {
        return this.table.clear();
    }

    private get table() {
        return this.db.table("posts");
    }
}
