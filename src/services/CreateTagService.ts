import {getCustomRepository} from "typeorm";
import {TagsRepositories} from "../repositories/TagsRepositories";
import {logger} from "../logger"

class CreateTagService {
    async execute(name: string) {
        const tagRepository = getCustomRepository(TagsRepositories);

        if(!name) {
            logger.error(`Tag ${name} is already exists `);
            throw new Error("Name is incorrect")
        }
        const tagsAlreadyExists = await tagRepository.findOne({name});

        if(tagsAlreadyExists){
            logger.error(`Tag ${name} is already exists `);
            throw new Error("Tag is already exists")
        }

        logger.debug(`Tag ${name} create`);
        const tags = tagRepository.create({
            name,
        });

        logger.debug(`Tag ${name} save`);
        await tagRepository.save(tags);

        return tags;
    }
}

export { CreateTagService }