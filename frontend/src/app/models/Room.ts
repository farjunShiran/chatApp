import { IMessage } from "./";

export interface IChatRoom{
    id:string;
    roomName:string;
    message:Array<IMessage>;
    createdUserId:string;
}