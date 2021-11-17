import { LightningElement, wire, api} from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getSeasonByShowId from '@salesforce/apex/SeasonController.getSeasonByShowId';

export default class SeasonComponent extends LightningElement {
    currentPageReference = null; 
    urlStateParameters = null;

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

    @wire(getSeasonByShowId, { showId: '$recordId'})
    loadSeasons(result) {
        console.log('Seaaasons');
        console.log(result);
        this.seasons = result.data;
    }

    handleToggleSection(event) {
        console.log('accordion');

    }

    // handleSetActiveSectionC() {
    //     const accordion = this.template.querySelector('.example-accordion');

    //     accordion.activeSectionName = 'C';
    // }
    get displaySeasons() {
        return this.seasons  && this.seasons.length > 0;
    }
}