import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";
import { classToPlain } from "class-transformer";
import {logger} from "../logger";

class ListTagsService {
    async execute() {
        const tagsRepositories = getCustomRepository(TagsRepositories);

        logger.info(`Seeking out users`);
        const tags = await tagsRepositories.find();

        return classToPlain(tags);
    }
}

export { ListTagsService };