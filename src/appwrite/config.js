import conf from "../conf/conf.js";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwrite.endpoint)
            .setProject(conf.appwrite.projectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async creatPost({ slug, title, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.error("Error :: creatPost:", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.error("Error :: updatePost:", error);
        }
    }
    // to get just 1 post
    async getPost({ slug }) {
        try {
            return await this.databases.getDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            )
        } catch (error) {
            console.error("Error :: getPost:", error);
        }
    }
    // to get all posts
    async getPosts(query = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.databaseId,
                conf.collectionId,
                query
            )
        } catch (error) {
            console.error("Error :: getPosts:", error);
        }
    }

    async deletePost({ slug }) {
        try {
            await this.databases.deleteDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            )
            return true;
        } catch (error) {
            console.error("Error :: deletePost:", error);
            return false;
        }
    }

    // File CRUD Operations

    async uploadFile({ file }) {
        try {
            return await this.bucket.createFile(
                conf.bucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.error("Error :: uploadFile:", error);
        }
    }

    async getFile({ fileId }) {
        try {
            return await this.bucket.getFile(
                conf.bucketId,
                fileId
            )
        } catch (error) {
            console.error("Error :: getFile:", error);
        }
    }

    async updateFile({ fileId }) {
        try {
            return await this.bucket.updateFile(
                conf.bucketId,
                fileId,
            )
        } catch (error) {
            console.error("Error :: updateFile:", error);
        }
    }

    async deleteFile({ fileId }) {
        try {
            await this.bucket.deleteFile(
                conf.bucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.error("Error :: deleteFile:", error);
            return false;
        }
    }
}

const service = new Service();
export default service