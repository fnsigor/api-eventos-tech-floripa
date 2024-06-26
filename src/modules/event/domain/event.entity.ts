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
    registrationLink: string
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
        public readonly registrationLink: string
    ) { }

    static create({
        idUser,
        name,
        local,
        firstDay,
        startTime,
        lastDay,
        description,
        imageUrl,
        registrationLink
    }: ICreateEventEntity): Event {
        return new Event(
            crypto.randomUUID().toString(),
            idUser,
            name,
            local,
            new Date(firstDay.trim()+" 12:00:00"),
            startTime,
            new Date(lastDay.trim()+" 12:00:00"),
            description,
            imageUrl,
            registrationLink
        )
    }
}