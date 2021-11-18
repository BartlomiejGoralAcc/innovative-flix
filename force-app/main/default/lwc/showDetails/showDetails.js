import { api, wire, LightningElement } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/TV_Show__c.Name';
import DESCRIPTION_FIELD from '@salesforce/schema/TV_Show__c.Description__c';
import LOGO_FIELD from '@salesforce/schema/TV_Show__c.Logo_URL__c';
import GENRE_FIELD from '@salesforce/schema/TV_Show__c.Genre__c';
// import getShowById from '@salesforce/apex/ShowController.getShowById';
// import getSeasonByShowId from '@salesforce/apex/SeasonController.getSeasonByShowId';

const showFields = [NAME_FIELD, DESCRIPTION_FIELD, LOGO_FIELD, GENRE_FIELD];

export default class ShowDetails extends LightningElement {
    currentPageReference = null; 
    urlStateParameters = null;
    show;
    seasons;
    genres;
    /* Params from Url */
    @api recordId = null;
 
    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
       if (currentPageReference) {
            this.urlStateParameters = currentPageReference.state;
            this.recordId = this.urlStateParameters.id || null;
       }
    }
 
    @wire(getRecord, { recordId: '$recordId', fields: showFields })
    loadShow(result) {
        this.show = result;
        const genreString = getFieldValue(this.show.data, GENRE_FIELD);
        if(genreString) {
            this.genres = genreString.split(';');
        }
    }

    // @wire(getSeasonByShowId, { showId: '$recordId'})
    // loadSeasons(result) {
    //     console.log(result);
    //     this.seasons = result;
    // }

    get showName() {
        return getFieldValue(this.show.data, NAME_FIELD);
	}
    get showDescription() {
        return getFieldValue(this.show.data, DESCRIPTION_FIELD);
	}
    get showLogo() {
        console.log('===========');
        console.log(this.show.data);
        return getFieldValue(this.show.data, LOGO_FIELD);
	}

    // get displaySeasons() {
    //     return this.seasons && this.seasons.data && this.seasons.data.length > 0;
    // }
    // get allSeasonsExceptFirst() {
    //     return this.seasons.data.slice(1);
    // }
}