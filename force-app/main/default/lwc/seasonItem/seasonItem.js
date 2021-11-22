import { LightningElement, api } from 'lwc';
import { getSObjectValue } from '@salesforce/apex';
import NUMBER_FIELD from '@salesforce/schema/Season__c.Number__c';
import DESCRIPTION_FIELD from '@salesforce/schema/Season__c.Description__c';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SeasonItem extends LightningElement {
    @api season;
    isModalOpen = false;
    
    get label() {
        return 'Season ' + this.num;
    }
    get num() {
        return getSObjectValue(this.season, NUMBER_FIELD) + '';
    }
    get description() {
        return getSObjectValue(this.season, DESCRIPTION_FIELD);
    }
    get displayEpisodes() {
        //FIXME hardcoded naming
        return this.season.Episodes__r && this.season.Episodes__r.length > 0;
    }

    handleEditClick() {
        this.isModalOpen = true;
    }

    handleDeleteClick() {
        deleteRecord(this.season.Id)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Record deleted',
                    variant: 'success'
                })
            );
            this.dispatchEvent(new CustomEvent('refresh'));
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

    handleCloseModal(event) {
		this.isModalOpen = false;
	}

    handleClickAddEpisode() {
        const event = new CustomEvent('addnewepisode', {
            detail: this.season.Id
        });
        this.dispatchEvent(event);
	}

    
    handleRefresh(event) {
        this.dispatchEvent(new CustomEvent('refresh'));
	}
}