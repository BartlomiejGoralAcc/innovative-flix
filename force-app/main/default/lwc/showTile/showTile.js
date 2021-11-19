import { LightningElement, api } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ShowTile extends LightningElement {
	@api show;

    handleOpenRecordClick() {
        const event = new CustomEvent('showview', {
            detail: this.show.Id
        });
        this.dispatchEvent(event);
    }
    handleEditRecordClick() {
        const event = new CustomEvent('showedit', {
            detail: this.show.Id
        });
        this.dispatchEvent(event);
    }
    handleDeleteRecordClick() {
        deleteRecord(this.show.Id)
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