import { expect } from "../../../../../test/chai";
import { PostRepository } from "./PostRepository";
import { PostFinder } from "./PostFinder";
import { PostStorage } from "../storage/PostStorage";
import { ICreatePostInfo } from "../../../ui/Page/ICreatePostInfo";
import { create } from "ts-node";

const postStorage = new PostStorage();
const postRepository = new PostRepository(postStorage);
const postFinder = new PostFinder(postStorage);

function createSamplePost(id: string | number): ICreatePostInfo {
    return {
        title: `post-title-${id}`,
        subtitle: `post-subtitle-${id}`,
        author: `post-author`,
        content: `post-content-${id}`,
    };
}

describe("post storage services", () => {
    beforeEach(() => {
        return postRepository.clear();
    });

    it("can store a post and then retrieve it", async () => {
        const postData = createSamplePost("");
        const postId = await postRepository.addPost(postData);

        const storedPost = await postFinder.getPostById(postId);
        expect(storedPost).to.deep.include(postData);
    });

    it("can try to get non existent post", async () => {
        const storedPost = await postFinder.getPostById(666);
        expect(storedPost).to.be.undefined;
    });

    it("can get all stored posts", async () => {
        const post1 = createSamplePost(1);
        const post2 = createSamplePost(2);
        const post1Id = await postRepository.addPost(post1);
        const post2Id = await postRepository.addPost(post2);

        const allStoredPosts = await postFinder.getAllPosts();
        expect(allStoredPosts).to.have.length(2);
        const storedPost1 = await postFinder.getPostById(post1Id);
        const storedPost2 = await postFinder.getPostById(post2Id);
        expect(storedPost1).to.deep.include(post1);
        expect(storedPost2).to.deep.include(post2);
    });

    it("can try to get all posts from empty storage", async () => {
        const storedPosts = await postFinder.getAllPosts();
        expect(storedPosts).to.deep.equal([]);
    });

    it("can get posts with offset", async () => {
        const post1 = createSamplePost(1);
        const post2 = createSamplePost(2);
        const post3 = createSamplePost(3);
        const post4 = createSamplePost(4);
        const post5 = createSamplePost(5);
        await postRepository.addPost(post1);
        await postRepository.addPost(post2);
        await postRepository.addPost(post3);
        await postRepository.addPost(post4);
        await postRepository.addPost(post5);

        const storedPosts = await postFinder.getSeveralPosts(2, 10);
        expect(storedPosts).to.have.length(3);
        expect(storedPosts[0]).to.deep.include(post3);
        expect(storedPosts[1]).to.deep.include(post2);
        expect(storedPosts[2]).to.deep.include(post1);
    });

    it("can get specific number of posts", async () => {
        const post1 = createSamplePost(1);
        const post2 = createSamplePost(2);
        const post3 = createSamplePost(3);
        const post4 = createSamplePost(4);
        const post5 = createSamplePost(5);
        await postRepository.addPost(post1);
        await postRepository.addPost(post2);
        await postRepository.addPost(post3);
        await postRepository.addPost(post4);
        await postRepository.addPost(post5);

        const storedPosts = await postFinder.getSeveralPosts(0, 3);
        expect(storedPosts).to.have.length(3);
        expect(storedPosts[0]).to.deep.include(post5);
        expect(storedPosts[1]).to.deep.include(post4);
        expect(storedPosts[2]).to.deep.include(post3);
    });

    it("can clear posts storage", async () => {
        const post1 = createSamplePost(1);
        const post2 = createSamplePost(2);
        await postRepository.addPost(post1);
        await postRepository.addPost(post2);

        await postRepository.clear();
        const allStoredPosts = await postFinder.getAllPosts();
        expect(allStoredPosts).to.deep.equal([]);
    });

    it("can update post title", async () => {
        const postId = await postRepository.addPost(createSamplePost(""));

        await postRepository.updatePostTitle(postId, "new-post-title");
        const storedPost = await postFinder.getPostById(postId);
        expect(storedPost).to.deep.include({
            ...createSamplePost(""),
            title: "new-post-title",
        });
    });

    it("can update post subtitle", async () => {
        const postId = await postRepository.addPost(createSamplePost(""));

        await postRepository.updatePostSubtitle(postId, "new-post-subtitle");
        const storedPost = await postFinder.getPostById(postId);
        expect(storedPost).to.deep.include({
            ...createSamplePost(""),
            subtitle: "new-post-subtitle",
        });
    });

    it("can update post content", async () => {
        const postId = await postRepository.addPost(createSamplePost(""));

        await postRepository.updatePostContent(postId, "new-post-content");
        const storedPost = await postFinder.getPostById(postId);
        expect(storedPost).to.deep.include({
            ...createSamplePost(""),
            content: "new-post-content",
        });
    });

    it("can delete a post", async () => {
        const postId = await postRepository.addPost(createSamplePost(""));

        await postRepository.deletePost(postId);
        const storedPosts = await postFinder.getAllPosts();
        expect(storedPosts).to.be.empty;
    });

    it("can get next post", async () => {
        const post1 = createSamplePost(1);
        const post2 = createSamplePost(2);
        const post3 = createSamplePost(3);
        const post1Id = await postRepository.addPost(post1);
        const post2Id = await postRepository.addPost(post2);
        const post3Id = await postRepository.addPost(post3);

        const postNextTo1 = await postFinder.getNextPost(post1Id);
        const postNextTo2 = await postFinder.getNextPost(post2Id);
        const postNextTo3 = await postFinder.getNextPost(post3Id);
        expect(postNextTo1).to.deep.include(post2);
        expect(postNextTo2).to.deep.include(post3);
        expect(postNextTo3).to.be.undefined;
    });

    it("can get prev post", async () => {
        const post1 = createSamplePost(1);
        const post2 = createSamplePost(2);
        const post3 = createSamplePost(3);
        const post1Id = await postRepository.addPost(post1);
        const post2Id = await postRepository.addPost(post2);
        const post3Id = await postRepository.addPost(post3);

        const postPrevTo1 = await postFinder.getPrevPost(post1Id);
        const postPrevTo2 = await postFinder.getPrevPost(post2Id);
        const postPrevTo3 = await postFinder.getPrevPost(post3Id);
        expect(postPrevTo1).to.be.undefined;
        expect(postPrevTo2).to.deep.include(post1);
        expect(postPrevTo3).to.deep.include(post2);
    });
});
