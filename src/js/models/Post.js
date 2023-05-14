import moment from "moment/moment";

export default class Post {
    constructor(type, content) {
        this.type = type;
        this.content = content;
        this.time = moment().format('DD.MM.YY hh:mm');
    }
}

export const PostTypes = {
    text: 0,
    audio: 1,
    video: 2
}