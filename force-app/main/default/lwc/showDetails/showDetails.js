import { api, wire, LightningElement } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { publish, MessageContext } from 'lightning/messageService';
import TRAILER_URL_FOUND_CHANNEL from '@salesforce/messageChannel/Trailer_Url_Found__c';
import NAME_FIELD from '@salesforce/schema/TV_Show__c.Name';
import DESCRIPTION_FIELD from '@salesforce/schema/TV_Show__c.Description__c';
import LOGO_FIELD from '@salesforce/schema/TV_Show__c.Logo_URL__c';
import GENRE_FIELD from '@salesforce/schema/TV_Show__c.Genre__c';
import TRAILER_FIELD from '@salesforce/schema/TV_Show__c.Trailer_URL__c';
import COUNTRY_FIELD from '@salesforce/schema/TV_Show__c.Country__c';
import RELEASE_FIELD from '@salesforce/schema/TV_Show__c.Release_Year__c';
import NUMBER_EPI_FIELD from '@salesforce/schema/TV_Show__c.Number_Of_Episodes__c';
import CREATOR_FIELD from '@salesforce/schema/TV_Show__c.Creator__c';
// import getShowById from '@salesforce/apex/ShowController.getShowById';
// import getSeasonByShowId from '@salesforce/apex/SeasonController.getSeasonByShowId';

const showFields = [NAME_FIELD, DESCRIPTION_FIELD, LOGO_FIELD, 
    GENRE_FIELD, TRAILER_FIELD, COUNTRY_FIELD, RELEASE_FIELD, NUMBER_EPI_FIELD, CREATOR_FIELD];

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
 
    @wire(MessageContext)
    messageContext;

    @wire(getRecord, { recordId: '$recordId', fields: showFields })
    loadShow(result) {
        this.show = result;
        
        const genreString = getFieldValue(this.show.data, GENRE_FIELD);
        if(genreString) {
            this.genres = genreString.split(';');
        }

        if(this.showTrailerUrl) {
            const payload = { 
                constant: this.showTrailerUrl
            };
            publish(this.messageContext, TRAILER_URL_FOUND_CHANNEL, payload);
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
    get showTrailerUrl() {
        console.log(getFieldValue(this.show.data, TRAILER_FIELD));
        return getFieldValue(this.show.data, TRAILER_FIELD);
	}
    get showCountry() {
        return getFieldValue(this.show.data, COUNTRY_FIELD);
	}
    get showReleaseYear() {
        return getFieldValue(this.show.data, RELEASE_FIELD);
	}
    get showNumOfEpisodes() {
        return getFieldValue(this.show.data, NUMBER_EPI_FIELD);
	}
    get showCreator() {
        return getFieldValue(this.show.data, CREATOR_FIELD);
	}

    // get displaySeasons() {
    //     return this.seasons && this.seasons.data && this.seasons.data.length > 0;
    // }
    // get allSeasonsExceptFirst() {
    //     return this.seasons.data.slice(1);
    // }
}