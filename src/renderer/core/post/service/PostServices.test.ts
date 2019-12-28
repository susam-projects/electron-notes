import { expect } from "../../../../../test/chai";
import { PostRepository } from "./PostRepository";
import { PostFinder } from "./PostFinder";
import { PostStorage } from "../storage/PostStorage";

const postStorage = new PostStorage();
const postRepository = new PostRepository(postStorage);
const postFinder = new PostFinder(postStorage);

describe("post storage services", () => {
    beforeEach(() => {
        return postRepository.clear();
    });

    it("can store a post and then retrieve it", async () => {
        const postData = {
            title: "post-title",
            author: "post-author",
            content: "post-content",
        };
        const postId = await postRepository.addPost(postData);
        const storedPost = await postFinder.getPostById(postId);
        expect(storedPost).to.deep.include(postData);
    });

    it("can get all stored posts", async () => {
        const post1 = { title: "post-title-1", author: "post-author", content: "post-content-1" };
        const post2 = { title: "post-title-2", author: "post-author", content: "post-content-2" };
        const post1Id = await postRepository.addPost(post1);
        const post2Id = await postRepository.addPost(post2);
        const allStoredPosts = await postFinder.getAllPosts();
        expect(allStoredPosts).to.have.length(2);
        const storedPost1 = await postFinder.getPostById(post1Id);
        const storedPost2 = await postFinder.getPostById(post2Id);
        expect(storedPost1).to.deep.include(post1);
        expect(storedPost2).to.deep.include(post2);
    });

    it("can clear posts storage", async () => {
        const post1 = { title: "post-title-1", author: "post-author", content: "post-content-1" };
        const post2 = { title: "post-title-2", author: "post-author", content: "post-content-2" };
        await postRepository.addPost(post1);
        await postRepository.addPost(post2);
        await postRepository.clear();
        const allStoredPosts = await postFinder.getAllPosts();
        expect(allStoredPosts).to.deep.equal([]);
    });

    it("can update post title", async () => {
        const postId = await postRepository.addPost({
            title: "post-title",
            author: "post-author",
            content: "post-content",
        });
        await postRepository.updatePostTitle(postId, "new-post-title");
        const storedPost = await postFinder.getPostById(postId);
        expect(storedPost).to.deep.include({
            title: "new-post-title",
            author: "post-author",
            content: "post-content",
        });
    });

    it("can update post content", async () => {
        const postId = await postRepository.addPost({
            title: "post-title",
            author: "post-author",
            content: "post-content",
        });
        await postRepository.updatePostContent(postId, "new-post-content");
        const storedPost = await postFinder.getPostById(postId);
        expect(storedPost).to.deep.include({
            title: "post-title",
            author: "post-author",
            content: "new-post-content",
        });
    });

    it("can get next post", async () => {
        const post1 = { title: "post-title-1", author: "post-author", content: "post-content-1" };
        const post2 = { title: "post-title-2", author: "post-author", content: "post-content-2" };
        const post3 = { title: "post-title-3", author: "post-author", content: "post-content-3" };
        const post1Id = await postRepository.addPost(post1);
        const post2Id = await postRepository.addPost(post2);
        const post3Id = await postRepository.addPost(post3);
        const postNextTo1 = await postFinder.getNextPost(post1Id);
        const postNextTo2 = await postFinder.getNextPost(post2Id);
        const postNextTo3 = await postFinder.getNextPost(post3Id);
        expect(postNextTo1).to.deep.include(post2);
        expect(postNextTo2).to.deep.include(post3);
        expect(postNextTo3).to.be.undefined();
    });

    it("can get prev post", async () => {
        const post1 = { title: "post-title-1", author: "post-author", content: "post-content-1" };
        const post2 = { title: "post-title-2", author: "post-author", content: "post-content-2" };
        const post3 = { title: "post-title-3", author: "post-author", content: "post-content-3" };
        const post1Id = await postRepository.addPost(post1);
        const post2Id = await postRepository.addPost(post2);
        const post3Id = await postRepository.addPost(post3);
        const postPrevTo1 = await postFinder.getPrevPost(post1Id);
        const postPrevTo2 = await postFinder.getPrevPost(post2Id);
        const postPrevTo3 = await postFinder.getPrevPost(post3Id);
        expect(postPrevTo1).to.be.undefined();
        expect(postPrevTo2).to.deep.include(post1);
        expect(postPrevTo3).to.deep.include(post2);
    });
});
