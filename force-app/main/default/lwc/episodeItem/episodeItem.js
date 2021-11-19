import { LightningElement, api} from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class EpisodeItem extends LightningElement {
    //TODO unique na episode number zrobić
    @api episode;
    isModalOpen;

    get name() {
        return 'E' + (this.episode.Number__c < 10 ? '0' : '') + this.episode.Number__c + ' · ' + this.episode.Name;
    }
    get duration() {
        return this.episode.Duration_min__c + ' min';
    }

    handleEditClick() {
        this.isModalOpen = true;
    }

    handleCloseModal(event) {
		this.isModalOpen = false;
	}

    handleClickDeleteEpisode() {
        deleteRecord(this.episode.Id)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Record deleted',
                    variant: 'success'
                })
            );
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error deleting record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
	}
}