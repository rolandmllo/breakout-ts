import IPersistence from "../interfaces/IPersistence.ts";
import IScore from "../interfaces/IScore.ts";

export default class LocalStorageScorePersistence implements IPersistence {

    getAll(): IScore[] {
        let deserializedScores = [];
        try {
            const retrievedData = localStorage.getItem('scores');
            if (retrievedData) {
                deserializedScores = JSON.parse(retrievedData);
            }
        } catch (e) {
            console.error('Error reading or parsing data from localStorage', e);
        }
        return deserializedScores;
    }

    save(gameState: IScore) {
        const persistedData = this.getAll();
        persistedData.push(gameState);

        const serializedData = JSON.stringify(persistedData);

        localStorage.setItem('scores', serializedData);

        return gameState;
    }
}