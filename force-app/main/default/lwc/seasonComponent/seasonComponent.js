import { LightningElement, wire, api} from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getSeasonByShowId from '@salesforce/apex/SeasonController.getSeasonByShowId';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SeasonComponent extends LightningElement {
    currentPageReference = null; 
    urlStateParameters = null;
    isModalOpen = false;
    modalObject;
    newObjectFields;

    /* Params from Url */
    @api recordId = null;
    seasons;

    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
       if (currentPageReference) {
            this.urlStateParameters = currentPageReference.state;
            this.recordId = this.urlStateParameters.id || null;
       }
    }

    @wire(getSeasonByShowId, )
    loadSeasons(result) {
        console.log('Seaaasons');
        console.log(result);
        this.seasons = result.data;
    }

    connectedCallback() {
		this.loadSeasons();
	}

    loadSeasons() {
    	getSeasonByShowId({ showId: this.recordId })
			.then((result) => {
				this.seasons = result;
			})
			.catch(error => {
				this.dispatchEvent(
					new ShowToastEvent({
						title: 'Error get records',
						message: error.body.message,
						variant: 'error'
					})
				);
			});
    }

    handleToggleSection(event) {
        console.log('accordion');
    }

    get displaySeasons() {
        return this.seasons  && this.seasons.length > 0;
    }

    handleAddNewSeasonClick(event) {
        this.isModalOpen = true;
        this.modalObject = 'Season__c';
        this.newObjectFields = [
            { name: "TV_Show__c", value: this.recordId },
            { name: "Number__c"}
        ];
        console.log(this.newObjectFields);
    }
    handleAddNewEpisode(event) {
        this.isModalOpen = true;
        this.modalObject = 'Episode__c';
        this.newObjectFields = [
            { name: "TV_Show__c", value: this.recordId },
            { name: "Season__c", value: event.detail },
            //TODO dodać unikalność
            { name: "Number__c"},
            { name: "Name"},
            { name: "Description__c"},
            { name: "Release_Date__c"},
            { name: "Duration_min__c"}
        ];
    }
    handleCloseModal(event) {
		this.isModalOpen = false;
        this.loadSeasons();
	}
}