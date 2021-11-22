import { LightningElement, api} from 'lwc';
import { createRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getMarks from '@salesforce/apex/EpisodeMarkController.getMarks';

export default class Stars extends LightningElement {
    @api episodeId;

    get name() {
        return 'rate' + this.episodeId;
    }

    connectedCallback() {
        getMarks({episodeId: this.episodeId})
        .then(result => {
            if(result && result.length > 0)
            this.template.querySelector('.star' + result[0].Rating__c).checked = true;
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleStarClick(event) {
        const val = event.target.getAttribute("value");
        console.log(val);
        const fields = {
            Rating__c: val,
            Episode__c: this.episodeId
        };
        console.log(fields);
        const recordInput = {
            apiName: 'Episode_Mark__c',
            fields: fields
        };
        console.log('wbijamyy');
        console.log(recordInput);
        createRecord(recordInput)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Rating added',
                    variant: 'success'
                })
            );
        })
        .catch(error => {
            console.log(error);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error during inserting rating',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }

    renderedCallback() {
        // this.template.querySelector('.star' + random).checked = true;
    }
}