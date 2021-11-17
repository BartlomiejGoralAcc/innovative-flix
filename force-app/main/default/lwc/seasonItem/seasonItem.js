import { LightningElement, api } from 'lwc';
import { getSObjectValue } from '@salesforce/apex';
import NUMBER_FIELD from '@salesforce/schema/Season__c.Number__c';
import DESCRIPTION_FIELD from '@salesforce/schema/Season__c.Description__c';


export default class SeasonItem extends LightningElement {
    @api season;
    
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
}