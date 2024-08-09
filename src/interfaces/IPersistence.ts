import IScore from "./IScore.ts";

export default interface IPersistence{
    getAll(): IScore[];
    save(score: IScore): void;
}