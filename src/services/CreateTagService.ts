import {getCustomRepository} from "typeorm";
import {TagsRepositories} from "../repositories/TagsRepositories";
import {Tag} from "../entities/Tags";

class CreateTagService {
    async execute(name: string) {
        const tagRepository = getCustomRepository(TagsRepositories);

        if(!name) {
            throw new Error("Name is incorrect")
        }
        const tagsAlreadyExists = await tagRepository.findOne({name});

        if(tagsAlreadyExists){
            throw new Error("Tag is already exists")
        }

        const tags = tagRepository.create({
            name,
        });

        await tagRepository.save(tags);

        return tags;
    }
}

export { CreateTagService }