const crypto = require('node:crypto')


interface ICreateEventEntity {
    idUser: string;
    name: string;
    local: string;
    firstDay: string;
    startTime: string;
    lastDay: string;
    description: string;
    imageUrl: string;
}



export class Event {


    private constructor(
        public readonly id: string,
        public readonly idUser: string,
        public readonly name: string,
        public readonly local: string,
        public readonly firstDay: Date,
        public readonly startTime: string,
        public readonly lastDay: Date,
        public readonly description: string,
        public readonly imageUrl: string,

    ) { }

    static create({
        idUser,
        name,
        local,
        firstDay,
        startTime,
        lastDay,
        description,
        imageUrl
    }: ICreateEventEntity): Event {
        return new Event(
            crypto.randomUUID().toString(),
            idUser,
            name,
            local,
            new Date(firstDay+" 12:00:00"),
            startTime,
            new Date(lastDay+" 12:00:00"),
            description,
            imageUrl
        )
    }
}